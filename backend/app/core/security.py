"""
Security utilities and middleware for AI Recycle-to-Market Generator.
Implements authentication, authorization, rate limiting, and security headers.
"""
import hashlib
import hmac
import secrets
import time
import logging
from typing import Optional, Dict, Any, List
from datetime import datetime, timedelta
from functools import wraps

from fastapi import Request, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
import jwt
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.redis import redis_service

logger = logging.getLogger(__name__)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Rate limiting
limiter = Limiter(key_func=get_remote_address)

# Security bearer for API keys
security = HTTPBearer(auto_error=False)


class SecurityError(Exception):
    """Base security exception."""
    pass


class AuthenticationError(SecurityError):
    """Authentication failed."""
    pass


class AuthorizationError(SecurityError):
    """Authorization failed."""
    pass


class RateLimitError(SecurityError):
    """Rate limit exceeded."""
    pass


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> Dict[str, Any]:
    """Verify JWT token and return payload."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise AuthenticationError("Invalid token")


def hash_password(password: str) -> str:
    """Hash password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash."""
    return pwd_context.verify(plain_password, hashed_password)


def generate_api_key() -> str:
    """Generate secure API key."""
    return secrets.token_urlsafe(32)


def verify_api_key(api_key: str) -> bool:
    """Verify API key against stored keys."""
    # In production, store hashed API keys in database
    valid_keys = getattr(settings, 'VALID_API_KEYS', [])
    return api_key in valid_keys


class RequestValidator:
    """Validates and sanitizes incoming requests."""

    MAX_REQUEST_SIZE = 10 * 1024 * 1024  # 10MB
    MAX_JSON_DEPTH = 10
    ALLOWED_CONTENT_TYPES = [
        "application/json",
        "multipart/form-data",
        "application/x-www-form-urlencoded"
    ]

    @staticmethod
    def validate_request_size(request: Request) -> bool:
        """Validate request size."""
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > RequestValidator.MAX_REQUEST_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="Request too large"
            )
        return True

    @staticmethod
    def validate_content_type(request: Request) -> bool:
        """Validate content type."""
        content_type = request.headers.get("content-type", "").split(";")[0]
        if content_type and content_type not in RequestValidator.ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail="Unsupported content type"
            )
        return True

    @staticmethod
    def validate_json_depth(data: Any, depth: int = 0) -> bool:
        """Validate JSON nesting depth to prevent DoS."""
        if depth > RequestValidator.MAX_JSON_DEPTH:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="JSON nesting too deep"
            )

        if isinstance(data, dict):
            for value in data.values():
                RequestValidator.validate_json_depth(value, depth + 1)
        elif isinstance(data, list):
            for item in data:
                RequestValidator.validate_json_depth(item, depth + 1)

        return True

    @staticmethod
    def sanitize_input(data: str) -> str:
        """Sanitize string input to prevent injection attacks."""
        if not isinstance(data, str):
            return data

        # Remove or escape potentially dangerous characters
        dangerous_chars = ['<', '>', '"', "'", '&', '\x00', '\r', '\n']
        for char in dangerous_chars:
            data = data.replace(char, '')

        # Limit length
        return data[:1000]  # Max 1000 characters


class SecurityMiddleware:
    """Security middleware for FastAPI."""

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        # Create request object
        request = Request(scope, receive)

        # Validate request
        try:
            RequestValidator.validate_request_size(request)
            RequestValidator.validate_content_type(request)
        except HTTPException as e:
            response = HTTPException(
                status_code=e.status_code,
                detail=e.detail
            )
            await send({
                "type": "http.response.start",
                "status": response.status_code,
                "headers": [[b"content-type", b"application/json"]]
            })
            await send({
                "type": "http.response.body",
                "body": f'{{"detail": "{response.detail}"}}'.encode()
            })
            return

        # Add security headers
        async def send_wrapper(message):
            if message["type"] == "http.response.start":
                headers = dict(message.get("headers", []))

                # Security headers
                security_headers = {
                    b"x-content-type-options": b"nosniff",
                    b"x-frame-options": b"DENY",
                    b"x-xss-protection": b"1; mode=block",
                    b"strict-transport-security": b"max-age=63072000; includeSubDomains",
                    b"content-security-policy": b"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'",
                    b"referrer-policy": b"strict-origin-when-cross-origin",
                    b"permissions-policy": b"camera=(), microphone=(), geolocation=()"
                }

                headers.update(security_headers)
                message["headers"] = list(headers.items())

            await send(message)

        await self.app(scope, receive, send_wrapper)


def require_auth(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Dependency to require authentication."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = verify_token(credentials.credentials)
        return payload
    except AuthenticationError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def require_api_key(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Dependency to require API key authentication."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="API key required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not verify_api_key(credentials.credentials):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return credentials.credentials


class IPWhitelistValidator:
    """IP whitelist validation for admin endpoints."""

    def __init__(self, allowed_ips: List[str]):
        self.allowed_ips = set(allowed_ips)

    def __call__(self, request: Request) -> bool:
        client_ip = get_remote_address(request)

        # Check direct IP
        if client_ip in self.allowed_ips:
            return True

        # Check if behind proxy
        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            real_ip = forwarded_for.split(",")[0].strip()
            if real_ip in self.allowed_ips:
                return True

        # Check real IP header
        real_ip = request.headers.get("x-real-ip")
        if real_ip and real_ip in self.allowed_ips:
            return True

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: IP not whitelisted"
        )


def create_admin_ip_validator():
    """Create IP validator for admin endpoints."""
    admin_ips = getattr(settings, 'ADMIN_IPS', ['127.0.0.1', '::1'])
    return IPWhitelistValidator(admin_ips)


class CSRFProtection:
    """CSRF protection for state-changing operations."""

    def __init__(self):
        self.token_lifetime = 3600  # 1 hour

    def generate_csrf_token(self, session_id: str) -> str:
        """Generate CSRF token for session."""
        timestamp = str(int(time.time()))
        message = f"{session_id}:{timestamp}"
        signature = hmac.new(
            settings.SECRET_KEY.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()

        token = f"{timestamp}:{signature}"

        # Store in Redis with expiration
        redis_service.setex(f"csrf:{session_id}", self.token_lifetime, token)

        return token

    def verify_csrf_token(self, session_id: str, token: str) -> bool:
        """Verify CSRF token for session."""
        try:
            # Get stored token
            stored_token = redis_service.get(f"csrf:{session_id}")
            if not stored_token:
                return False

            stored_token = stored_token.decode() if isinstance(stored_token, bytes) else stored_token

            # Check if tokens match
            if not hmac.compare_digest(token, stored_token):
                return False

            # Check token age
            timestamp_str = token.split(":")[0]
            timestamp = int(timestamp_str)

            if time.time() - timestamp > self.token_lifetime:
                # Clean up expired token
                redis_service.delete(f"csrf:{session_id}")
                return False

            return True

        except (ValueError, IndexError):
            return False


# Global CSRF protection instance
csrf_protection = CSRFProtection()


def require_csrf_token(request: Request, session_id: str = None):
    """Dependency to require CSRF token for state-changing operations."""
    if request.method in ["GET", "HEAD", "OPTIONS"]:
        return True  # CSRF not required for safe methods

    csrf_token = request.headers.get("x-csrf-token")
    if not csrf_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="CSRF token required"
        )

    if not session_id:
        # Try to get session ID from various sources
        session_id = request.headers.get("x-session-id")
        if not session_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Session ID required for CSRF validation"
            )

    if not csrf_protection.verify_csrf_token(session_id, csrf_token):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid CSRF token"
        )

    return True


def secure_headers():
    """Decorator to add security headers to endpoints."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            response = await func(*args, **kwargs)

            # Add security headers if response object supports it
            if hasattr(response, 'headers'):
                response.headers["X-Content-Type-Options"] = "nosniff"
                response.headers["X-Frame-Options"] = "DENY"
                response.headers["X-XSS-Protection"] = "1; mode=block"

            return response
        return wrapper
    return decorator


def log_security_event(event_type: str, details: Dict[str, Any], request: Request = None):
    """Log security events for monitoring."""
    log_data = {
        "timestamp": datetime.utcnow().isoformat(),
        "event_type": event_type,
        "details": details
    }

    if request:
        log_data.update({
            "ip_address": get_remote_address(request),
            "user_agent": request.headers.get("user-agent"),
            "endpoint": str(request.url),
            "method": request.method
        })

    logger.warning(f"SECURITY_EVENT: {json.dumps(log_data)}")

    # Also store in Redis for real-time monitoring
    redis_key = f"security_events:{int(time.time())}"
    redis_service.setex(redis_key, 86400, json.dumps(log_data))  # 24 hour retention


# Configure rate limiting error handler
@limiter.request_filter
def rate_limit_filter(request: Request) -> bool:
    """Skip rate limiting for health checks and internal requests."""
    return request.url.path in ["/health", "/metrics"]


# Security audit utilities
class SecurityAuditor:
    """Security auditing utilities."""

    @staticmethod
    def check_password_strength(password: str) -> Dict[str, Any]:
        """Check password strength and return recommendations."""
        issues = []
        score = 0

        if len(password) < 8:
            issues.append("Password too short (minimum 8 characters)")
        else:
            score += 20

        if len(password) >= 12:
            score += 10

        if any(c.isupper() for c in password):
            score += 20
        else:
            issues.append("Add uppercase letters")

        if any(c.islower() for c in password):
            score += 20
        else:
            issues.append("Add lowercase letters")

        if any(c.isdigit() for c in password):
            score += 15
        else:
            issues.append("Add numbers")

        if any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
            score += 15
        else:
            issues.append("Add special characters")

        return {
            "score": min(score, 100),
            "strength": "weak" if score < 50 else "medium" if score < 80 else "strong",
            "issues": issues
        }

    @staticmethod
    def audit_request_headers(request: Request) -> Dict[str, Any]:
        """Audit request headers for security issues."""
        warnings = []

        # Check for potentially dangerous headers
        dangerous_headers = ['x-forwarded-host', 'x-forwarded-proto']
        for header in dangerous_headers:
            if header in request.headers:
                warnings.append(f"Potentially dangerous header: {header}")

        # Check for missing security headers in response context
        return {
            "warnings": warnings,
            "user_agent": request.headers.get("user-agent", ""),
            "origin": request.headers.get("origin", ""),
            "referer": request.headers.get("referer", "")
        }
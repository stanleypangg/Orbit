"""
Input validation and sanitization for AI Recycle-to-Market Generator.
Validates user inputs and prevents injection attacks.
"""
import re
import logging
from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, validator, ValidationError
from fastapi import HTTPException, status

logger = logging.getLogger(__name__)

# Input validation patterns
PATTERNS = {
    'thread_id': re.compile(r'^[a-zA-Z0-9_-]{1,100}$'),
    'material_name': re.compile(r'^[a-zA-Z0-9\s\-_.,()]{1,200}$'),
    'size_description': re.compile(r'^[a-zA-Z0-9\s\-_.,()\/]{1,100}$'),
    'condition': re.compile(r'^[a-zA-Z0-9\s\-_.,()]{1,50}$'),
    'user_input': re.compile(r'^[a-zA-Z0-9\s\-_.,()!?\/]{1,2000}$'),
    'export_format': re.compile(r'^(json|html|pdf_ready)$'),
    'phase': re.compile(r'^(ingredient_discovery|goal_formation|concept_generation|output_assembly|complete)$'),
    'status': re.compile(r'^(todo|doing|review|done|waiting_for_input|phase_complete|error)$'),
    'filename': re.compile(r'^[a-zA-Z0-9\-_. ]{1,255}$'),
    'url': re.compile(r'^https?://[^\s/$.?#].[^\s]*$'),
}

# Dangerous patterns to reject
DANGEROUS_PATTERNS = [
    re.compile(r'<script[^>]*>.*?</script>', re.IGNORECASE | re.DOTALL),
    re.compile(r'javascript:', re.IGNORECASE),
    re.compile(r'on\w+\s*=', re.IGNORECASE),
    re.compile(r'eval\s*\(', re.IGNORECASE),
    re.compile(r'expression\s*\(', re.IGNORECASE),
    re.compile(r'@import', re.IGNORECASE),
    re.compile(r'<!--.*?-->', re.DOTALL),
    re.compile(r'<iframe[^>]*>.*?</iframe>', re.IGNORECASE | re.DOTALL),
    re.compile(r'<object[^>]*>.*?</object>', re.IGNORECASE | re.DOTALL),
    re.compile(r'<embed[^>]*>.*?</embed>', re.IGNORECASE | re.DOTALL),
    re.compile(r'vbscript:', re.IGNORECASE),
    re.compile(r'data:.*base64', re.IGNORECASE),
]

# SQL injection patterns
SQL_INJECTION_PATTERNS = [
    re.compile(r'(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)', re.IGNORECASE),
    re.compile(r'(\'|(\'\')|(\;)|(\-\-)|(\|)|(\*)|(\%))'),
    re.compile(r'(\b(OR|AND)\b\s+\d+\s*=\s*\d+)', re.IGNORECASE),
    re.compile(r'(\b(OR|AND)\b\s+\'\w+\'\s*=\s*\'\w+\')', re.IGNORECASE),
]


class InputValidator:
    """Centralized input validation and sanitization."""

    @staticmethod
    def validate_pattern(value: str, pattern_name: str) -> bool:
        """Validate input against predefined pattern."""
        if pattern_name not in PATTERNS:
            raise ValueError(f"Unknown pattern: {pattern_name}")

        pattern = PATTERNS[pattern_name]
        return bool(pattern.match(value))

    @staticmethod
    def check_dangerous_content(value: str) -> List[str]:
        """Check for dangerous content patterns."""
        issues = []

        for i, pattern in enumerate(DANGEROUS_PATTERNS):
            if pattern.search(value):
                issues.append(f"Dangerous pattern detected: {pattern.pattern[:50]}...")

        return issues

    @staticmethod
    def check_sql_injection(value: str) -> List[str]:
        """Check for SQL injection patterns."""
        issues = []

        for pattern in SQL_INJECTION_PATTERNS:
            if pattern.search(value):
                issues.append("Potential SQL injection detected")
                break

        return issues

    @staticmethod
    def sanitize_string(value: str, max_length: int = 1000) -> str:
        """Sanitize string input."""
        if not isinstance(value, str):
            return str(value)

        # Remove null bytes and control characters
        value = ''.join(char for char in value if ord(char) >= 32 or char in '\t\n\r')

        # Limit length
        value = value[:max_length]

        # Remove leading/trailing whitespace
        value = value.strip()

        return value

    @staticmethod
    def validate_and_sanitize(value: str, pattern_name: str, max_length: int = 1000) -> str:
        """Validate and sanitize input in one step."""
        # First sanitize
        sanitized = InputValidator.sanitize_string(value, max_length)

        # Check for dangerous content
        dangerous_issues = InputValidator.check_dangerous_content(sanitized)
        if dangerous_issues:
            raise ValidationError(f"Dangerous content detected: {dangerous_issues[0]}")

        # Check for SQL injection
        sql_issues = InputValidator.check_sql_injection(sanitized)
        if sql_issues:
            raise ValidationError(f"SQL injection detected: {sql_issues[0]}")

        # Validate pattern
        if not InputValidator.validate_pattern(sanitized, pattern_name):
            raise ValidationError(f"Invalid format for {pattern_name}")

        return sanitized


class ValidatedWorkflowRequest(BaseModel):
    """Validated workflow start request."""
    thread_id: str
    user_input: str

    @validator('thread_id')
    def validate_thread_id(cls, v):
        return InputValidator.validate_and_sanitize(v, 'thread_id', 100)

    @validator('user_input')
    def validate_user_input(cls, v):
        return InputValidator.validate_and_sanitize(v, 'user_input', 2000)


class ValidatedContinueRequest(BaseModel):
    """Validated workflow continue request."""
    thread_id: str
    user_response: str

    @validator('thread_id')
    def validate_thread_id(cls, v):
        return InputValidator.validate_and_sanitize(v, 'thread_id', 100)

    @validator('user_response')
    def validate_user_response(cls, v):
        return InputValidator.validate_and_sanitize(v, 'user_input', 2000)


class ValidatedIngredientItem(BaseModel):
    """Validated ingredient item."""
    name: str
    material: str
    size: str
    category: str
    condition: str
    confidence: float

    @validator('name')
    def validate_name(cls, v):
        return InputValidator.validate_and_sanitize(v, 'material_name', 200)

    @validator('material')
    def validate_material(cls, v):
        return InputValidator.validate_and_sanitize(v, 'material_name', 100)

    @validator('size')
    def validate_size(cls, v):
        return InputValidator.validate_and_sanitize(v, 'size_description', 100)

    @validator('category')
    def validate_category(cls, v):
        return InputValidator.validate_and_sanitize(v, 'material_name', 100)

    @validator('condition')
    def validate_condition(cls, v):
        return InputValidator.validate_and_sanitize(v, 'condition', 50)

    @validator('confidence')
    def validate_confidence(cls, v):
        if not 0.0 <= v <= 1.0:
            raise ValueError('Confidence must be between 0.0 and 1.0')
        return v


class ValidatedMagicPencilRequest(BaseModel):
    """Validated Magic Pencil edit request."""
    thread_id: str
    concept_id: int
    edit_instruction: str
    edit_type: str

    @validator('thread_id')
    def validate_thread_id(cls, v):
        return InputValidator.validate_and_sanitize(v, 'thread_id', 100)

    @validator('concept_id')
    def validate_concept_id(cls, v):
        if not 0 <= v <= 10:  # Reasonable limit for concept variants
            raise ValueError('Concept ID must be between 0 and 10')
        return v

    @validator('edit_instruction')
    def validate_edit_instruction(cls, v):
        return InputValidator.validate_and_sanitize(v, 'user_input', 1000)

    @validator('edit_type')
    def validate_edit_type(cls, v):
        allowed_types = ['style', 'content', 'composition', 'color', 'detail']
        if v not in allowed_types:
            raise ValueError(f'Edit type must be one of: {allowed_types}')
        return v


class ValidatedConceptSelection(BaseModel):
    """Validated concept selection request."""
    thread_id: str
    concept_id: int
    feedback: Optional[str] = None

    @validator('thread_id')
    def validate_thread_id(cls, v):
        return InputValidator.validate_and_sanitize(v, 'thread_id', 100)

    @validator('concept_id')
    def validate_concept_id(cls, v):
        if not 0 <= v <= 10:
            raise ValueError('Concept ID must be between 0 and 10')
        return v

    @validator('feedback')
    def validate_feedback(cls, v):
        if v is not None:
            return InputValidator.validate_and_sanitize(v, 'user_input', 500)
        return v


class ValidatedExportRequest(BaseModel):
    """Validated export format request."""
    export_format: str

    @validator('export_format')
    def validate_export_format(cls, v):
        return InputValidator.validate_and_sanitize(v, 'export_format')


class ValidatedShareRequest(BaseModel):
    """Validated social media sharing request."""
    thread_id: str
    platform: str
    content_type: str

    @validator('thread_id')
    def validate_thread_id(cls, v):
        return InputValidator.validate_and_sanitize(v, 'thread_id', 100)

    @validator('platform')
    def validate_platform(cls, v):
        allowed_platforms = ['instagram', 'twitter', 'pinterest', 'linkedin']
        if v not in allowed_platforms:
            raise ValueError(f'Platform must be one of: {allowed_platforms}')
        return v

    @validator('content_type')
    def validate_content_type(cls, v):
        allowed_types = ['post', 'story', 'thread', 'pin', 'article']
        if v not in allowed_types:
            raise ValueError(f'Content type must be one of: {allowed_types}')
        return v


def validate_file_upload(filename: str, content_type: str, file_size: int) -> Dict[str, Any]:
    """Validate file upload parameters."""
    issues = []

    # Validate filename
    if not InputValidator.validate_pattern(filename, 'filename'):
        issues.append("Invalid filename format")

    # Check file extension
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.pdf', '.json', '.html']
    file_extension = '.' + filename.split('.')[-1].lower() if '.' in filename else ''

    if file_extension not in allowed_extensions:
        issues.append(f"File type not allowed: {file_extension}")

    # Validate content type
    allowed_content_types = [
        'image/jpeg', 'image/png', 'application/pdf',
        'application/json', 'text/html', 'text/plain'
    ]

    if content_type not in allowed_content_types:
        issues.append(f"Content type not allowed: {content_type}")

    # Check file size (10MB limit)
    max_size = 10 * 1024 * 1024
    if file_size > max_size:
        issues.append(f"File too large: {file_size} bytes (max: {max_size})")

    return {
        "valid": len(issues) == 0,
        "issues": issues,
        "sanitized_filename": InputValidator.sanitize_string(filename, 255)
    }


def validate_thread_id(thread_id: str) -> str:
    """Standalone thread ID validation."""
    try:
        return InputValidator.validate_and_sanitize(thread_id, 'thread_id', 100)
    except ValidationError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid thread ID: {str(e)}"
        )


def validate_user_input(user_input: str) -> str:
    """Standalone user input validation."""
    try:
        return InputValidator.validate_and_sanitize(user_input, 'user_input', 2000)
    except ValidationError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid user input: {str(e)}"
        )


def validate_export_format(export_format: str) -> str:
    """Standalone export format validation."""
    try:
        return InputValidator.validate_and_sanitize(export_format, 'export_format')
    except ValidationError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid export format: {str(e)}"
        )


class ValidationMiddleware:
    """Middleware to validate all incoming requests."""

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        # Skip validation for certain paths
        path = scope.get("path", "")
        skip_paths = ["/health", "/metrics", "/docs", "/redoc", "/openapi.json"]

        if any(path.startswith(skip_path) for skip_path in skip_paths):
            await self.app(scope, receive, send)
            return

        # Validate request size
        headers = dict(scope.get("headers", []))
        content_length = headers.get(b"content-length")

        if content_length:
            try:
                size = int(content_length.decode())
                if size > 10 * 1024 * 1024:  # 10MB limit
                    await send({
                        "type": "http.response.start",
                        "status": 413,
                        "headers": [[b"content-type", b"application/json"]]
                    })
                    await send({
                        "type": "http.response.body",
                        "body": b'{"detail": "Request too large"}'
                    })
                    return
            except (ValueError, UnicodeDecodeError):
                pass

        await self.app(scope, receive, send)


# Utility function for batch validation
def validate_batch_input(data: List[Dict[str, Any]], max_batch_size: int = 100) -> List[Dict[str, Any]]:
    """Validate batch input data."""
    if len(data) > max_batch_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Batch size too large: {len(data)} (max: {max_batch_size})"
        )

    validated_data = []
    for i, item in enumerate(data):
        try:
            # Validate each item based on expected structure
            if 'user_input' in item:
                item['user_input'] = validate_user_input(item['user_input'])
            if 'thread_id' in item:
                item['thread_id'] = validate_thread_id(item['thread_id'])

            validated_data.append(item)

        except HTTPException as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Validation error in item {i}: {e.detail}"
            )

    return validated_data
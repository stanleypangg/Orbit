import redis
from redis.exceptions import RedisError
from urllib.parse import urlparse
from app.core.config import settings


class RedisService:
    def __init__(self):
        # Support both REDIS_URL and individual settings
        if hasattr(settings, 'REDIS_URL') and settings.REDIS_URL:
            # Parse Redis URL for production
            parsed_url = urlparse(settings.REDIS_URL)
            redis_config = {
                'host': parsed_url.hostname or settings.REDIS_HOST,
                'port': parsed_url.port or settings.REDIS_PORT,
                'db': int(parsed_url.path.lstrip('/')) if parsed_url.path.lstrip('/') else settings.REDIS_DB,
                'decode_responses': True
            }

            # Add password if provided
            if settings.REDIS_PASSWORD:
                redis_config['password'] = settings.REDIS_PASSWORD
            elif parsed_url.password:
                redis_config['password'] = parsed_url.password

        else:
            # Fallback to individual settings
            redis_config = {
                'host': settings.REDIS_HOST,
                'port': settings.REDIS_PORT,
                'db': settings.REDIS_DB,
                'decode_responses': True
            }

            if settings.REDIS_PASSWORD:
                redis_config['password'] = settings.REDIS_PASSWORD

        self.client = redis.Redis(**redis_config)
        self._fallback_store = {}
        self._use_fallback = False

    def get(self, key: str) -> str | None:
        try:
            if self._use_fallback:
                return self._fallback_store.get(key)
            return self.client.get(key)
        except RedisError:
            self._use_fallback = True
            return self._fallback_store.get(key)

    def set(self, key: str, value: str, ex: int | None = None) -> bool:
        try:
            if self._use_fallback:
                self._fallback_store[key] = value
                return True
            return self.client.set(key, value, ex=ex)
        except RedisError:
            self._use_fallback = True
            self._fallback_store[key] = value
            return True

    def setex(self, key: str, time: int, value: str) -> bool:
        """Set key with expiration time."""
        try:
            if self._use_fallback:
                self._fallback_store[key] = value
                return True
            return self.client.setex(key, time, value)
        except RedisError:
            self._use_fallback = True
            self._fallback_store[key] = value
            return True

    def delete(self, key: str) -> int:
        if self._use_fallback:
            return 1 if self._fallback_store.pop(key, None) is not None else 0
        try:
            return self.client.delete(key)
        except RedisError:
            self._use_fallback = True
            return 1 if self._fallback_store.pop(key, None) is not None else 0

    def exists(self, key: str) -> bool:
        if self._use_fallback:
            return key in self._fallback_store
        try:
            return self.client.exists(key) > 0
        except RedisError:
            self._use_fallback = True
            return key in self._fallback_store

    def ping(self) -> bool:
        try:
            if self._use_fallback:
                return True
            return self.client.ping()
        except RedisError:
            self._use_fallback = True
            return True

    def flushdb(self) -> bool:
        """Clear all keys in current database."""
        try:
            if self._use_fallback:
                self._fallback_store.clear()
                return True
            return self.client.flushdb()
        except RedisError:
            self._use_fallback = True
            self._fallback_store.clear()
            return True


redis_service = RedisService()

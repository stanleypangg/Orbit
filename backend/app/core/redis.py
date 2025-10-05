"""Redis client wrapper that prefers a hosted REDIS_URL with in-memory fallback."""

from __future__ import annotations

import os
import redis
from redis.exceptions import RedisError

from app.core.config import settings

# Default to local Redis instance
_DEFAULT_REDIS_URL = "redis://127.0.0.1:6379/0"


def _resolve_redis_url() -> str:
    """Determine the Redis connection string from environment, settings, or default."""
    env_url = os.getenv("REDIS_URL")
    settings_url = getattr(settings, "REDIS_URL", None)
    return env_url or settings_url or _DEFAULT_REDIS_URL


def get_redis_url() -> str:
    """Public helper for retrieving the active Redis connection URL."""
    return _resolve_redis_url()


class RedisService:
    """Thin Redis client with graceful degradation to an in-memory store."""

    def __init__(self, redis_url: str | None = None):
        self._url = redis_url or _resolve_redis_url()
        self.client = self._create_client(self._url)
        self._fallback_store: dict[str, str] = {}
        self._use_fallback = False

    @staticmethod
    def _create_client(redis_url: str) -> redis.Redis:
        return redis.from_url(redis_url, decode_responses=True)

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
        """Set key with expiration time; fallback ignores expiry."""
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
        """Clear stored keys for the active database or fallback store."""
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

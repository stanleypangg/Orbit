import redis
from app.core.config import settings


class RedisService:
    def __init__(self):
        self.client = redis.Redis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT,
            db=settings.REDIS_DB,
            decode_responses=True
        )
    
    def get(self, key: str) -> str | None:
        return self.client.get(key)
    
    def set(self, key: str, value: str, ex: int | None = None) -> bool:
        return self.client.set(key, value, ex=ex)
    
    def delete(self, key: str) -> int:
        return self.client.delete(key)
    
    def exists(self, key: str) -> bool:
        return self.client.exists(key) > 0
    
    def ping(self) -> bool:
        try:
            return self.client.ping()
        except Exception:
            return False


redis_service = RedisService()


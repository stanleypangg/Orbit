from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.core.redis import redis_service

router = APIRouter(prefix="/redis", tags=["redis"])


class SetKeyRequest(BaseModel):
    key: str
    value: str
    ex: Optional[int] = None


class GetKeyResponse(BaseModel):
    key: str
    value: Optional[str]
    exists: bool


@router.post("/set")
async def set_key(request: SetKeyRequest):
    """Set a key-value pair in Redis with optional expiration."""
    success = redis_service.set(request.key, request.value, ex=request.ex)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to set key in Redis")
    return {"success": True, "key": request.key}


@router.get("/get/{key}")
async def get_key(key: str) -> GetKeyResponse:
    """Get a value from Redis by key."""
    value = redis_service.get(key)
    exists = redis_service.exists(key)
    return GetKeyResponse(key=key, value=value, exists=exists)


@router.delete("/delete/{key}")
async def delete_key(key: str):
    """Delete a key from Redis."""
    deleted = redis_service.delete(key)
    return {"success": deleted > 0, "deleted_count": deleted}


@router.get("/exists/{key}")
async def check_exists(key: str):
    """Check if a key exists in Redis."""
    exists = redis_service.exists(key)
    return {"key": key, "exists": exists}


@router.get("/health")
async def redis_health():
    """Check Redis connection health."""
    is_healthy = redis_service.ping()
    if not is_healthy:
        raise HTTPException(status_code=503, detail="Redis connection failed")
    return {"status": "healthy", "redis": "connected"}


"""Utilities for creating a LangGraph Redis checkpointer with async support."""

from __future__ import annotations

import asyncio
from functools import partial
from typing import Any, AsyncIterator, Optional, Sequence

from langchain_core.runnables.config import RunnableConfig
from langgraph.checkpoint.base import (
    ChannelVersions,
    Checkpoint,
    CheckpointMetadata,
    CheckpointTuple,
)
from langgraph.checkpoint.memory import MemorySaver
from langgraph.checkpoint.redis import RedisSaver

from app.core.redis import get_redis_url, redis_service


class AsyncRedisCheckpointer(RedisSaver):
    """RedisSaver shim that exposes async methods via ``asyncio.to_thread``."""

    async def aget_tuple(self, config: RunnableConfig) -> Optional[CheckpointTuple]:
        return await asyncio.to_thread(self.get_tuple, config)

    async def alist(
        self,
        config: Optional[RunnableConfig],
        *,
        filter: Optional[dict[str, Any]] = None,
        before: Optional[RunnableConfig] = None,
        limit: Optional[int] = None,
    ) -> AsyncIterator[CheckpointTuple]:
        def _collect() -> list[CheckpointTuple]:
            iterator = RedisSaver.list(self, config, filter=filter, before=before, limit=limit)
            return list(iterator)

        results = await asyncio.to_thread(_collect)
        for item in results:
            yield item

    async def aput(
        self,
        config: RunnableConfig,
        checkpoint: Checkpoint,
        metadata: CheckpointMetadata,
        new_versions: ChannelVersions,
    ) -> RunnableConfig:
        fn = partial(RedisSaver.put, self, config, checkpoint, metadata, new_versions)
        return await asyncio.to_thread(fn)

    async def aput_writes(
        self,
        config: RunnableConfig,
        writes: Sequence[tuple[str, Any]],
        task_id: str,
        task_path: str = "",
    ) -> None:
        fn = partial(RedisSaver.put_writes, self, config, writes, task_id, task_path)
        await asyncio.to_thread(fn)

    async def adelete_thread(self, thread_id: str) -> None:
        await asyncio.to_thread(RedisSaver.delete_thread, self, thread_id)


def create_redis_checkpointer(redis_url: Optional[str] = None):
    """Instantiate the async-compatible Redis checkpointer.

    Args:
        redis_url: Optional override for the Redis connection string.

    Returns:
        AsyncRedisCheckpointer ready for graph compilation.
    """
    resolved_url = redis_url or get_redis_url()

    # Trigger RedisService to switch to fallback mode if the hosted instance is unreachable.
    try:
        redis_service.ping()
    except Exception:
        pass

    if getattr(redis_service, "_use_fallback", False):  # type: ignore[attr-defined]
        return MemorySaver()

    try:
        checkpointer = AsyncRedisCheckpointer(redis_url=resolved_url)
        try:
            checkpointer.setup()
        except Exception:
            pass
        return checkpointer
    except Exception:
        return MemorySaver()


__all__ = ["AsyncRedisCheckpointer", "create_redis_checkpointer"]

"""
Chat endpoint that streams responses from Gemini API.
Uses Server-Sent Events (SSE) for real-time token streaming.
"""
import json
import logging
import time
import uuid
from typing import List, Optional
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.lib.gemini_client import GeminiClient, ChatMessage as GeminiChatMessage, ChatOptions

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatMessage(BaseModel):
    """API message format."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    role: str
    content: str


class ChatRequest(BaseModel):
    """Chat endpoint request payload."""
    messages: List[ChatMessage]
    options: Optional[dict] = None


class ChatOptionsRequest(BaseModel):
    """Optional generation parameters."""
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1024
    system_prompt: Optional[str] = None


# Initialize Gemini client (singleton pattern)
gemini_client: Optional[GeminiClient] = None


def get_gemini_client() -> GeminiClient:
    """Get or create Gemini client instance."""
    global gemini_client
    if gemini_client is None:
        try:
            gemini_client = GeminiClient()
        except ValueError as e:
            logger.error(f"Failed to initialize Gemini client: {e}")
            raise HTTPException(
                status_code=500,
                detail="Server configuration error: Gemini API key not configured"
            )
    return gemini_client


async def stream_chat_response(request: ChatRequest):
    """
    Generator function that streams chat responses as SSE events.
    
    Yields SSE-formatted data chunks:
    - data: {"delta": "token text"} for each token
    - data: {"done": true} when complete
    - data: {"error": {"code": "...", "message": "..."}} on error
    """
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    try:
        # Validate request
        if not request.messages:
            raise HTTPException(status_code=400, detail="Messages cannot be empty")
        
        if request.messages[-1].role != "user":
            raise HTTPException(status_code=400, detail="Last message must be from user")
        
        if not request.messages[-1].content.strip():
            raise HTTPException(status_code=400, detail="User message cannot be empty")
        
        # Get client
        client = get_gemini_client()
        
        # Parse options
        options_dict = request.options or {}
        chat_options = ChatOptions(
            temperature=options_dict.get("temperature", 0.7),
            max_tokens=options_dict.get("max_tokens", 1024),
            system_prompt=options_dict.get("system_prompt")
        )
        
        # Convert API messages to Gemini messages
        gemini_messages = [
            GeminiChatMessage(role=msg.role, content=msg.content, id=msg.id)
            for msg in request.messages
        ]
        
        logger.info(f"[{request_id}] Starting chat stream with {len(gemini_messages)} messages")
        
        # Stream tokens
        token_count = 0
        async for token in client.send_message_stream(gemini_messages, chat_options):
            token_count += 1
            data = json.dumps({"delta": token})
            yield f"data: {data}\n\n"
        
        # Send completion event
        yield f'data: {json.dumps({"done": True})}\n\n'
        
        # Log telemetry
        elapsed_ms = int((time.time() - start_time) * 1000)
        logger.info(
            f"[{request_id}] Chat stream completed: "
            f"tokens={token_count}, latency={elapsed_ms}ms, status=ok"
        )
        
    except HTTPException as e:
        # Re-raise HTTP exceptions
        error_data = json.dumps({
            "error": {
                "code": str(e.status_code),
                "message": e.detail
            }
        })
        yield f"data: {error_data}\n\n"
        logger.error(f"[{request_id}] HTTP error: {e.detail}")
        
    except Exception as e:
        # Handle unexpected errors
        error_data = json.dumps({
            "error": {
                "code": "500",
                "message": "An error occurred while processing your request"
            }
        })
        yield f"data: {error_data}\n\n"
        
        elapsed_ms = int((time.time() - start_time) * 1000)
        logger.error(
            f"[{request_id}] Chat stream failed: "
            f"error={str(e)}, latency={elapsed_ms}ms, status=error"
        )


@router.post("/")
async def chat(request: ChatRequest):
    """
    POST /api/chat
    
    Streams chat responses using Server-Sent Events.
    
    Request body:
    {
        "messages": [
            {"id": "...", "role": "user", "content": "Hello!"}
        ],
        "options": {
            "temperature": 0.7,
            "max_tokens": 1024,
            "system_prompt": "You are a helpful assistant."
        }
    }
    
    Response: text/event-stream with SSE events:
    - data: {"delta": "Hello"} - token chunks
    - data: {"done": true} - completion
    - data: {"error": {...}} - errors
    """
    return StreamingResponse(
        stream_chat_response(request),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # Disable nginx buffering
        }
    )


@router.get("/health")
async def health_check():
    """Check if Gemini client is configured."""
    try:
        get_gemini_client()
        return {"status": "healthy", "model": "gemini"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}


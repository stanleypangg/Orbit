"""
Gemini API client adapter for streaming chat responses.
Implements a generic LLM interface that can be swapped later.
"""
import os
import logging
from typing import List, Dict, Any, AsyncIterator, Optional
import google.generativeai as genai

logger = logging.getLogger(__name__)


class ModelError(Exception):
    """Exception raised for errors in the model API."""
    pass


class ChatMessage:
    """Represents a single chat message."""
    def __init__(self, role: str, content: str, id: str = ""):
        self.role = role
        self.content = content
        self.id = id


class ChatOptions:
    """Configuration options for chat generation."""
    def __init__(
        self,
        temperature: float = 0.7,
        max_tokens: int = 1024,
        system_prompt: Optional[str] = None
    ):
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.system_prompt = system_prompt or "You are a concise, helpful assistant. Answer directly unless asked to elaborate."


class GeminiClient:
    """
    Gemini API adapter implementing a generic LLM interface.
    Can be swapped for other providers (OpenAI, Claude) by implementing the same interface.
    """
    
    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.model_name = model or os.getenv("GEMINI_MODEL", "gemini-1.5-pro")
        
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        genai.configure(api_key=self.api_key)
        
        # Configure generation settings
        self.generation_config = {
            "temperature": 0.7,
            "max_output_tokens": 1024,
        }
<<<<<<< HEAD
        
        # Safety settings - permissive for MVP (can be tightened later)
        self.safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
        ]
        
        logger.info(f"Initialized GeminiClient with model: {self.model_name}")
    
=======

        # No safety settings - disabled for unrestricted operation
        from google.generativeai.types import HarmCategory, HarmBlockThreshold
        self.safety_settings = {
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        }

        logger.info(f"Initialized GeminiClient with model: {self.model_name}, Safety: DISABLED")


    def use_flash_model(self) -> 'GeminiClient':
        """Switch to faster Flash model for simple operations."""
        self.model_name = self.flash_model
        logger.info(f"Switched to Flash model: {self.model_name}")
        return self

    def use_pro_model(self) -> 'GeminiClient':
        """Switch to Pro model for complex operations."""
        from app.core.config import settings
        self.model_name = settings.GEMINI_MODEL
        logger.info(f"Switched to Pro model: {self.model_name}")
        return self

>>>>>>> 4d5f177 (WIP: move changes to ai-agent)
    def _convert_messages_to_gemini_format(
        self,
        messages: List[ChatMessage],
        options: ChatOptions
    ) -> tuple[Optional[str], List[Dict[str, str]]]:
        """
        Convert generic chat messages to Gemini's expected format.
        Returns (system_instruction, chat_history).
        """
        system_instruction = None
        chat_history = []
        
        for msg in messages:
            if msg.role == "system":
                system_instruction = msg.content
            elif msg.role == "user":
                chat_history.append({"role": "user", "parts": [msg.content]})
            elif msg.role == "assistant":
                chat_history.append({"role": "model", "parts": [msg.content]})
        
        # Use options system prompt if no system message in history
        if not system_instruction and options.system_prompt:
            system_instruction = options.system_prompt
        
        return system_instruction, chat_history
    
    async def send_message_stream(
        self,
        messages: List[ChatMessage],
        options: Optional[ChatOptions] = None
    ) -> AsyncIterator[str]:
        """
        Send messages to Gemini and stream back the response tokens.
        
        Args:
            messages: List of chat messages (conversation history)
            options: Optional generation parameters
            
        Yields:
            Token strings as they arrive from the model
            
        Raises:
            ValueError: If messages are invalid
            Exception: If Gemini API errors occur
        """
        if not messages:
            raise ValueError("Messages list cannot be empty")
        
        if messages[-1].role != "user":
            raise ValueError("Last message must be from user")
        
        if not messages[-1].content.strip():
            raise ValueError("User message cannot be empty")
        
        options = options or ChatOptions()
        
        # Update generation config with options
        generation_config = self.generation_config.copy()
        generation_config["temperature"] = options.temperature
        generation_config["max_output_tokens"] = options.max_tokens
        
        # Convert messages to Gemini format
        system_instruction, chat_history = self._convert_messages_to_gemini_format(
            messages, options
        )
        
        try:
            # Create model instance with system instruction if present
            model_kwargs = {
                "model_name": self.model_name,
                "generation_config": generation_config,
                "safety_settings": self.safety_settings,
            }
            
            if system_instruction:
                model_kwargs["system_instruction"] = system_instruction
            
            model = genai.GenerativeModel(**model_kwargs)
            
            # For streaming, we need to use the last user message
            # and any previous history
            if len(chat_history) > 1:
                # Multi-turn conversation
                chat = model.start_chat(history=chat_history[:-1])
                response = await chat.send_message_async(
                    chat_history[-1]["parts"][0],
                    stream=True
                )
            else:
                # Single message
                response = await model.generate_content_async(
                    chat_history[-1]["parts"][0],
                    stream=True
                )
            
            # Stream tokens as they arrive
            async for chunk in response:
                if chunk.text:
                    yield chunk.text
                    
        except Exception as e:
            logger.error(f"Gemini API error: {str(e)}")
            raise ModelError(f"Model error: {str(e)}")


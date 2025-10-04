import os
from pydantic import Field
from pydantic_settings import BaseSettings
from typing import Optional
from pathlib import Path
from dotenv import load_dotenv

# Prefer production settings when available, fall back to default
dotenv_path = Path(__file__).parent.parent.parent / ".env"
if dotenv_path.exists():
    print("Loading .env")
    load_dotenv(dotenv_path)
else:
    print("Loading .env")
    load_dotenv()

class Settings(BaseSettings):
    # Environment
    ENVIRONMENT: str = Field(default=os.getenv("ENVIRONMENT", "development"))

    # API settings
    API_HOST: str = Field(default=os.getenv("API_HOST", "0.0.0.0"))
    API_PORT: int = Field(default=int(os.getenv("API_PORT", "8000")))
    
    # Redis settings
    REDIS_URL: Optional[str] = Field(default=os.getenv("REDIS_URL"))
    REDIS_HOST: str = Field(default=os.getenv("REDIS_HOST", "localhost"))
    REDIS_PORT: int = Field(default=int(os.getenv("REDIS_PORT", "6379")))
    REDIS_DB: int = Field(default=int(os.getenv("REDIS_DB", "0")))
    
    # API keys
    TRELLIS_API_KEY: Optional[str] = Field(default=os.getenv("TRELLIS_API_KEY", None))
    REPLICATE_API_KEY: Optional[str] = Field(default=os.getenv("REPLICATE_API_KEY", None))
    GEMINI_API_KEY: Optional[str] = Field(default=os.getenv("GEMINI_API_KEY", None))
    
    # Gemini settings
    GEMINI_MODEL: str = Field(default=os.getenv("GEMINI_MODEL", "gemini-2.5-pro"))
    GEMINI_FLASH_MODEL: str = Field(default=os.getenv("GEMINI_FLASH_MODEL", "gemini-2.5-flash"))
    GEMINI_MAX_RETRIES: int = Field(default=int(os.getenv("GEMINI_MAX_RETRIES", "3")))
    GEMINI_TEMPERATURE: float = Field(default=float(os.getenv("GEMINI_TEMPERATURE", "0.7")))
    GEMINI_MAX_TOKENS: int = Field(default=int(os.getenv("GEMINI_MAX_TOKENS", "4096")))

    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra fields from .env

settings = Settings()
print(f"GEMINI_API_KEY: {settings.GEMINI_API_KEY}")

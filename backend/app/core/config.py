import os
from pydantic import Field
from pydantic_settings import BaseSettings
from typing import Optional
from typing import Optional, List
from pathlib import Path
from dotenv import load_dotenv

# Prefer production settings when available, fall back to default
dotenv_path = Path(".env.production")
if dotenv_path.exists():
    load_dotenv(dotenv_path)
else:
    load_dotenv()

class Settings(BaseSettings):
    # API settings
    API_HOST: str = Field(default=os.getenv("API_HOST", "0.0.0.0"))
    API_PORT: int = Field(default=int(os.getenv("API_PORT", "8000")))
    
    # Redis settings
    REDIS_HOST: str = Field(default=os.getenv("REDIS_HOST", "localhost"))
    REDIS_PORT: int = Field(default=int(os.getenv("REDIS_PORT", "6379")))
    REDIS_DB: int = Field(default=int(os.getenv("REDIS_DB", "0")))
    
    # API keys
    TRELLIS_API_KEY: Optional[str] = Field(default=os.getenv("TRELLIS_API_KEY", None))
    REPLICATE_API_KEY: Optional[str] = Field(default=os.getenv("REPLICATE_API_KEY", None))
    GEMINI_API_KEY: Optional[str] = Field(default=os.getenv("GEMINI_API_KEY", None))
    
    # Gemini settings
    GEMINI_MODEL: str = Field(default=os.getenv("GEMINI_MODEL", "gemini-2.5-flash"))

    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra fields from .env

settings = Settings()

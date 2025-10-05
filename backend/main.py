from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.endpoints.example.router import router as example_router
from app.endpoints.redis.router import router as redis_router
from app.endpoints.trellis.router import router as trellis_router
from app.endpoints.chat.router import router as chat_router
from app.endpoints.chat.phase_router import router as phase_router
from app.endpoints.magic_pencil.router import router as magic_pencil_router
from app.endpoints.workflow.router import router as workflow_router
from app.endpoints.storyboard import router as storyboard_router
from app.endpoints.images import router as images_router
from app.endpoints.step_images import router as step_images_router
from app.endpoints.package import router as package_router
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Load environment variables
load_dotenv()

app = FastAPI(title="FastAPI Application")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include domain routers
app.include_router(example_router)
app.include_router(redis_router)
app.include_router(trellis_router)
app.include_router(chat_router)
app.include_router(phase_router)
app.include_router(workflow_router)
app.include_router(magic_pencil_router)
app.include_router(storyboard_router, prefix="/api/storyboard", tags=["storyboard"])
app.include_router(images_router)
app.include_router(step_images_router)
app.include_router(package_router, prefix="/api/package", tags=["package"])

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}


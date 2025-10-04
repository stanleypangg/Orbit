from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.endpoints.example.router import router as example_router
from app.endpoints.redis.router import router as redis_router
from app.endpoints.trellis.router import router as trellis_router

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

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}


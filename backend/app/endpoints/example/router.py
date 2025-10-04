from fastapi import APIRouter

router = APIRouter(prefix="/example", tags=["example"])

@router.get("/")
async def get_example():
    return {"message": "Example domain endpoint"}


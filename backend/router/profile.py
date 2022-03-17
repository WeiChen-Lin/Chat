from fastapi import APIRouter

router = APIRouter()


@router.post("/")
async def test():
    return {"test": "OK"}

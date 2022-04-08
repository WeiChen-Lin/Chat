from fastapi import (
    Request,
    APIRouter,
)
from .utils import Get_JWT_info


router = APIRouter()

@router.get("/")
async def getAllOnlineUser(req: Request):
    uuid, username = Get_JWT_info(req)
    onlineUsers = await req.app.state.redis.getAllOnlineUser()
    onlineUsers.pop(uuid, None)
    return onlineUsers


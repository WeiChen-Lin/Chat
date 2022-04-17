from fastapi import (
    Request,
    APIRouter,
)
from .utils import Get_JWT_info


router = APIRouter()

@router.get("/")
async def getAllOnlineUser(req: Request):
    uuid, username = Get_JWT_info(req)
    print(f'get api connect with user {username}')
    onlineUsers = req.app.state.redis.getAllOnlineUser()
    print(onlineUsers)
    try:
        del onlineUsers[uuid]
    except:
        pass
    finally:
        return onlineUsers



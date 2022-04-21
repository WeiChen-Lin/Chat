from fastapi import (
    Request,
    APIRouter,
)
from .utils import Get_JWT_info


router = APIRouter()


@router.get("/")
async def getAllOnlineUser(req: Request):
    uuid, _ = Get_JWT_info(req)
    onlineUsers = req.app.state.redis.getAllOnlineUser()
    try:
        del onlineUsers[uuid]
    except:
        pass
    finally:
        return onlineUsers

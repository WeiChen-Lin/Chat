from fastapi import Request, APIRouter, Depends
from .utils import Get_JWT_info
from sql import user_crud
from enums import chatEnum
from sqlalchemy.orm import Session
from sql.database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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



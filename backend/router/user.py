from fastapi import Request, APIRouter, Depends
from .utils import Get_JWT_info
from sql import user_crud
from enum import Enum
from sqlalchemy.orm import Session
from sql.database import SessionLocal

router = APIRouter()


class Msg_type(Enum):
    FRIEND_INVITING = 0
    FRIEND_ACCEPT = 1


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


@router.post("/notification")
async def sendFriendInvite(req: Request, db: Session = Depends(get_db)):
    uuid, _ = Get_JWT_info(req)
    _json = await req.json()
    invited_uuid = _json["uuid"]
    test = user_crud.send_invite(db, uuid, invited_uuid, Msg_type.FRIEND_INVITING.value)
    return test

@router.get("/notification")
async def getAllNotification(req: Request, db: Session = Depends(get_db)):
    uuid, _ = Get_JWT_info(req)
    all_notification = user_crud.get_all_notification(db, uuid)
    return all_notification

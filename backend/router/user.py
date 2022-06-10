from fastapi import Request, APIRouter, Depends
from .utils import Get_JWT_info, handleInvite
from sql import user_crud
from enums import chatEnum
from sqlalchemy.orm import Session
from sql.database import SessionLocal
from pprint import pprint

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
async def getAllOnlineUser(req: Request, db: Session = Depends(get_db)):
    uuid, _ = Get_JWT_info(req)
    onlineUsers = req.app.state.redis.getAllOnlineUser()
    try:
        del onlineUsers[uuid]
    except Exception as e:
        print(e)
    userinfos = user_crud.get_info_within_login(db, uuid)
    userinfos["onlineUsers"] = onlineUsers
    # handleInvite(userinfos['onlineUsers'], userinfos['notifications'])
    return userinfos

from fastapi import Request, APIRouter, Depends
from .utils import Get_JWT_info
from sql import nty_crud
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
async def getAllNotification(req: Request, db: Session = Depends(get_db)):
    uuid, _ = Get_JWT_info(req)
    all_notification = nty_crud.get_all_notification(db, uuid)
    return all_notification


@router.post("/invite")
async def sendFriendInvite(req: Request, db: Session = Depends(get_db)):
    uuid, _ = Get_JWT_info(req)
    _json = await req.json()
    invited_uuid = _json["uuid"]
    test = nty_crud.send_invite(
        db, uuid, invited_uuid, chatEnum.Msg_type.FRIEND_INVITING.value
    )
    return test


@router.post("/response")
async def getFriendResponse(req: Request, db: Session = Depends(get_db)):
    uuid, _ = Get_JWT_info(req)
    _json = await req.json()
    status = nty_crud.set_frined_response(db, _json['user_uuid_from'], uuid, _json['status'])
    return status
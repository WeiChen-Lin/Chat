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
    user_uuid_from, _ = Get_JWT_info(req)
    _json = await req.json()
    user_uuid_to = _json["user_uuid_to"]
    status = nty_crud.send_invite(
        db, user_uuid_from, user_uuid_to, chatEnum.Status_type.FRIEND_INVITING.value
    )
    return status


@router.post("/response")
async def getFriendResponse(req: Request, db: Session = Depends(get_db)):
    uuid, _ = Get_JWT_info(req)
    _json = await req.json()
    status = nty_crud.set_frined_response(
        db, _json["user_uuid_from"], uuid, _json["status"]
    )
    return status

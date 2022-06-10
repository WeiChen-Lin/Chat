from fastapi import Request, APIRouter, Depends
from .utils import Get_JWT_info
from sql import nty_crud
from sqlalchemy.orm import Session
from sql.database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
async def get_member_detail(req: Request, db: Session = Depends(get_db)):
    user_uuid_from, _ = Get_JWT_info(req)
    _json = await req.json()
    member_uuid = _json["uuid"]
    status = nty_crud.get_member_detail(
        db, member_uuid, user_uuid_from
    )
    return status



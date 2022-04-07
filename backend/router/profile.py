from fastapi import (
    Depends,
    Request,
    APIRouter,
)
from .utils import Get_JWT_info
from sql import profile_crud
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
async def getUserProfile(req: Request, db: Session = Depends(get_db)):
    uuid, username = Get_JWT_info(req)
    profile = profile_crud.get_user_profile(db, uuid, username)

    return profile


@router.post("/")
async def editIntroduction(req: Request, db: Session = Depends(get_db)):
    uuid, username = Get_JWT_info(req)
    body = await req.json()
    profile_crud.edit_introduction(db, uuid, username, body["introduction"])
    return "ok"

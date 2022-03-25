from fastapi import (
    Depends,
    FastAPI,
    HTTPException,
    Cookie,
    Header,
    Response,
    Request,
    APIRouter,
)
from .utils import verify_JWT_header, Get_JWT_info, JWT_SECRET_KEY, ALGORITHM
from sql import profile_crud
from sqlalchemy.orm import Session
from sql.database import SessionLocal, engine

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
async def editIntroduction(req: Request, db: Session = Depends(get_db)):
    uuid, username = Get_JWT_info(req)
    body = await req.json()
    profile_crud.edit_introduction(db, uuid, username, body['introduction'])
    return "ok"

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
from .utils import verify_JWT_header, JWT_SECRET_KEY, ALGORITHM
from sql import crud
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from sql.database import SessionLocal, engine

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 由一開始登入就送使用者資料就好

# @router.get("/")
# async def getPersonalProfile(req: Request, db: Session = Depends(get_db)):
#     token = verify_JWT_header(req)
#     try:
#         payload = jwt.decode(token.split(" ")[1], JWT_SECRET_KEY, [ALGORITHM])
#         username = payload.get('username')
#         uuid = payload.get('id')
#         if not username or not uuid:
#             raise HTTPException(
#                 status_code=401, detail="Invalid Authorization (info loss)"
#             )

#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid Authorization (jwt fail)")

#     userinfo = crud.get_user_for_auth(db, uuid, username)

#     if not userinfo:
#         raise HTTPException(
#             status_code=401, detail="Invalid Authorization (no this user)"
#         )

#     return {"status": "Authorization", "userifo": userinfo.to_dict()}

from fastapi import (
    Depends,
    HTTPException,
    Response,
    Request,
    APIRouter,
)
from .utils import verify_JWT_header, JWT_SECRET_KEY, ALGORITHM
from sqlalchemy.orm import Session
from sql.database import SessionLocal
from sql import user_crud, schemas
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
async def login(req: Request, db: Session = Depends(get_db)):
    token = verify_JWT_header(req)
    try:
        payload = jwt.decode(token.split(" ")[1], JWT_SECRET_KEY, [ALGORITHM])
        username = payload.get("username")
        uuid = payload.get("id")
        if not username or not uuid:
            raise HTTPException(
                status_code=401, detail="Invalid Authorization (info loss)"
            )

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid Authorization (jwt fail)")

    userinfo = user_crud.get_user_for_auth(db, uuid, username)
    if not userinfo:
        raise HTTPException(
            status_code=401, detail="Invalid Authorization (no this user)"
        )

    return {
        "status": "Authorization",
    }


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/")
async def create_user(
    response: Response, user: schemas.UserCreate, db: Session = Depends(get_db)
):
    db_user = user_crud.get_user_by_username(
        db, username=user.username, password=user.password
    )
    # 1. 確認有在db後，且密碼正確, 核發JWT token並登入
    if db_user["status"] == "login":
        user_data = db_user["info"].to_dict()
        if user.remember:
            response.set_cookie(
                key="chat-remember",
                value="True",
                max_age=604800,
                samesite="none",
                secure=True,
            )
        return {
            "status": "login",
            "access-token": create_access_token(
                {"id": user_data["uuid"], "username": user_data["username"]}
            ),
        }

    elif db_user["status"] == "incorrect":
        raise HTTPException(status_code=401, detail="Unauthorized")

    else:
        # 2. 沒在db, 將密碼加密後送進db, 並且核發JWT token
        created_user = user_crud.create_user(db=db, user=user).to_dict()
        if user.remember:
            response.set_cookie(
                key="chat-remember",
                value="True",
                max_age=604800,
                samesite="none",
                secure=True,
            )
        return {
            "status": "New User!",
            "access-token": create_access_token(
                {"id": created_user["uuid"], "username": created_user["username"]}
            ),
        }

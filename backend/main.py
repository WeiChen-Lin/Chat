from datetime import datetime, timedelta
from typing import List, Optional
from urllib.request import Request

from jose import JWTError, jwt
from fastapi import Depends, FastAPI, HTTPException, Cookie, Header, Response, Request
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from sql import table, schemas, user_crud
from sql.database import SessionLocal, engine
from router import profile

table.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=[
        "Content-Type",
        "Set-Cookie",
        "access-control-allow-origin",
        "Authorization",
    ],
)

JWT_SECRET_KEY = "69a55a371d0e0cdda9a582fb774f767b1940a54089e2d2b7392d9c8a2a6f3a74"
ALGORITHM = "HS256"

app.include_router(profile.router, prefix="/api/profile")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


"""
目前route會集中在一起寫
未來會照功能做router的區分
"""
# 1. Login相關 api

"""
進到首頁後

1. 是否含有chat-remember cookie
    -> 有的話以 get打 api/login，帶上 localstorage的token，並且驗證JWT

"""


def verify_JWT_header(req: Request):
    token = req.headers.get("Authorization", False)
    if not token:
        raise HTTPException(
            status_code=401, detail="Invalid Authorization (Header Loss)"
        )

    return token


@app.get("/api/login")
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

    user_data = userinfo.to_dict()

    return {
        "status": "Authorization",
        "userinfo": {
            "username": user_data["username"],
            "imageurl": user_data["imageurl"],
            "introduction": user_data["introduction"],
        },
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


@app.post("/api/login")
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
            "userinfo": {
                "username": user_data["username"],
                "imageurl": user_data["imageurl"],
                "introduction": user_data["introduction"],
            },
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
            "userinfo": {
                "username": created_user["username"],
                "imageurl": created_user["imageurl"],
                "introduction": created_user["introduction"],
            },
        }

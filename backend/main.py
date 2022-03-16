from datetime import datetime, timedelta
from typing import List, Optional
from jose import JWTError, jwt
from fastapi import Depends, FastAPI, HTTPException, Cookie, Response
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from sql import crud, table, schemas
from sql.database import SessionLocal, engine

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
    allow_headers=["Content-Type", "Set-Cookie", "access-control-allow-origin"],
)

JWT_SECRET_KEY = "69a55a371d0e0cdda9a582fb774f767b1940a54089e2d2b7392d9c8a2a6f3a74"
ALGORITHM = "HS256"

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


@app.get("api/login")
async def login(chatToken: Optional[str] = Cookie(None)):
    if not chatToken:
        raise HTTPException(status_code=401, detail="not autherized")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/api/login")
async def create_user(
    response: Response, user: schemas.UserCreate, db: Session = Depends(get_db)
):
    db_user = crud.get_user_by_username(
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
                httponly=True,
            )
        return {
            "status": "login",
            "access-token": create_access_token(
                {"id": user_data["id"], "username": user_data["username"]}
            ),
        }

    elif db_user["status"] == "incorrect":
        raise HTTPException(status_code=401, detail="Unauthorized")

    else:
        # 2. 沒在db, 將密碼加密後送進db, 並且核發JWT token
        created_user = crud.create_user(db=db, user=user).to_dict()
        if user.remember:
            response.set_cookie(
                key="chat-remember",
                value="True",
                max_age=604800,
                samesite="none",
                secure=True,
                httponly=True,
            )
        return {
            "status": "New User!",
            "access-token": create_access_token(
                {"id": created_user["id"], "username": created_user["username"]}
            ),
        }


# 2. 個人資料相關 api
@app.post("/api/profile")
async def create_userinfo():
    return "ok"

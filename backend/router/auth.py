from fastapi import APIRouter, Cookie
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class UserInfo(BaseModel):
    name: str


# 登入機制
# 1. 第一次登入，Server回傳 JWT Token，存在cookie中
# 2. 之後登入先 check cookie中的JWT，若有則放行

SECRET_KEY = "wM7xmBeJm7DeMcx0Sg5s8VQLl7QzUDlx9yxRx1aNi4k="


@router.get("/refresh_token")
async def refresh_token(chat_name: Optional[str] = Cookie(None)):
    if chat_name:
        return "Hello"
    return {"token": "refresh"}


@router.post("/auth")
async def auth_with_username(userinfo: UserInfo):
    return {"token": "access denied"}

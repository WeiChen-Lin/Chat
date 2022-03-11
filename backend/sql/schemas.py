from typing import List, Optional

from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    token: Optional[str] = None


class UserCreate(UserBase):
    password: str
    remember: bool


class User(UserBase):
    id: int
    username: str
    token: Optional[str] = None

    class Config:
        orm_mode = True

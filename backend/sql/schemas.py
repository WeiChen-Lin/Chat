from typing import List, Optional

from pydantic import BaseModel


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str
    remember: bool


class User(UserBase):
    id: int
    username: str

    class Config:
        orm_mode = True

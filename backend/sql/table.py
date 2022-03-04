from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)


# def to_dict(self):
#     return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}

# Base.to_dict = to_dict
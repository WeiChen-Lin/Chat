from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


def to_dict(self):
    return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}


Base.to_dict = to_dict


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    uuid = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    imageurl = Column(Text)
    introduction = Column(Text)

    # friendship = relationship("Friendship", back_populates="users")
    # message = relationship("Message", back_populates="users")


class Friendship(Base):
    __tablename__ = "friends"

    id = Column(Integer, primary_key=True)
    user_uuid_from = Column(
        String, ForeignKey("users.uuid"), index=True, nullable=False
    )
    user_uuid_to = Column(String, ForeignKey("users.uuid"), nullable=False)
    checked = Column(Boolean, index=True, default=False)

    userfrom = relationship("User", foreign_keys=[user_uuid_from])
    userto = relationship("User", foreign_keys=[user_uuid_to])


class Message(Base):
    __tablename__ = "message"

    id = Column(Integer, primary_key=True)
    user_uuid_from = Column(
        String, ForeignKey("users.uuid"), index=True, nullable=False
    )
    user_uuid_to = Column(String, ForeignKey("users.uuid"), nullable=False)
    message = Column(Text, nullable=False)
    time = Column(DateTime(timezone=True), server_default=func.now())

    userfrom = relationship("User", foreign_keys=[user_uuid_from])
    userto = relationship("User", foreign_keys=[user_uuid_to])

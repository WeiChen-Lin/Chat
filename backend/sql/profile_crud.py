from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import table, schemas


def get_user_profile(db: Session, uuid: str, username: str):

    try:
        target_user = (
            db.query(table.User.username, table.User.imageurl, table.User.introduction)
            .filter(table.User.username == username and table.User.uuid == uuid)
            .first()
        )

        return {
            "username": target_user[0],
            "imageurl": target_user[1],
            "introduction": target_user[2],
        }

    except AttributeError:
        raise HTTPException(
            status_code=401, detail="Invalid Authorization (no this user)"
        )


def edit_introduction(db: Session, uuid: str, username: str, introduction: str):

    try:
        target_user = (
            db.query(table.User)
            .filter(table.User.username == username and table.User.uuid == uuid)
            .first()
        )
        target_user.introduction = introduction
        db.commit()
        return introduction
    except AttributeError:
        raise HTTPException(
            status_code=401, detail="Invalid Authorization (no this user)"
        )

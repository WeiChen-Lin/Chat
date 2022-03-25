from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import table, schemas


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

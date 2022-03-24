from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import table, schemas


def edit_introduction(db: Session, uuid: str, username: str, description: str):

    try:
        target_user = (
            db.query(table.User)
            .filter(table.User.username == username and table.User.uuid == uuid)
            .first()
        )
        target_user.description = description
        db.commit()
        return description
    except AttributeError:
        raise HTTPException(
            status_code=401, detail="Invalid Authorization (no this user)"
        )

from sqlalchemy.orm import Session

from . import table, schemas


def get_user_by_username(db: Session, username: str):

    result = db.query(table.User).filter(table.User.username == username).first()

    return db.query(table.User).filter(table.User.username == username).first()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = table.User(username=user.username, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

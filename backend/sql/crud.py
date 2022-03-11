from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import table, schemas

# bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_user_by_username(db: Session, username: str, password: str):

    userinfo = db.query(table.User).filter(table.User.username == username).first()

    # 使用者名稱在
    if userinfo:
        if verify_password(password, userinfo.to_dict()["hashed_password"]):
            return {"status": "login", "info": userinfo}

        else:
            return {"status": "incorrect"}

    else:
        return {"status": "no info"}


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password_intodb = hash_password(user.password)
    db_user = table.User(username=user.username, hashed_password=hashed_password_intodb)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

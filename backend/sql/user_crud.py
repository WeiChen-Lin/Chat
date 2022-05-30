from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import table, schemas
from uuid import uuid4
from enums import chatEnum

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
    uuid = str(uuid4())
    db_user = table.User(
        uuid=uuid, username=user.username, hashed_password=hashed_password_intodb
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_for_auth(db: Session, uuid: str, username: str):

    userinfo = (
        db.query(table.User)
        .filter(table.User.username == username and table.User.uuid == uuid)
        .first()
    )

    return userinfo


def get_user_for_redis(db: Session, uuid: str, username: str):

    try:
        userinfo = (
            db.query(table.User.username, table.User.imageurl, table.User.introduction)
            .filter(table.User.uuid == uuid and table.User.username == username)
            .first()
        )
        return {
            "username": userinfo[0],
            "imageurl": userinfo[1],
            "introduction": userinfo[2],
        }
    except Exception as e:
        print(e)


def get_info_within_login(db: Session, uuid: str):
    """"""
    try:
        friends = (
            db.query(
                table.Friendship.user_uuid_to, table.User.username, table.User.imageurl
            )
            .join(table.User, table.Friendship.user_uuid_to == table.User.uuid)
            .filter(table.Friendship.user_uuid_from == uuid)
            .all()
        )

        notifications = (
            db.query(
                table.Notification.user_uuid_from,
                table.User.username,
                table.User.imageurl,
                table.Notification.message_type,
                table.Notification.status,
                table.Notification.time,
            )
            .join(table.User, table.User.uuid == table.Notification.user_uuid_from)
            .filter(table.Notification.user_uuid_to == uuid)
            .all()
        )

        return {"friends": friends, "notifications": notifications}

    except Exception as e:
        print(e)

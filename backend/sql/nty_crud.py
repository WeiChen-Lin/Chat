from enums import chatEnum
from . import table, schemas
from sqlalchemy.orm import Session
from .database import SessionLocal
from pprint import pprint


def create_friends(db: Session, user_uuid_from: str, user_uuid_to: str):
    try:
        user_from = table.Friendship(
            user_uuid_from=user_uuid_from, user_uuid_to=user_uuid_to
        )
        user_to = table.Friendship(
            user_uuid_from=user_uuid_to, user_uuid_to=user_uuid_from
        )
        db.add(user_from)
        db.add(user_to)
        db.commit()
        print("create friend access")
        return True

    except Exception as e:
        print(e)
        db.rollback()
        print("create friend fail")
        return True


def send_invite(db: Session, user_uuid_from: str, user_uuid_to: str, message_type: int):

    # 確認是否有來自對方的交友邀請
    invited_info_checker = (
        db.query(
            table.Notification.user_uuid_from,
            table.Notification.user_uuid_to,
            table.Notification.message_type,
            table.Notification.status,
        )
        .filter(
            table.Notification.user_uuid_from == user_uuid_to
            and table.Notification.user_uuid_to == user_uuid_from
            and table.Notification.message_type == message_type
        )
        .first()
    )

    if not invited_info_checker:
        add_friend_nty = table.Notification(
            user_uuid_from=user_uuid_from,
            user_uuid_to=user_uuid_to,
            message_type=message_type,
            status=chatEnum.Status_type.FRIEND_INVITING.value,
        )
        db.add(add_friend_nty)
        db.commit()
        db.refresh(add_friend_nty)
        return True

    else:
        if invited_info_checker.status == chatEnum.Status_type.FRIEND_INVITING.value:
            invited_info_checker.status = chatEnum.Status_type.FRIEND_ACCEPT.value
            create_friends(db, user_uuid_from, user_uuid_to)

            return True

        elif invited_info_checker.status == chatEnum.Status_type.FRIEND_ACCEPT.value:
            return True

        elif invited_info_checker.status == chatEnum.Status_type.FRIEND_REJECT.value:
            add_friend_nty = table.Notification(
                user_uuid_from=user_uuid_from,
                user_uuid_to=user_uuid_to,
                message_type=message_type,
                status=chatEnum.Status_type.FRIEND_INVITING.value,
            )
            db.add(add_friend_nty)
            db.commit()
            db.refresh(add_friend_nty)
            return True

    return None


def get_all_notification(db: Session, user_uuid_to: str):
    try:
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
            .filter(table.Notification.user_uuid_to == user_uuid_to)
            .all()
        )
        return notifications
    except Exception as e:
        print(e)


def set_frined_response(
    db: Session, user_uuid_from: str, user_uuid_to: str, status: int
):
    if status == chatEnum.Status_type.FRIEND_ACCEPT.value:

        try:
            user_from = table.Friendship(
                user_uuid_from=user_uuid_from, user_uuid_to=user_uuid_to
            )
            user_to = table.Friendship(
                user_uuid_from=user_uuid_to, user_uuid_to=user_uuid_from
            )
            target_notification = (
                db.query(table.Notification)
                .filter(
                    table.Notification.user_uuid_from == user_uuid_from
                    and table.Notification.user_uuid_to == user_uuid_to
                    and table.Notification.message_type
                    == chatEnum.Notification_Type.FRIEND_RELATED.value
                )
                .first()
            )
            target_notification.status = chatEnum.Status_type.FRIEND_ACCEPT.value
            db.add(user_from)
            db.add(user_to)
            db.commit()
            print("accept access")
            return True

        except Exception as e:
            print(e)
            db.rollback()
            print("accept fail")
            return True

    elif status == chatEnum.Status_type.FRIEND_REJECT.value:
        try:
            target_notification = (
                db.query(table.Notification)
                .filter(
                    table.Notification.user_uuid_from == user_uuid_from
                    and table.Notification.user_uuid_to == user_uuid_to
                    and table.Notification.message_type
                    == chatEnum.Notification_Type.FRIEND_RELATED.value
                )
                .first()
            )
            target_notification.status = chatEnum.Status_type.FRIEND_REJECT.value
            db.commit()
            print("reject success")
            return True
        except Exception as e:
            print(e)
            db.rollback()
            print("reject fail")

            return True

    else:
        print("not work")
        return False


def get_member_detail(db: Session, member_uuid: str, my_uuid: str):

    introduction = (
        db.query(table.User.introduction).filter(table.User.uuid == member_uuid).first()
    )

    send_checker = (
        db.query(table.Notification)
        .filter(
            table.Notification.user_uuid_from == my_uuid
            and table.Notification.user_uuid_to == member_uuid
            and table.Notification.message_type == 0
        )
        .first()
    )

    receive_checker = (
        db.query(table.Notification)
        .filter(
            table.Notification.user_uuid_from == member_uuid
            and table.Notification.user_uuid_to == my_uuid
            and table.Notification.message_type == 0
        )
        .first()
    )

    inviteStatus = None

    if not send_checker and not receive_checker:
        inviteStatus = chatEnum.Friend_Reply_type.DEFAULT.value

# class Friend_Reply_type(Enum):
#     WAITING = 0
#     SUCCESS = 1
#     BLOCKING = 2
#     DEFAULT = 3
#     REPLY = 4

    elif send_checker or receive_checker:
        if send_checker:

            status = send_checker.status
            if status == chatEnum.Status_type.FRIEND_INVITING.value:
                inviteStatus = chatEnum.Friend_Reply_type.WAITING.value
            elif status == chatEnum.Status_type.FRIEND_ACCEPT.value:
                inviteStatus = chatEnum.Friend_Reply_type.SUCCESS.value
            elif status == chatEnum.Status_type.FRIEND_REJECT.value:
                inviteStatus = chatEnum.Friend_Reply_type.BLOCKING.value


        elif receive_checker:

            status = receive_checker.status
            if status == chatEnum.Status_type.FRIEND_INVITING.value:
                inviteStatus = chatEnum.Friend_Reply_type.REPLY.value
            elif status == chatEnum.Status_type.FRIEND_ACCEPT.value:
                inviteStatus = chatEnum.Friend_Reply_type.SUCCESS.value
            elif status == chatEnum.Status_type.FRIEND_REJECT.value:
                inviteStatus = chatEnum.Friend_Reply_type.BLOCKING.value

    return {"introduction": introduction[0], "inviteStatus": inviteStatus}

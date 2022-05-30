from enums import chatEnum
from . import table, schemas
from sqlalchemy.orm import Session


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


def check_friend_exist():
    """"""


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

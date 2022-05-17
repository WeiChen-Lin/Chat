from enum import Enum


class Msg_type(Enum):
    FRIEND_INVITING = 0
    FRIEND_ACCEPT = 1
    FRIEND_REJECT = 2


class Notification_Type(Enum):
    FRIEND_RELATED = 0

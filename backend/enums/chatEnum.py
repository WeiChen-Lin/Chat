from enum import Enum


class Status_type(Enum):
    FRIEND_INVITING = 0
    FRIEND_ACCEPT = 1
    FRIEND_REJECT = 2
    # FRIEND_DEFAULY = 4

class Notification_Type(Enum):
    FRIEND_RELATED = 0

class Friend_Reply_type(Enum):
    WAITING = 0
    SUCCESS = 1
    BLOCKING = 2
    DEFAULT = 3
    REPLY = 4
from fastapi import HTTPException, Request
from jose import JWTError, jwt
import datetime
import json

JWT_SECRET_KEY = "69a55a371d0e0cdda9a582fb774f767b1940a54089e2d2b7392d9c8a2a6f3a74"
ALGORITHM = "HS256"


def verify_JWT_header(req: Request):
    token = req.headers.get("Authorization", False)
    if not token:
        raise HTTPException(
            status_code=401, detail="Invalid Authorization (Header Loss)"
        )

    return token


def Get_JWT_info(req: Request):
    token = req.headers.get("Authorization", False)
    if not token:
        raise HTTPException(
            status_code=401, detail="Invalid Authorization (Header Loss)"
        )
    try:
        payload = jwt.decode(token.split(" ")[1], JWT_SECRET_KEY, [ALGORITHM])
        username = payload.get("username")
        uuid = payload.get("id")
        if not username or not uuid:
            raise HTTPException(
                status_code=401, detail="Invalid Authorization (info loss)"
            )
        return (uuid, username)

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid Authorization (jwt fail)")


def from_token_getinfo(token: str):

    try:
        payload = jwt.decode(token.split(" ")[1], JWT_SECRET_KEY, [ALGORITHM])
        username = payload.get("username")
        uuid = payload.get("id")
        if not username or not uuid:
            raise HTTPException(
                status_code=401, detail="Invalid Authorization (info loss)"
            )
        return (uuid, username)

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid Authorization (jwt fail)")


def handleInvite(onlineUsers, notificaitons):
    for noti in notificaitons:
        if noti[3] == 0:
            if noti[4] == 0:
                onlineUsers[noti[0]] = handleOnlineUserObj(onlineUsers[noti[0]], 1)
            elif noti[4] == 1:
                del onlineUsers[noti[0]]
            elif noti[4] == 2:
                onlineUsers[noti[0]] = handleOnlineUserObj(onlineUsers[noti[0]], 1)
        else:
            continue
    

def handleOnlineUserObj(user_str, inviteStatus):
    user_dict = json.loads(user_str)
    user_dict['inviteStatus'] = inviteStatus
    return json.dumps(user_dict)

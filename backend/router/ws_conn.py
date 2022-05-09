from fastapi import Depends, APIRouter
from sql import user_crud
from .utils import from_token_getinfo
from sqlalchemy.orm import Session
from sql.database import SessionLocal
import json
import asyncio
import redis
from starlette.websockets import WebSocket, WebSocketDisconnect

pool = redis.ConnectionPool(host="localhost", port=6379, decode_responses="utf-8")

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


redis_conn = redis.Redis(connection_pool=pool)
online_channel = "allOnlineUser"


async def OnlinerPubSub(pubsub):

    await asyncio.sleep(0.1)
    msg = pubsub.get_message()
    if msg:
        return msg
    else:
        return None


@router.websocket("/ws/user")
async def RealtimeUser(websocket: WebSocket, db: Session = Depends(get_db)):

    await websocket.accept()
    text = await websocket.receive_text()
    uuid, username = from_token_getinfo(text)
    userinfo = user_crud.get_user_for_redis(db, uuid, username)
    userinfo["uuid"] = uuid
    userinfo["status"] = "enter"
    redis_conn.publish(online_channel, json.dumps(userinfo))
    redis_conn.hset(online_channel, uuid, json.dumps(userinfo))

    print(f"websocket connect with user: {username}")
    pubsub = redis_conn.pubsub()
    pubsub.subscribe(online_channel)
    while True:
        try:
            # Check if connection is active
            await asyncio.wait_for(websocket.receive_text(), timeout=0.1)
        except asyncio.TimeoutError:
            # Connection is still alive
            subtext = await OnlinerPubSub(pubsub)
            if subtext:
                if subtext["type"] == "message":
                    userinfo = json.loads(subtext["data"])
                    if userinfo["uuid"] != uuid:

                        await websocket.send_json(subtext["data"])
            continue
        except WebSocketDisconnect:
            # Connection closed by client
            userinfo["status"] = "leave"
            redis_conn.publish(online_channel, json.dumps(userinfo))
            redis_conn.hdel("allOnlineUser", uuid)
            break

        else:
            # Received some data from the client, ignore it
            continue

    pubsub.unsubscribe(online_channel)


@router.websocket("/ws/notification")
async def RealtimeNotification(websocket: WebSocket, db: Session = Depends(get_db)):
    await websocket.accept()
    text = await websocket.receive_text()
    uuid, username = from_token_getinfo(text)
    notifications = user_crud.get_all_notification(db, uuid)

    print(f"user: {username} get notifications")
    pubsub = redis_conn.pubsub()
    pubsub.subscribe(f'{uuid}_notifications')
    while True:
        try:
            # Check if connection is active
            await asyncio.wait_for(websocket.receive_text(), timeout=0.1)
        except asyncio.TimeoutError:
            # Connection is still alive
            # subtext = await OnlinerPubSub(pubsub)
            # if subtext:
            #     if subtext["type"] == "message":
            #         userinfo = json.loads(subtext["data"])
            #         if userinfo["uuid"] != uuid:

            #             await websocket.send_json(subtext["data"])
            continue
        except WebSocketDisconnect:
            # Connection closed by client
            # userinfo["status"] = "leave"
            # redis_conn.publish(online_channel, json.dumps(userinfo))
            # redis_conn.hdel("allOnlineUser", uuid)
            break

        else:
            # Received some data from the client, ignore it
            continue

    pubsub.unsubscribe(f'{uuid}_notifications')

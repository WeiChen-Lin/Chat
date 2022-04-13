from fastapi import Depends, WebSocket, APIRouter
from sql import user_crud
from .utils import from_token_getinfo
from sqlalchemy.orm import Session
from sql.database import SessionLocal
import json

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.websocket("/ws/setonline")
async def websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    # RedisConn 物件放在 websocket.app.state.redis
    await websocket.accept()
    while True:
        try:
            # Wait for any message from the client
            text = await websocket.receive_text()
            uuid, username = from_token_getinfo(text)
            userinfo = user_crud.get_user_for_redis(db, uuid, username)
            print(f'websocket connect with user: {username}')
            await websocket.app.state.redis.setOnlineUser(uuid, json.dumps(userinfo))
        except Exception as e:
            print("error:", e)
            break
    print(f'{username} connection break')
    await websocket.app.state.redis.delOnlineuser(uuid)

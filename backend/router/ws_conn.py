from black import main
from fastapi import (
    WebSocket,
    APIRouter
)
import random

router = APIRouter()

@router.websocket("/ws/setonline")
async def websocket_endpoint(websocket: WebSocket):
    # RedisConn 物件放在 websocket.app.state.redis
    print('Accepting client connection...')
    await websocket.accept()
    while True:
        try:
            # Wait for any message from the client
            text = await websocket.receive_text()
            print(text)
            # await websocket.send_json(resp)
        except Exception as e:
            print('error:', e)
            break
    print('Bye..')

from black import main
from fastapi import (
    WebSocket,
    APIRouter
)
import random

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print('Accepting client connection...')
    await websocket.accept()
    print(websocket.app.state.redis)
    while True:
        try:
            # Wait for any message from the client
            await websocket.receive_text()
            # Send message to the client
            resp = {'value': random.uniform(0, 1)}
            await websocket.send_json(resp)
        except Exception as e:
            print('error:', e)
            break
    print('Bye..')

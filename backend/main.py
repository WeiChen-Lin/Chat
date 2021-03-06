from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sql import table
from sql.database import engine
from router import user, profile, auth, ws_conn, nty, detail
from redis_cli import redis_conn

table.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=[
        "Content-Type",
        "Set-Cookie",
        "access-control-allow-origin",
        "Authorization",
    ],
)

app.include_router(profile.router, prefix="/api/profile")
app.include_router(auth.router, prefix="/api/login")
app.include_router(ws_conn.router)
app.include_router(user.router, prefix="/api/user")
app.include_router(nty.router, prefix="/api/nty")
app.include_router(detail.router, prefix="/api/detail")


@app.on_event("startup")
async def create_redis():
    app.state.redis = redis_conn.ChatRedis()

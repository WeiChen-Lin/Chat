from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sql import table 
from sql.database import engine
from router import profile, auth, ws_conn
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


@app.on_event("startup")
async def create_redis():
    app.state.redis = await redis_conn.RedisCli()


@app.on_event("shutdown")
async def close_redis():
    await app.state.redis.closeConn()

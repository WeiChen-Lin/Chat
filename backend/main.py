from fastapi import FastAPI
from enum import Enum
from fastapi.middleware.cors import CORSMiddleware
from .router import auth

app = FastAPI()

origins = ["http://localhost", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ModelName(str, Enum):
    alexnet = "alexnetsa"
    resnet = "resnet"
    lenet = "lenet"


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(auth.router)

import asyncio
import aioredis

async def connect_tcp():
    conn = await aioredis.create_connection(
        ('localhost', 6379))

    return conn


import asyncio
import aioredis


class ChatRedis:
    async def setOnlineUser(self, uuid: str, userinfo: dict):
        try:
            await self.conn.hset("AllOnlineUser", uuid, userinfo)

        except Exception as e:
            print(e)

    async def delOnlineuser(self, uuid: str, userinfo: dict):
        try:
            await self.conn.hdel("AllOnlineUser", uuid)

        except Exception as e:
            print(e)

    async def getAllOnlineUser(self):
        try:
            return await self.conn.hgetall("AllOnlineUser")

        except Exception as e:
            print(e)

    async def setFriendInfo(self, uuid: str, friend_uuid: str, friend_userinfo: dict):
        try:
            return await self.conn.hset(uuid, friend_uuid, friend_userinfo)

        except Exception as e:
            print(e)

    async def getAllFriend(self, uuid: str):
        try:
            return await self.conn.hgetall(uuid)

        except Exception as e:
            print(e)

    async def closeConn(self):
        try:
            self.conn.close()
            await self.conn.wait_closed()

        except Exception as e:
            print(e)


async def RedisCli():
    ChatRedis.conn = await aioredis.create_redis_pool("redis://localhost")
    return ChatRedis()

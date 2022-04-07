import aioredis


class ChatRedis:
    async def setOnlineUser(self, uuid: str, userinfo: dict):
        try:
            await self.conn.execute("HSET", "AllOnlineUser", uuid, userinfo)

        except Exception as e:
            print(e)

    async def delOnlineuser(self, uuid: str):
        try:
            return await self.conn.execute("HDEL", "AllOnlineUser", uuid)

        except Exception as e:
            print(e)

    async def getAllOnlineUser(self):
        try:
            return await self.conn.execute("HGETALL", "AllOnlineUser")

        except Exception as e:
            print(e)

    async def setFriendInfo(self, uuid: str, friend_uuid: str, friend_userinfo: dict):
        try:
            await self.conn.execute("HSET", uuid, friend_uuid, friend_userinfo)

        except Exception as e:
            print(e)

    async def getAllFriend(self, uuid: str):
        try:
            await self.conn.execute("HGETALL", uuid)

        except Exception as e:
            print(e)

    async def closeConn(self):
        try:
            self.conn.close()
            await self.conn.wait_closed()

        except Exception as e:
            print(e)


async def RedisCli():
    ChatRedis.conn = await aioredis.create_connection(
        ("localhost", "6379"), encoding="utf-8"
    )
    return ChatRedis()

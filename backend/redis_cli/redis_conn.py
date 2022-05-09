import redis

pool = redis.ConnectionPool(host="localhost", port=6379, decode_responses="utf-8")


class ChatRedis:
    def __init__(self):
        self._conn = redis.Redis(connection_pool=pool)
        self.online_channel = "allOnlineUser"

    def setOnlineUser(self, uuid: str, userinfo: dict):
        try:
            self._conn.hset("allOnlineUser", uuid, userinfo)

        except Exception as e:
            print(e)

    def delOnlineuser(self, uuid: str):
        try:
            self._conn.hdel("allOnlineUser", uuid)

        except Exception as e:
            print(e)

    def getAllOnlineUser(self):

        try:
            redisdata = self._conn.hgetall("allOnlineUser")
            return redisdata

        except Exception as e:
            print(e)

import redis

pool = redis.ConnectionPool(host='localhost', port=6379, decode_responses="utf-8")

class ChatRedis:

    def __init__(self):
        self._conn = redis.Redis(connection_pool=pool)
        self.online_sub = 'allOnlineUser'
        self.online_pub = 'allOnlineUser'
    
    def online_publisher(self, userinfo):

        self._conn.publish(self.online_pub, userinfo)
        return True
        
    def online_subscriber(self):

        pub = self._conn.pubsub()

        pub.subscribe(self.online_sub)
        pub.parse_response()

        return pub
    
    def setOnlineUser(self, uuid: str, userinfo: dict):
        try:
            self._conn.hset('AllOnlineUser', uuid, userinfo)

        except Exception as e:
            print(e)

    def delOnlineuser(self, uuid: str):
        try:
            self._conn.hdel("AllOnlineUser", uuid)

        except Exception as e:
            print(e)

    def getAllOnlineUser(self):

        try:
            redisdata = self._conn.hgetall("AllOnlineUser")         
            print(f'Redis hgetall data length is : {len(redisdata)}')

            # for index in range(len(redisdata)):
            #     if index % 2 != 0:
            #         continue
            #     return_dict[redisdata[index]] = redisdata[index + 1]

            return redisdata

        except Exception as e:
            print(e)

    def setFriendInfo(self, uuid: str, friend_uuid: str, friend_userinfo: dict):
        try:
            self._conn.hset(uuid, friend_uuid, friend_userinfo)

        except Exception as e:
            print(e)

    def getAllFriend(self, uuid: str):
        try:
            self._conn.hgetall(uuid)

        except Exception as e:
            print(e)



 
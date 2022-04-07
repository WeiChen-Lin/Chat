# Redis

* 有在線上的用戶，用戶資料要有
    * uuid
    * username
    * user introduction
    
* 用戶各自好友的狀態，好友資料須包含
    * uuid
    * username
    * isOnline?
    * 最後上線時間
    * user introduction
    * Last message

`原先想使用 Redis中的 Lists型態來存，但是這個資料型態似乎很像 Stack的形式，只能底端或頂端移除或增加`

### 改用 Hash的方式來存資料
* 有在線上的用戶

    1. 增加有在線上的用戶資料
    
        `HSET AllOnlineUsers { uuid } { userdata }`
    2. 取得所有在線上的用戶數量
        
        `HGETALL AllOnlineUsers`

* 用戶各自的好友清單

    1. 該好友上線後，在 User內寫下狀態，離線更新離線時間
    
        `HSET User { uuid } { userdata }`
        
# 待完成

- [ ] 以 Redis Pub/Sub完成聊天功能
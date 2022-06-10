import FreindList from 'Components/friendlist/friendlist';
import MiddleChat from 'Components/middlechat/middlechat';
import Rightbar from 'Components/rightbar/rightbar';
import Profile from 'Components/profile/profile';
import { useEffect, useState } from 'react';
import { getAllOnlineUser } from 'Fetchers/users/getAllUsers';
import { getAllNotification } from 'Fetchers/notification/getNotification';
import { getRealtimeData } from 'Websockets/getRealtimeData';
import { getUsersFromObject } from 'Components/container_utils';

export default function Container() {
  const [friendIsLoading, setFriendIsLoading] = useState(true);
  const [membersIsLoading, setMembersIsLoading] = useState(true);
  const [onlineMember, setOnlineMember] = useState([]);
  const [notification, setNotification] = useState([]);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    async function getInfos() {
      const userinfos = await getAllOnlineUser();
      setMembersIsLoading(false);
      setFriendIsLoading(false);
      setOnlineMember(getUsersFromObject(userinfos.onlineUsers));
      setFriends(userinfos.friends);

      const notifications = await getAllNotification();
      setNotification(notifications);
    }

    /* 一進來取得所有上線的用戶及取得所有通知 */
    getInfos();

    /* 即時更新用戶的上下線及接收通知 */
    getRealtimeData(setOnlineMember);
  }, []);

  return (
    <div className="relative">
      <div className="absolute left-0 pt-[10%]">
        <Profile />
      </div>
      <div className="container mx-auto h-screen">
        <div className="min-w-full border-x rounded lg:grid lg:grid-cols-4 border-y-0 z-0">
          <FreindList friendIsLoading={friendIsLoading} friends={friends} />
          <MiddleChat />
          <Rightbar
            membersIsLoading={membersIsLoading}
            onlineMember={onlineMember}
            notification={notification}
          />
        </div>
      </div>
    </div>
  );
}

import FreindList from 'Components/friendlist/friendlist';
import MiddleChat from 'Components/middlechat/middlechat';
import Rightbar from 'Components/rightbar/rightbar';
import Profile from 'Components/profile/profile';
import { useEffect, useState } from 'react';
import { getAllOnlineUser } from 'Fetchers/users/getAllUsers';
import { getAllNotification } from 'Fetchers/notification/getNotification';
import { getRealtimeUser } from 'Websockets/getRealtime';
import { getRealtimeNotification } from 'Websockets/getRealtime';
import { getUsersFromObject } from 'Components/container_utils';

export default function Container() {
  // const [friendIsLoading, setFriendIsLoading] = useState(true);
  const [membersIsLoading, setMembersIsLoading] = useState(true);
  const [onlineMember, setOnlineMember] = useState([]);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    async function getInfos() {
      const users = await getAllOnlineUser();
      setMembersIsLoading(false);
      setOnlineMember(getUsersFromObject(users));

      const notifications = await getAllNotification();
      setNotification(notifications);
    }

    /* 一進來取得所有上線的用戶及取得所有通知 */
    getInfos();

    /* 即時更新用戶的上下線 */
    getRealtimeUser(setOnlineMember);

    /* 即時更新用戶的通知 */
    getRealtimeNotification();
  }, []);

  return (
    <div>
      <div className="absolute left-0 pt-[10%]">
        <Profile />
      </div>
      <div className="container mx-auto h-screen">
        <div className="min-w-full border-x rounded lg:grid lg:grid-cols-4 border-y-0 z-0">
          <FreindList />
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

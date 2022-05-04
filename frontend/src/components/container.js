import FreindList from 'Components/friendlist/friendlist';
import MiddleChat from 'Components/middlechat/middlechat';
import Rightbar from 'Components/rightbar/rightbar';
import Profile from 'Components/profile/profile';
import { useEffect, useState } from 'react';
import { firstloading } from 'Websockets/firstload';
import { getAllOnlineUser } from 'Fetchers/users/getAllUsers';
import { getRealtimeUser } from 'Websockets/getRealtime';
import { getUsersFromObject } from 'Components/container_utils';

export default function Container() {
  const [friendIsLoading, setFriendIsLoading] = useState(true);
  const [membersIsLoading, setMembersIsLoading] = useState(true);
  const [onlineMember, setOnlineMember] = useState([]);

  useEffect(() => {
    async function getOnlineUser() {
      const users = await getAllOnlineUser();
      setMembersIsLoading(false);
      setOnlineMember(getUsersFromObject(users));
      return true;
    }
    /* 一進來取得所有上線的用戶 */
    getOnlineUser();

    /* 即時更新用戶的上下線 */
    getRealtimeUser(setOnlineMember);

    /* websocket 用戶上線 */
    firstloading();
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
          <Rightbar membersIsLoading={membersIsLoading} onlineMember={onlineMember} />
        </div>
      </div>
    </div>
  );
}

import MemberUnit from 'Components/rightbar/members/member_unit';
import { useEffect, useState } from 'react';
import { getAllOnlineUser } from 'Fetchers/users/getAllUsers';
import { getRealtimeUser } from 'Websockets/getRealtime';

const getUsersFromObject = (obj) => {
  const users = [];
  Object.entries(obj).forEach(([key, value]) => {
    const userinfo = JSON.parse(value);
    users.push({
      uuid: key,
      username: userinfo.username,
      imageurl: userinfo.imageurl,
      introduction: userinfo.introduction,
    });
  });
  return users;
};

export default function Members(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUser, setOnlineUser] = useState([]);
  const { barStatus } = props;
  useEffect(() => {
    async function getOnlineUser() {
      const users = await getAllOnlineUser();
      setIsLoading(false);
      setOnlineUser(getUsersFromObject(users));
      return true;
    }
    getOnlineUser();
    getRealtimeUser(setOnlineUser);
  }, []);

  return (
    <ul className={`overflow-y-auto h-full ${barStatus === 'users' ? '' : 'hidden'}`}>
      {isLoading ? (
        <OnlineUserLoading />
      ) : (
        onlineUser.map((ele) => {
          return (
            <MemberUnit
              key={ele.uuid}
              username={ele.username}
              imageurl={ele.imageurl}
              introduction={ele.introduction}
            />
          );
        })
      )}
    </ul>
  );
}

const OnlineUserLoading = () => {
  return (
    <div className="bg-white rounded-md px-4">
      <div className="mt-8 h-32 w-full space-y-3">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mr-2"></div>
          <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

import MemberUnit from 'Components/members/member_unit';
import { useEffect, useState } from 'react';
import { getAllOnlineUser } from 'Fetchers/users/getAllUsers';

const getUsersFromObject = (obj) => {
  const users = [];
  Object.entries(obj).forEach(([key, value]) => {
    const userinfo = JSON.parse(value);
    users.push(
      <MemberUnit
        key={key}
        username={userinfo.username}
        imageurl={userinfo.imageurl}
        introduction={userinfo.introduction}
      />
    );
  });
  return users;
};

export default function Members() {
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUser, setOnlineUser] = useState([]);
  useEffect(() => {
    async function getOnlineUser() {
      const users = await getAllOnlineUser();
      console.log(users);
      setIsLoading(false);
      setOnlineUser(getUsersFromObject(users));
      return true;
    }
    getOnlineUser();
  }, []);
  return (
    <div className="border-gray-300 lg:col-span-1 lg:block h-screen">
      <div className="w-full flex flex-col h-full justify-between">
        <div className="bg-orange-200">
          <h2 className="text-center mx-2 my-2 text-lg text-gray-600 ">Who's Online</h2>
        </div>
        <ul className="overflow-y-auto h-full">{isLoading ? <OnlineUserLoading /> : onlineUser}</ul>
      </div>
    </div>
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

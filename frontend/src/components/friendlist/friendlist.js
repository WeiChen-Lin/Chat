import Friend from 'Components/friendlist/friend';
import SearchInput from './upperinput';

export default function Friendlist(props) {
  const { friendIsLoading, friends } = props;
  const friend_list = friends.map((x) => {
    return (
      <Friend
        key={x.user_uuid_to}
        imageurl={x.imageurl}
        name={x.username}
        last_min={x.last_min}
        last_msg={x.last_msg}
      />
    );
  });
  return (
    <div className="border-r border-gray-300 lg:col-span-1">
      <SearchInput />
      <ul className="overflow-auto h-[32rem]">
        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
        {friendIsLoading ? <FriendsLoading /> : friend_list}
      </ul>
    </div>
  );
}

const FriendsLoading = () => {
  return (
    <div className="bg-white rounded-md px-4">
      <div className="mt-8 h-32 w-full space-y-3">
        <div className="flex ">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mr-2"></div>
          <div className="flex flex-col">
            <div className="w-20 h-4 bg-gray-200 rounded-full animate-pulse my-1"></div>
            <div className="w-20 h-4 bg-gray-200 rounded-full animate-pulse my-1"></div>
          </div>
          <div className="w-20 h-4 bg-gray-200 rounded-full animate-pulse my-1 ml-16"></div>
        </div>
      </div>
    </div>
  );
};

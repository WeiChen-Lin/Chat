import Friend from 'Components/friendlist/friend';
import SearchInput from './upperinput';

const friend_list = [
  {
    image: 'https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg',
    name: 'Jhon Don',
    last_min: '25 minutes',
    last_msg: 'bye',
    userID: 'user1',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png',
    name: 'Sam',
    last_min: '50 minutes',
    last_msg: 'Good night',
    userID: 'user2',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg',
    name: 'Emma',
    last_min: '6 hour',
    last_msg: 'Good Morning',
    userID: 'user3',
  },
];

export default function Friendlist(props) {
  const { isLoading } = props;
  const friends = friend_list.map((x) => {
    return (
      <Friend
        image={x.image}
        name={x.name}
        last_min={x.last_min}
        last_msg={x.last_msg}
        key={x.userID}
      />
    );
  });
  return (
    <div className="border-r border-gray-300 lg:col-span-1">
      <SearchInput />
      <ul className="overflow-auto h-[32rem]">
        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
        {isLoading ? <FriendsLoading /> : <FriendsLoading />}
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

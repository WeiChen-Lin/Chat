import MemberUnit from 'Components/members/member_unit';

const memberlist = [
  {
    userID: '123',
    userName: 'Jhon Don',
    introduction:
      'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello',
  },
];
export default function Members(props) {
  const { isLoading } = props;
  const onlineUserList = memberlist.map((ele) => {
    return <MemberUnit name={ele.userName} introduction={ele.introduction} key={ele.userID} />;
  });
  return (
    <div className="border-gray-300 lg:col-span-1 lg:block h-screen">
      <div className="w-full flex flex-col h-full justify-between">
        <div className="bg-orange-200">
          <h2 className="text-center mx-2 my-2 text-lg text-gray-600 ">Who's Online</h2>
        </div>
        <ul className="overflow-y-auto h-full">
          {isLoading ? <OnlineUserLoading /> : <OnlineUserLoading />}
        </ul>
      </div>
    </div>
  );
}

const OnlineUserLoading = () => {
  return (
    <div class="bg-white rounded-md px-4">
      <div class="mt-8 h-32 w-full space-y-3">
        <div className="flex items-center">
          <div class="w-12 h-12 bg-gray-200 rounded-full animate-pulse mr-2"></div>
          <div class="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div class="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
        <div class="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

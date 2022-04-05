import MemberUnit from 'Components/members/member_unit';

const memberlist = [
  {
    userID: '123',
    userName: 'Jhon Don',
    introduction:
      'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello',
  },
];
export default function Members() {
  return (
    <div className="border-gray-300 lg:col-span-1 lg:block h-screen">
      <div className="w-full flex flex-col h-full justify-between">
        <div className="bg-orange-200">
          <h2 className="text-center mx-2 my-2 text-lg text-gray-600 ">Who's Online</h2>
        </div>
        <ul className="overflow-y-auto h-full">
          {memberlist.map((ele) => {
            return <MemberUnit name={ele.name} introduction={ele.introduction} key={ele.userID} />;
          })}
        </ul>
      </div>
    </div>
  );
}

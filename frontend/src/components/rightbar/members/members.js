import MemberUnit from 'Components/rightbar/members/member_unit';

export default function Members(props) {
  const { barStatus, membersIsLoading, onlineMember } = props;

  return (
    <ul className={`overflow-y-auto h-full ${barStatus === 'users' ? '' : 'hidden'}`}>
      {membersIsLoading ? (
        <OnlineUserLoading />
      ) : (
        onlineMember.map((ele) => {
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

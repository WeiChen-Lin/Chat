import { useState } from 'react';
import { sendFriendIntive } from 'Fetchers/notification/getNotification';

const activeButton = 'hover:scale-105 active:scale-100 active:shadow-lg duration-100';

const InviteStatusEnum = Object.freeze({
  Default: 0,
  Inviting: 1,
  Reject: 2,
  Loding: 3,
});

export default function MemberUnit(props) {
  const { uuid, username, imageurl, introduction, inviteStatus } = props;
  const [isHover, setIsHover] = useState(false);
  const [isInvite, setIsInvite] = useState(inviteStatus);
  const common_css = `w-full flex transition duration-800 ease-in-out`;
  console.log(inviteStatus);

  const chooseStatus = (status) => {
    if (status === InviteStatusEnum.Default) {
      return (
        <DefaultIcon
          _sendInvite={() => {
            _sendInvite(uuid);
          }}
        />
      );
    } else if (status === InviteStatusEnum.Inviting) {
      return <ReplyIcon />;
    } else if (status === InviteStatusEnum.Reject) {
      return <WaitingIcon />;
    } else if (status === InviteStatusEnum.Loding) {
      return <LoadingIcon />;
    }
  };

  const _sendInvite = async (friends_uuid) => {
    setIsInvite(InviteStatusEnum.Loding);
    const status = await sendFriendIntive(friends_uuid);
    console.log(status);
    if (status) {
      setIsInvite(InviteStatusEnum.Reject);
    }
  };

  return (
    <li
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <a
        className={`flex-col px-3 py-2 text-sm border-b border-gray-300 focus:outline-none ${common_css} ${
          isHover ? 'bg-stone-100' : ''
        }`}
      >
        <div className="flex items-center">
          {imageurl ? (
            <img
              className="z-20 object-cover w-10 h-10 rounded-full"
              src={imageurl}
              alt="username"
            />
          ) : (
            <div className="z-20 object-cover w-10 h-10 rounded-full bg-slate-300"></div>
          )}
          <div className="z-20 block ml-2 text-base font-semibold text-gray-600">{username}</div>
        </div>
        <div className="ml-10 px-2 w-4/5 break-words">{introduction}</div>
      </a>
      <div className="absolute top-0 left-0 w-full">
        <div
          className={`bg-slate-200 h-10 my-2 justify-end bg-gradient-to-r from-white to-gray ${
            isHover ? 'translate-x-0' : 'translate-x-full'
          } ${common_css}`}
        >
          {chooseStatus(isInvite)}
        </div>
      </div>
    </li>
  );
}

const WaitingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 my-2 mr-2 cursor-not-allowed"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const DefaultIcon = (props) => {
  const { _sendInvite } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 my-2 mr-2 ${activeButton}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      onClick={_sendInvite}
    >
      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
    </svg>
  );
};

const ReplyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 my-2 mr-2 ${activeButton}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
      />
    </svg>
  );
};

const LoadingIcon = () => {
  return (
    <svg
      role="status"
      className="h-6 w-6 my-2 mr-2 animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
};

import { getNotificationTime } from 'Components/rightbar/notification/noti_utils';
import { sendFriendResponse } from 'Fetchers/notification/getNotification';

import { useState } from 'react';

const StatusEnum = Object.freeze({ ACCEPT: 1, REJECT: 2 });

function ImgBackground() {
  return (
    <div className="w-full h-8 rounded-full bg-gradient-to-tr from-cyan-300 to-blue-400"></div>
  );
}

const Friend_Inviting = (props) => {
  const { user_uuid_from, username, imageUrl, time, status } = props;
  const [inviteStatus, setInviteStatus] = useState(status);

  const send_response = async (status) => {
    const response = await sendFriendResponse(user_uuid_from, status);
    setInviteStatus(status);
  };

  return (
    <div className="w-full p-3 mb-1 bg-white rounded cursor-pointer hover:bg-gray-100 flex flex-col">
      <div className="flex flex-wrap">
        <div className="focus:outline-none w-8 rounded-full items-center justify-center">
          {imageUrl ? (
            <img className="w-full h-8 rounded-full object-cover object-center" src={imageUrl} />
          ) : (
            <ImgBackground />
          )}
        </div>
        <div className="pl-3 w-[85%]">
          <p className="focus:outline-none text-base">
            <span className="text-indigo-700 font-medium">{username}</span> send a friend request to
            you
          </p>
          <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
            {getNotificationTime(time)}
          </p>
        </div>
      </div>
      <div className="w-full">
        {inviteStatus === 0 ? (
          <Friend_Buts send_response={send_response} />
        ) : (
          <Friend_Reply inviteStatus={inviteStatus} />
        )}
      </div>
    </div>
  );
};

const Friend_Buts = (props) => {
  const { send_response } = props;
  return (
    <div className="flex pl-12 pt-2">
      <a
        className="text-center inline-block h-8 px-4 mr-4 leading-8 font-medium text-white transition bg-blue-400 rounded hover:scale-110 hover:shadow-xl active:bg-blue-500 focus:outline-none focus:ring"
        onClick={() => {
          send_response(StatusEnum.ACCEPT);
        }}
      >
        Confirm
      </a>
      <a className="inline-block h-8 px-4 leading-8 font-medium text-black-400 transition border border-current rounded hover:scale-110 hover:shadow-xl active:text-indigo-500 focus:outline-none focus:ring">
        Delete
      </a>
    </div>
  );
};

const Friend_Reply = (props) => {
  const { inviteStatus } = props;
  const status_map = {
    1: 'Accept request',
    2: 'Reject request',
  };
  return <p className="h-8 px-11 text-gray-400 pt-2">{status_map[inviteStatus]}</p>;
};

export { Friend_Inviting };

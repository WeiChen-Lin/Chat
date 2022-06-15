import { useState, useRef, useEffect } from 'react';
import { sendFriendIntive } from 'Fetchers/notification/getNotification';
import {
  DefaultIntro,
  LoadingIcon,
  ReplyIcon,
  DefaultIcon,
  WaitingIcon,
  SuccessIcon,
} from './utils';

const Member_details = (props) => {
  const {
    parentHeight,
    isHover,
    introduction,
    inviteStatus,
    setInviteStatus,
    username,
    imageurl,
    uuid,
  } = props;
  const [locateHeight, setLocateHeight] = useState(0);
  const targetRef = useRef();
  const inviteStatusEnum = Object.freeze({
    0: <WaitingIcon />,
    1: <SuccessIcon />,
    2: <LoadingIcon />,
    3: (
      <DefaultIcon
        clickSendInvite={() => {
          clickSendInvite(uuid, 0);
        }}
      />
    ),
    4: (
      <ReplyIcon
        clickSendInvite={() => {
          clickSendInvite(uuid, 1);
        }}
      />
    ),
  });

  const clickSendInvite = async (uuid, final_status) => {
    setInviteStatus(2);
    const response = await sendFriendIntive(uuid);
    if (response) {
      setInviteStatus(final_status);
    }
  };

  const getCurrentHeight = (targetRef) => {
    return targetRef.current ? targetRef.current.offsetHeight : 0;
  };
  useEffect(() => {
    setFinalPosition();
  }, [parentHeight]);

  const setFinalPosition = () => {
    const CurrentHeight = getCurrentHeight(targetRef);

    const splitSite = (CurrentHeight - 50) / 2;

    if (splitSite > parentHeight) {
      setLocateHeight(-50);
    } else {
      setLocateHeight(-splitSite);
    }
  };

  return (
    <div
      className={`absolute w-96 -left-96 pr-2 ${isHover ? 'visible' : 'invisible'}`}
      style={{ top: locateHeight }}
      ref={targetRef}
    >
      <div className="flex bg-slate-100 rounded-xl p-2">
        <div className="flex flex-col w-1/5 justify-between">
          {imageurl ? (
            <img className="object-cover w-14 h-14 rounded-full" src={imageurl} alt="username" />
          ) : (
            <div className="object-cover w-14 h-14 rounded-full bg-slate-300"></div>
          )}
          {inviteStatusEnum[inviteStatus]}
        </div>
        <div className="ml-4 pt-1 w-4/5 flex flex-col">
          <div className="font-medium text-lg">{username}</div>
          <div className="mt-2 text-clip pr-3" style={{ minHeight: 70 }}>
            <div className="break-words">{introduction ?? <DefaultIntro />}</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export { Member_details };

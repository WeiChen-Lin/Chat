import { useState, useRef, useEffect } from 'react';
import { Member_details } from 'Components/rightbar/members/member_detail';
import { getDetailInfo } from 'Fetchers/detail/getDetail';

const MemberUnit = (props) => {
  const { uuid, username, imageurl } = props;
  const [isHover, setIsHover] = useState(false);
  const [details, setDetails] = useState({
    introduction: '',
    inviteStatus: 0,
  });
  const [parentHeight, setParentHeight] = useState(0);
  const common_css = `w-full flex transition duration-800 ease-in-out`;
  const targetRef = useRef();

  useEffect(() => {
    setParentHeight(getOffsetTop(targetRef));
  }, []);

  const getOffsetTop = (targetRef) => {
    return targetRef.current.offsetTop;
  };

  const HoverFetchDate = async () => {
    const info = await getDetailInfo(uuid);
    setDetails(info);
    setIsHover(true);
  };

  return (
    <li
      className="relative cursor-pointer"
      onMouseEnter={() => HoverFetchDate()}
      onMouseLeave={() => setIsHover(false)}
      ref={targetRef}
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
          <div className="z-20 block ml-5 text-base font-semibold text-gray-600">{username}</div>
        </div>
      </a>
      <Member_details
        parentHeight={parentHeight}
        isHover={isHover}
        infos={details}
        username={username}
        imageurl={imageurl}
      />
    </li>
  );
};

export { MemberUnit };

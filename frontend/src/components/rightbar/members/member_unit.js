import { useState } from 'react';

const activeButton = 'hover:scale-105 active:scale-100 active:shadow-lg duration-100';

export default function MemberUnit(props) {
  const { username, imageurl, introduction } = props;
  const [isHover, setIsHover] = useState(false);
  const common_css = `w-full flex transition duration-800 ease-in-out`;

  return (
    <li
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <a
        className={`absolute flex-col px-3 py-2 text-sm border-b border-gray-300 focus:outline-none ${common_css} ${
          isHover ? 'bg-stone-100' : ''
        }`}
      >
        <div className="flex items-center">
          <img className="z-20 object-cover w-10 h-10 rounded-full" src={imageurl} alt="username" />
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 my-1 mr-1 ${activeButton}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
        </div>
      </div>
    </li>
  );
}

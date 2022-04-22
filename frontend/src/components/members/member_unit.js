export default function MemberUnit(props) {
  const { username, imageurl, introduction } = props;

  return (
    <li className="relative cursor-pointer">
      <a className="z-10 w-full absolute top-0 left-0 flex flex-col px-3 py-2 text-sm transition duration-300 ease-in-out border-b border-gray-300 hover:bg-gray-100 focus:outline-none">
        <div className="flex items-center">
          <img className="object-cover w-10 h-10 rounded-full" src={imageurl} alt="username" />
          <div className="block ml-2 text-base font-semibold text-gray-600">{username}</div>
        </div>
        <div className="ml-10 px-2 w-4/5 break-words">{introduction}</div>
      </a>
      <div className="flex z-20 w-full absolute top-0 left-0 bg-slate-200 h-10 my-2 transition duration-1000 ease-in-out translate-x-0 justify-end bg-gradient-to-r from-white	to-gray">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 my-1 mr-1 hover:opacity-90"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      </div>
    </li>
  );
}

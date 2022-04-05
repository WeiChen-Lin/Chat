export default function MemberUnit(props) {
  const { name, introduction } = props;

  return (
    <li>
      <a className="flex flex-col px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
        <div className="flex items-center">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
            alt="username"
          />
          <div className="block ml-2 text-base font-semibold text-gray-600">{name}</div>
        </div>
        <div className="ml-10 px-2 w-4/5 break-words">{introduction}</div>
      </a>
    </li>
  );
}

export default function NotificationUnit() {
  return (
    <div className="w-full flex-wrap p-3 mb-1 bg-white flex rounded cursor-pointer hover:bg-gray-100">
      <div className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
        <img
          className="w-full h-8 rounded-full object-cover object-center"
          src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          alt="avatar"
        />
      </div>
      <div className="pl-3">
        <p className="focus:outline-none text-sm leading-none">
          <span className="text-indigo-700">James Doe</span> Send a friend request to you
        </p>
        <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
      </div>
      <div className="w-full">
        <div className="flex pl-12 pt-2">
          <a class="text-center inline-block h-8 px-4 mr-4 leading-8 font-medium text-white transition bg-blue-400 rounded hover:scale-110 hover:shadow-xl active:bg-blue-500 focus:outline-none focus:ring">
            Confirm
          </a>
          <a class="inline-block h-8 px-4 leading-8 font-medium text-black-400 transition border border-current rounded hover:scale-110 hover:shadow-xl active:text-indigo-500 focus:outline-none focus:ring">
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Logout() {
  const activeButton =
    'hover:bg-orange-200 hover:scale-105 hover:bg-red active:scale-100 active:shadow-lg duration-100';

  return (
    <a
      className={`m-auto w-1/2 relative inline-flex items-center px-8 py-3 overflow-hidden text-gray-600 border border-current rounded group active:text-gray-500 focus:outline-none cursor-pointer ${activeButton}`}
    >
      <span className="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </span>

      <span className="text-sm font-medium transition-all group-hover:ml-4">Log Out</span>
    </a>
  );
}

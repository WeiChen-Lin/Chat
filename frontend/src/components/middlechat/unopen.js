export default function Unopen() {
  return (
    <div className="flex flex-col w-full h-full justify-center border-x">
      <div className="mx-auto w-16 h-16 opacity-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>{' '}
      </div>
      <h1 className="text-center text-4xl text-gray-500">Let's start chat</h1>
    </div>
  );
}

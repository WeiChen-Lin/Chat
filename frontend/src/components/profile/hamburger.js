export default function Hamburger(props) {
  const genericHamburgerLine = `flex h-1 w-6 my-1 rounded-full bg-black transition duration-500 ease-in-out`;
  const { isOpen, setIsOpen } = props;
  return (
    <button
      className="flex flex-col h-12 w-12 focus:outline-none bg-gray-400 rounded-r-lg justify-center items-center group -ml-2 z-20"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? 'opacity-50 group-hover:opacity-100'
            : 'rotate-45 translate-y-3 opacity-50 group-hover:opacity-100'
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? 'opacity-50 group-hover:opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? 'opacity-50 group-hover:opacity-100'
            : '-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100'
        }`}
      />
    </button>
  );
}

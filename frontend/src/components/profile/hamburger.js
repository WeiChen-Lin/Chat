export default function Hamburger(props) {
  const genericHamburgerLine = `flex h-1 w-6 my-1 rounded-full bg-black transition duration-500 ease-in-out`;
  const { isOpen, setIsOpen, setIsEdit } = props;
  return (
    <button
      className="flex flex-col h-12 w-12 focus:outline-none bg-gray-400 rounded-r-lg justify-center items-center group -ml-2 z-20"
      onClick={() => {
        setIsOpen(!isOpen);
        if (isOpen) setIsEdit(false);
      }}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? 'rotate-45 translate-y-3 opacity-50 group-hover:opacity-100'
            : 'opacity-50 group-hover:opacity-100'
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? '-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100'
            : 'opacity-50 group-hover:opacity-100'
        }`}
      />
    </button>
  );
}

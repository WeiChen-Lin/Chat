export default function Background(props) {
  const { isOpen, setIsOpen } = props;

  return (
    <div
      className={`absolute top-0 left-0 w-screen h-screen bg-zinc-400 z-10 opacity-50 ${
        isOpen ? 'hidden' : 'block'
      }`}
      onClick={() => setIsOpen(!isOpen)}
    ></div>
  );
}

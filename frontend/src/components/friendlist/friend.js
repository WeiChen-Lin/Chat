export default function Friend(props) {
  const { imageurl, name, last_min, last_msg } = props;

  return (
    <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
      {imageurl ? (
        <img className="object-cover w-10 h-10 rounded-full" src={imageurl} />
      ) : (
        <div className="object-cover w-10 h-10 rounded-full bg-slate-300"></div>
      )}
      <div className="w-full">
        <div className="flex justify-between mt-1">
          <span className="block ml-2 font-semibold text-gray-600">{name}</span>
          <span className="block ml-2 text-sm text-gray-600">{last_min}</span>
        </div>
        <span className="block ml-2 mt-1 text-sm text-gray-600">{last_msg}</span>
      </div>
    </a>
  );
}

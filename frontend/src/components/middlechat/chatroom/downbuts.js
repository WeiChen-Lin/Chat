import React from "react";
import Input from "@material-tailwind/react/Input";

class DownButs extends React.Component {
  render() {
    return (
      <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <div className="block w-full py-2 pl-4 mx-3 rounded-full outline-none focus:text-gray-700">
          <Input
            className="w-5/6"
            type="text"
            color="lightBlue"
            size="regular"
            outline={false}
            placeholder="Send message..."
          />
        </div>
        <button type="submit">
          <svg
            class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    );
  }
}

export default DownButs;

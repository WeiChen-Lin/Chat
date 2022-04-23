import React from 'react';
import chat from 'Images/chat.svg';

export default function Unopen() {
  return (
    <div className="flex flex-col w-full h-full justify-center border-x">
      <div className="mx-auto w-16 h-16 opacity-40">
        <img src={chat} alt="startchat!" className="w-full h-full" />
      </div>
      <h1 className="text-center text-4xl text-gray-500">Let's start chat</h1>
    </div>
  );
}

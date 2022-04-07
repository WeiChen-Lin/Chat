import React from 'react';
import Unopen from 'Components/middlechat/unopen';
import Chatroom from 'Components/middlechat/chatroom';

export default function MiddleChat() {
  return (
    <div className="lg:col-span-2 lg:block h-screen">
      {/* <Chatroom /> */}
      <Unopen />
    </div>
  );
}

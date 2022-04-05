import React from 'react';
import Chatinfo from 'Components/middlechat/chatroom/chatinfo';
import Mymsg from 'Components/middlechat//chatroom/mymsg';
import Osmsg from 'Components/middlechat//chatroom/osmsg';
import DownButs from 'Components/middlechat//chatroom/downbuts';

const msgs = [
  {
    order: 1,
    osmsg: 'hi',
    time: '18:04',
  },
  {
    order: 2,
    mymsg: 'hello',
    time: '18:04',
  },
  {
    order: 3,
    osmsg: 'hi',
    time: '18:04',
  },
  {
    order: 4,
    mymsg: 'hello',
    time: '18:04',
  },
  {
    order: 5,
    osmsg: 'hi',
    time: '18:04',
  },
  {
    order: 6,
    mymsg: 'hello',
    time: '18:04',
  },
  {
    order: 7,
    osmsg: 'hi',
    time: '18:04',
  },
  {
    order: 8,
    mymsg: 'hello',
    time: '18:04',
  },
];

const chatinfo = {
  name: 'Emma',
  isOnline: false,
};

export default function Chatroom() {
  return (
    <div className="w-full flex flex-col h-full justify-between border-x">
      <Chatinfo name={chatinfo.name} isOnline={chatinfo.isOnline} />
      <div className="relative w-full p-6 overflow-y-auto h-full">
        <ul className="space-y-2">
          {msgs.map((ele) => {
            if (ele.osmsg) return <Osmsg key={ele.order} msg={ele.osmsg} time={ele.time} />;
            else return <Mymsg key={ele.order} msg={ele.mymsg} time={ele.time} />;
          })}
        </ul>
      </div>
      <DownButs />
    </div>
  );
}

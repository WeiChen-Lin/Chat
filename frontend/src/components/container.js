import FreindList from 'Components/friendlist/friendlist';
import MiddleChat from 'Components/middlechat/middlechat';
import Rightbar from 'Components/rightbar/rightbar';
import Profile from 'Components/profile/profile';
import { useEffect, useState } from 'react';
import { firstloading } from 'Websockets/firstload';

export default function Container() {
  useEffect(() => {
    firstloading();
  }, []);
  return (
    <div>
      <div className="absolute left-0 pt-[10%]">
        <Profile />
      </div>
      <div className="container mx-auto h-screen">
        <div className="min-w-full border-x rounded lg:grid lg:grid-cols-4 border-y-0 z-0">
          <FreindList />
          <MiddleChat />
          <Rightbar />
        </div>
      </div>
    </div>
  );
}

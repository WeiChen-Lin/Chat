import FreindList from 'Components/friendlist/friendlist';
import MiddleChat from 'Components/middlechat/middlechat';
import Members from 'Components/members/members';
import Profile from 'Components/profile/profile';
import React from 'react';

export default function Container() {
  return (
    <div>
      <div className="absolute left-0 pt-[10%]">
        <Profile />
      </div>
      <div className="container mx-auto h-screen">
        <div className="min-w-full border-x rounded lg:grid lg:grid-cols-4 border-y-0 z-0">
          <FreindList />
          <MiddleChat />
          <Members />
        </div>
      </div>
    </div>
  );
}

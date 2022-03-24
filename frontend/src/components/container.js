import FreindList from './friendlist/friendlist';
import MiddleChat from './middlechat/middlechat';
import Members from './members/members';
import Profile from './profile/profile';
import React from 'react';

export default function Container(props) {
  const { profile, setProfile } = props;
  return (
    <div>
      <div className="absolute left-0 pt-[10%]">
        <Profile profile={profile} setProfile={setProfile} />
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

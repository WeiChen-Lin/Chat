import { useState } from 'react';
import Hamburger from './hamburger';
import ProfileCard from './profilecard';
import Background from './background';
export default function Profile(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { profile, setProfile } = props;

  return (
    <div className="flex">
      <Background isOpen={isOpen} setIsOpen={setIsOpen} isEdit={isEdit} setIsEdit={setIsEdit} />
      <ProfileCard
        isOpen={isOpen}
        profile={profile}
        setProfile={setProfile}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} setIsEdit={setIsEdit} />
    </div>
  );
}

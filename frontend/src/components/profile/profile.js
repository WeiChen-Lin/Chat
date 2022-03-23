import { useState } from 'react';
import Hamburger from './hamburger';
import ProfileCard from './profilecard';
import Background from './background';
export default function Profile(props) {
  const [isOpen, setIsOpen] = useState(true);
  const { profile } = props;

  return (
    <div className="flex">
      <Background isOpen={isOpen} setIsOpen={setIsOpen} />
      <ProfileCard isOpen={isOpen} profile={profile} />
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

import { useState } from 'react';
import Hamburger from './hamburger';
import ProfileCard from './profilecard';
import Backgroud from './backgroud';
export default function Profile() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <Backgroud isOpen={isOpen} setIsOpen={setIsOpen} />
      <ProfileCard isOpen={isOpen} />
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

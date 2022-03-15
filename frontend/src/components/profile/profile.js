import { useState } from 'react';
import Hamburger from './hamburger';
import ProfileCard from './profilecard';
import Background from './background';
export default function Profile() {
  const [isOpen, setIsOpen] = useState(true);
  const [profile, setProfile] = useState({
    shot: 'https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg',
    name: 'Patterson johnson',
    introduction: `Full Stack maker & UI / UX Designe Full Stack maker & UI / UX Designer`,
    isEdit: false,
  });

  const handleEdit = () => {
    setProfile((prev) => ({ ...prev, isEdit: !profile.isEdit }));
  };

  return (
    <div className="flex">
      <Background isOpen={isOpen} setIsOpen={setIsOpen} />
      <ProfileCard isOpen={isOpen} profile={profile} handleEdit={handleEdit} />
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

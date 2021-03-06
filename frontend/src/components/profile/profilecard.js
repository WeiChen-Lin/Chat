import { useState, useEffect } from 'react';
import { getUserProfile } from 'Fetchers/profile/profile';
import { Introduction } from 'Components/profile/introduction';
const activeButton =
  'hover:scale-105 active:scale-100 active:shadow-lg transition duration-100 cursor-pointer';

export default function ProfileCard(props) {
  const { isOpen, isEdit, setIsEdit } = props;
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: '',
    introduction: '',
    imageurl: '',
  });
  useEffect(() => {
    const waitForProfile = async () => {
      const profile_info = await getUserProfile();
      if (profile_info) {
        setProfile({ ...profile_info });
        setLoading(false);
      } else {
        setLoading(true);
      }
    };
    waitForProfile();
  }, []);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-r-lg overflow-hidden z-30 transition-all duration-300 ${
        isOpen ? 'w-96' : 'w-0'
      }`}
    >
      {loading ? (
        <ProfileLoading />
      ) : (
        <div>
          {profile.imageurl ? (
            <img
              className="w-full h-56 object-cover object-center"
              src={profile.imageurl}
              alt="avatar"
            />
          ) : (
            <ImgBackground />
          )}
          <div className="py-4 px-6">
            <div className="flex">
              <h1 className="text-xl font-semibold text-gray-800 w-3/4">{profile.username}</h1>
              <label className={`w-6 h-6 mt-1 mr-4 ${activeButton}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input type="file" className="hidden" />
              </label>
              <div className={`w-6 h-6 mt-1 ${activeButton}`} onClick={handleEdit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>
            <Introduction
              introduction={profile.introduction}
              handleEdit={handleEdit}
              isEdit={isEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileLoading() {
  return (
    <div className="flex flex-col items-center opacity-75 w-full h-80 justify-center">
      <svg
        role="status"
        className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500 "
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <div className="pt-2">Loading...</div>
    </div>
  );
}

function ImgBackground() {
  return <div className="w-full h-56 bg-gradient-to-tr from-cyan-300 to-blue-400"></div>;
}

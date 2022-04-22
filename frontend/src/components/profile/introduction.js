import { useState, useEffect } from 'react';
import { EditIntroduction } from 'Fetchers/profile/profile';
const activeButton =
  'hover:scale-105 active:scale-100 active:shadow-lg transition duration-100 cursor-pointer';

function Introduction(props) {
  const { introduction, handleEdit, isEdit } = props;
  const [introState, setIntroState] = useState(introduction);
  const [previous, setPrevious] = useState(introduction);
  const handleEditIntroduction = (e) => {
    setIntroState(e.target.value);
  };

  useEffect(() => setIntroState(introduction), [introduction]);

  const EditChecker = async (status, value) => {
    if (status) {
      setPrevious(introState);
      await EditIntroduction(value);
    } else {
      setIntroState(previous);
    }
  };

  return (
    <div>
      {isEdit ? (
        <div className="flex flex-col">
          <textarea
            className="textarea textarea-bordered mt-2 p-2 text-base text-gray-700 w-80 row-span-5 resize-none border border-solid border-gray-300"
            placeholder="自我介紹"
            rows="4"
            cols="71"
            wrap="hard"
            defaultValue={introState}
            onChange={(e) => {
              handleEditIntroduction(e);
            }}
          ></textarea>
          <div className="w-full h-6 mt-2 flex flex-row justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 mt-1 mr-4 ${activeButton}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={(e) => {
                handleEdit();
                EditChecker(true, introState);
              }}
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 mt-1 mr-4 ${activeButton}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={(e) => {
                handleEdit();
                EditChecker(false, introState);
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      ) : (
        <p className="py-2 text-base text-gray-700 w-80 break-words">{introState}</p>
      )}
    </div>
  );
}

export { Introduction };

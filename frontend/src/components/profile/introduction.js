import { useState, useEffect } from 'react';
import checkImage from '../../img/check.png';
import cancelImage from '../../img/cancel.png';
import { EditIntroduction } from '../../fetchers/profile/profile';
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
          <div className="w-full h-7 mt-2 flex flex-row justify-start">
            <img
              className={`w-7 h-7 mt-1 mr-2 ${activeButton}`}
              src={checkImage}
              alt="check"
              onClick={(e) => {
                handleEdit();
                EditChecker(true, introState);
              }}
            ></img>
            <img
              className={`w-7 h-7 mt-1 ml-2 ${activeButton}`}
              src={cancelImage}
              alt="cancel"
              onClick={(e) => {
                handleEdit();
                EditChecker(false, introState);
              }}
            ></img>
          </div>
        </div>
      ) : (
        <p className="py-2 text-base text-gray-700 w-80 break-words">{introState}</p>
      )}
    </div>
  );
}

export { Introduction };

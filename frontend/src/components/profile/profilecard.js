import uploadImage from '../../img/uploadImage.png';
import editImage from '../../img/edit.png';
import checkImage from '../../img/check.png';
import cancelImage from '../../img/cancel.png';

const activeButton =
  'hover:scale-105 active:scale-100 active:shadow-lg transition duration-100 cursor-pointer';

export default function ProfileCard(props) {
  const { isOpen, handleEdit } = props;
  const { shot, name, introduction, isEdit } = props.profile;

  return (
    <div
      className={`bg-white shadow-lg rounded-r-lg overflow-hidden z-30 transition-all duration-300 ${
        isOpen ? 'max-w-0' : 'max-w-sm'
      }`}
    >
      <img className="w-full h-56 object-cover object-center" src={shot} alt="avatar" />
      <div className="py-4 px-6">
        <div className="flex">
          <h1 className="text-xl font-semibold text-gray-800 w-3/4">{name}</h1>
          <label className={`w-8 h-8 mr-4 ${activeButton}`}>
            <img src={uploadImage} alt="upload"></img>
            <input type="file" className="hidden" />
          </label>
          <div className={`w-8 h-8 ${activeButton}`} onClick={handleEdit}>
            <img src={editImage} alt="edit"></img>
          </div>
        </div>
        {isEdit ? (
          <EditIntroduction introduction={introduction} handleEdit={handleEdit} />
        ) : (
          <Introduction introduction={introduction} />
        )}
      </div>
    </div>
  );
}

function Introduction(props) {
  const { introduction } = props;
  return <p className="py-2 text-base text-gray-700 w-80">{introduction}</p>;
}

function EditIntroduction(props) {
  const { introduction, handleEdit } = props;

  return (
    <div className="flex flex-col">
      <textarea
        className="textarea textarea-bordered mt-2 p-2 text-base text-gray-700 w-80 row-span-5 resize-none border border-solid border-gray-300"
        placeholder="自我介紹"
        rows="4"
        cols="71"
        wrap="hard"
      >
        {introduction}
      </textarea>
      <div className="w-full h-7 mt-2 flex flex-row justify-start">
        <img className={`w-7 h-7 mt-1 mr-2 ${activeButton}`} src={checkImage} alt="check"></img>
        <img
          className={`w-7 h-7 mt-1 ml-2 ${activeButton}`}
          src={cancelImage}
          alt="cancel"
          onClick={handleEdit}
        ></img>
      </div>
    </div>
  );
}

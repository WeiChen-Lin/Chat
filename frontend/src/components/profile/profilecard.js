import uploadImage from '../../img/uploadImage.png';
import editImage from '../../img/edit.png';
export default function ProfileCard(props) {
  const { isOpen } = props;
  return (
    <div
      className={`bg-white shadow-lg rounded-r-lg overflow-hidden z-30 transition-all duration-300 ${
        isOpen ? 'max-w-0' : 'max-w-sm'
      }`}
    >
      <img
        className="w-full h-56 object-cover object-center"
        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
        alt="avatar"
      />
      <div className="py-4 px-6">
        <div className="flex">
          <h1 className="text-xl font-semibold text-gray-800 w-3/4">Patterson johnson</h1>
          <label className="w-8 h-8 hover:scale-105 active:scale-100 active:shadow-lg transition duration-100 cursor-pointer mr-4">
            <img className="" src={uploadImage}></img>
            <input type="file" class="hidden" />
          </label>
          <div className="w-8 h-8 hover:scale-105 active:scale-100 active:shadow-lg transition duration-100 cursor-pointer">
            <img className="" src={editImage}></img>
          </div>
        </div>

        <p className="py-2 text-base text-gray-700 w-80">
          Full Stack maker & UI / UX Designe Full Stack maker & UI / UX Designe Full Stack maker &
          UI / UX Designe
        </p>

        {/* <textarea
          class="textarea textarea-bordered p-2 text-base text-gray-700 w-80 row-span-5 resize-none border border-solid border-gray-300"
          placeholder="Bio"
          value="Full Stack maker & UI / UX Designe Full Stack maker & UI / UX Designe Full Stack maker &
          UI / UX Designe"
          rows="4"
        ></textarea> */}
      </div>
    </div>
  );
}

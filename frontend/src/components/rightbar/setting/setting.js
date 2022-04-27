import Logout from 'Components/rightbar/setting/logout';

export default function Settings(props) {
  const { barStatus } = props;

  return (
    <div
      className={`overflow-y-auto h-full flex flex-col ${barStatus === 'settings' ? '' : 'hidden'}`}
    >
      <Logout />
    </div>
  );
}

import NotificationUnit from 'Components/rightbar/notification/noti_unit';

export default function Notification(props) {
  const { barStatus } = props;

  return (
    <div
      className={`overflow-y-auto h-full flex flex-col ${
        barStatus === 'notification' ? '' : 'hidden'
      }`}
    >
      <NotificationUnit />
    </div>
  );
}

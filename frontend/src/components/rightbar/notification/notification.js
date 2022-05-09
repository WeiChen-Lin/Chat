import { Friend_Inviting } from 'Components/rightbar/notification/noti_unit';

const setEachNotification = (n) => {
  return (
    <Friend_Inviting
      key={n.user_uuid_from}
      username={n.username}
      imageUrl={n.imageUrl}
      time={n.time}
    />
  );
};

export default Notification = (props) => {
  const { barStatus, notification } = props;
  console.log(typeof notification);
  console.log(notification);
  return (
    <div
      className={`overflow-y-auto h-full flex flex-col ${
        barStatus === 'notification' ? '' : 'hidden'
      }`}
    >
      {notification.map((noti) => {
        return setEachNotification(noti);
      })}
    </div>
  );
};

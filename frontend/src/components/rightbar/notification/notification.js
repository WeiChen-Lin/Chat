import { Friend_Inviting } from 'Components/rightbar/notification/noti_unit';

const setEachNotification = (n) => {
  console.log(n);
  return (
    <Friend_Inviting
      key={n.user_uuid_from}
      username={n.username}
      imageUrl={n.imageUrl}
      time={n.time}
      status={n.status}
      user_uuid_from={n.user_uuid_from}
    />
  );
};

export default Notification = (props) => {
  const { barStatus, notification } = props;
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

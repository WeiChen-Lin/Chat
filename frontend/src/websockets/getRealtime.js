import { wsdomain, RealtimeUserRoute, RealtimeNotificationRoute } from 'Fetchers/urls';

const uniq = (a) => {
  var seen = {};
  return a.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
};

const getRealtimeUser = (setOnlineUser) => {
  const ws = new WebSocket(`${wsdomain}${RealtimeUserRoute}`);

  const token = localStorage.getItem('access-token');
  ws.onopen = () => {
    ws.send(`Bearer ${token}`);
  };

  ws.onclose = () => {
    console.log('connection close');
  };
  ws.onmessage = (msg) => {
    const info = JSON.parse(JSON.parse(msg.data));
    console.log(info)
    if (info.status === 'leave') {
      setOnlineUser((prev) => [...prev].filter((ele) => ele.uuid !== info.uuid));
    } else if (info.status === 'enter') {
      setOnlineUser((prev) =>
        uniq([
          ...prev,
          {
            uuid: info.uuid,
            username: info.username,
            imageurl: info.imageurl,
            introduction: info.introduction,
          },
        ])
      );
    }
  };
  return ws;
};

export { getRealtimeUser };

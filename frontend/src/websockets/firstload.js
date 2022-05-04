import { wsdomain, SetonlineRoute, ContainerRoute } from 'Fetchers/urls';

const firstloading = () => {
  const ws = new WebSocket(`${wsdomain}${SetonlineRoute}`);

  const token = localStorage.getItem('access-token');
  ws.onopen = () => {
    ws.send(`Bearer ${token}`);
  };

  ws.onclose = () => {
    console.log('connection close');
  };

  ws.onmessage = (e) => {
    const reveive_data = JSON.parse(e.data);
    if (reveive_data.type === 'ping') {
      console.log(e);
      ws.send({ type: 'pong' });
    } else {
      console.log('test');
    }
  };
  return ws;
};

export { firstloading };

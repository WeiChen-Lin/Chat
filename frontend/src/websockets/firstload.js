import { wsdomain, SetonlineRoute } from 'Fetchers/urls';

const firstloading = () => {
  const ws = new WebSocket(`${wsdomain}${SetonlineRoute}`);
  const token = localStorage.getItem('access-token');
  ws.onopen = () => {
    ws.send(`Bearer ${token}`);
  };

  ws.onclose = () => {
    console.log('connection close');
  };

  ws.onmessage = () => {
    ws.send(`Bearer ${token}`);
  };
  return ws;
};

export { firstloading };

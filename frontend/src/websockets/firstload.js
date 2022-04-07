import { wsdomain, SetonlineRoute, token } from 'Fetchers/urls';

const firstloading = () => {
  const ws = new WebSocket(`${wsdomain}${SetonlineRoute}`);
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

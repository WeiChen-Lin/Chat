import { AuthRoute, domain } from '../urls';

const getChatCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const getUserByCookie = async () => {
  const rememberChecker = getChatCookie('chat-remember') === 'True';
  console.log(rememberChecker);
  if (!rememberChecker) return;
  const result = await fetch(domain + AuthRoute, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access-token')}`,
    },
  });
  if (result.status === 200) return true;
  return false;
};

export { getUserByCookie };

import { AuthRoute, domain } from '../urls';

const getChatCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const getUserByCookie = async () => {
  const rememberChecker = getChatCookie('chat-remember') === 'True';
  if (!rememberChecker) return { status: false };
  try {
    const result = await fetch(domain + AuthRoute, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    });
    if (result.status === 200) {
      const response = await result.json();
      return { status: true, userinfo: response.userinfo };
    }
    return { status: false };
  } catch {
    return { status: false };
  }
};

export { getUserByCookie };

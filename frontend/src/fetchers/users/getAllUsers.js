import { domain, UserRoute } from 'Fetchers/urls';

const getAllOnlineUser = async () => {
  const token = localStorage.getItem('access-token');
  if (!token) return false;
  try {
    const result = await fetch(`${domain}${UserRoute}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    if (result.status === 200) {
      const profile = await result.json();
      console.log(profile);
      return profile;
    }
    return false;
  } catch {
    return false;
  }
};

export { getAllOnlineUser };

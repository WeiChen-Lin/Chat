import { domain, UserRoute } from 'Fetchers/urls';

const getAllNotification = async () => {
  const token = localStorage.getItem('access-token');
  if (!token) return false;

  try {
    const result = await fetch(`${domain}${UserRoute}/notification`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    if (result.status === 200) {
      const profile = await result.text();
      console.log(profile);
      return profile;
    }
    return false;
  } catch {
    return false;
  }
};

const sendFriendIntive = async (friend_uuid) => {
  const token = localStorage.getItem('access-token');
  if (!token) return false;
  console.log(friend_uuid);
  try {
    const result = await fetch(`${domain}${UserRoute}/notification`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        uuid: friend_uuid,
      }),
      method: 'POST',
    });
    if (result.status === 200) {
      const profile = await result.text();
      console.log(profile);
      return profile;
    }
    return false;
  } catch {
    return false;
  }
};

export { sendFriendIntive, getAllNotification };

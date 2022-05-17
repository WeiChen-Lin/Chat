import { domain, NtyRoute } from 'Fetchers/urls';

const getAllNotification = async () => {
  const token = localStorage.getItem('access-token');
  if (!token) return false;

  try {
    const result = await fetch(`${domain}${NtyRoute}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    if (result.status === 200) {
      const profile = await result.json();
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
  try {
    const result = await fetch(`${domain}${NtyRoute}/invite`, {
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
      const profile = await result.json();
      console.log(profile);
      return profile;
    }
    return false;
  } catch {
    return false;
  }
};

const sendFriendResponse = async (friend_uuid, status) => {
  const token = localStorage.getItem('access-token');
  if (!token) return false;
  try {
    const result = await fetch(`${domain}${NtyRoute}/response`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user_uuid_from: friend_uuid,
        status: status,
      }),
      method: 'POST',
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

export { sendFriendIntive, getAllNotification, sendFriendResponse };

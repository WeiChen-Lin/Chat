import { domain, FriendRoute, token } from 'Fetchers/urls';

const getUserProfile = async () => {
  if (!token) return false;
  try {
    const result = await fetch(`${domain}${FriendRoute}`, {
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

export { EditIntroduction, getUserProfile };

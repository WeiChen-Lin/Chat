import { domain, ProfileRoute } from 'Fetchers/urls';

const EditIntroduction = async (introduction) => {
  const token = localStorage.getItem('access-token');
  if (!token) return false;
  try {
    const result = await fetch(`${domain}${ProfileRoute}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        introduction: introduction,
      }),
    });
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

const getUserProfile = async () => {
  const token = localStorage.getItem('access-token');
  if (!token) return false;
  try {
    const result = await fetch(`${domain}${ProfileRoute}`, {
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

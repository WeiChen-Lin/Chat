import { domain, DetailRoute } from 'Fetchers/urls';

const getDetailInfo = async (uuid) => {
  const token = localStorage.getItem('access-token');
  if (!token) return false;
  try {
    const result = await fetch(`${domain}${DetailRoute}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        uuid: uuid,
      }),
      method: 'POST',
    });
    if (result.status === 200) {
      const details = await result.json();
      return details;
    }
    return false;
  } catch {
    return false;
  }
};

export { getDetailInfo };

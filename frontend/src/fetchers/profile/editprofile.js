import { domain, ProfileRoute, token } from '../urls';

const EditIntroduction = async (introduction) => {
  if (!token) return false;
  try {
    const result = await fetch(domain + ProfileRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        introduction: introduction,
      }),
    });
    console.log(result);
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

import useAlert from './useAlert';

/* Login 相關 api */

const domain = 'http://localhost:8000';
const AuthRoute = '/api/login';

/* Log In, Log Out 用*/
const useLogin = () => {
  const { loading, severity, message, setAlertLoadingStart, setAlertLoadingStop, setAlertError } =
    useAlert();

  const login = async (userinfo) => {
    setAlertLoadingStart();

    if (checkUserinfo(userinfo)) {
      setAlertError('帳號或密碼錯誤');
      return;
    }

    try {
      const response = await fetch(domain + AuthRoute, {
        method: 'POST',
        body: JSON.stringify(userinfo),
        headers: new Headers({
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json',
        }),
        credentials: 'include',
      });

      if (response.status === 200) {
        const result = await response.json();
        localStorage.setItem('access-token', result['access-token']);
      }

      setAlertLoadingStop();

      return response;
    } catch (err) {
      setAlertError('帳號或密碼錯誤');
      return err;
    }

    // await fetch(domain + AuthRoute, {
    //   method: 'POST',
    //   body: JSON.stringify(userinfo),
    //   headers: new Headers({
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     'Content-Type': 'application/json',
    //   }),
    //   credentials: 'include',
    // })
    //   .then((res) => {
    //     if (!res.ok) return;
    //     return res.json();
    //   })
    //   .catch((error) => {
    //     setAlertError('帳號或密碼錯誤');
    //     return error;
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setAlertLoadingStop();
    //   });
  };

  return { loading, severity, message, login };
};

const checkUserinfo = (userinfo) => {
  if (userinfo.username === '' || userinfo.password === '') {
    return true;
  }
  return false;
};

export default useLogin;

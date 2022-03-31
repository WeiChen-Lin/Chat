import React from 'react';
import { useState } from 'react';
import chat from './../img/chat.png';
import useLogin from '../hooks/useLogin';

export default function IndexPage(props) {
  const { handleIsLogin } = props;

  const [userinfo, setUserinfo] = useState({
    username: '',
    password: '',
    remember: false,
  });

  const { loading, severity, message, login } = useLogin();

  const handleChange = (e) => {
    setUserinfo({
      ...userinfo,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const status = await login(userinfo);
    handleIsLogin(status.status);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={chat} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Start chat</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nickname" className="sr-only">
                暱稱
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={userinfo.username}
                className={`w-full text-gray-700 rounded-lg bg-gray-50 p-2.5 pl-12 focus:outline-none
                  ${severity === 'error' ? 'border-2 border-red-400' : 'border border-gray-300'}`}
                placeholder="使用者名稱"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nickname" className="sr-only">
                密碼
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={userinfo.password}
                className={`w-full text-gray-700 rounded-lg bg-gray-50 p-2.5 pl-12 focus:outline-none
                  ${severity === 'error' ? 'border-2 border-red-400' : 'border border-gray-300'}`}
                placeholder="密碼"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={userinfo.remember}
                value={userinfo.remember}
                onChange={handleChange}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                記住我
              </label>
            </div>

            <div>
              <a href="" className="font-medium text-gray-600 hover:text-gray-700">
                忘記密碼
              </a>
            </div>
          </div>
          <div className={severity === 'error' ? '' : 'hidden'}>
            <div
              className="flex p-4 m-auto text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 w-1/2"
              role="alert"
            >
              <svg
                className="inline flex-shrink-0 mr-3 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <span className="font-medium">{message}</span>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            {loading ? <LoadingIcon /> : <LogInBut />}
          </div>
        </form>
      </div>
    </div>
  );
}

const LoadingIcon = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center cursor-not-allowed"
    >
      <svg
        role="status"
        className="inline mr-3 w-4 h-4 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

const LogInBut = () => {
  return (
    <button
      type="submit"
      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2 focus:outline-none"
    >
      Log In
    </button>
  );
};

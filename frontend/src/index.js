import { useEffect, useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import Container from './components/container';
import IndexPage from './components/logPage';
import { getUserByCookie } from './fetchers/loginPage/remember';
import './index.css';
import '@material-tailwind/react/tailwind.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const waitForCheckCookie = async () => {
      const loginChecker = await getUserByCookie();
      setIsLogin(loginChecker);
      setLoading(false);
    };
    waitForCheckCookie();
  }, []);

  const handleIsLogin = (status) => {
    setIsLogin(status);
  };

  return (
    <div>
      <div>
        {loading ? (
          <div></div>
        ) : isLogin ? (
          <Container />
        ) : (
          <IndexPage handleIsLogin={handleIsLogin} />
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

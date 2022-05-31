import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Container from 'Components/container';
import IndexPage from 'Components/LogPage/logPage';
import { getUserByCookie } from 'Fetchers/loginPage/remember';
import './index.css';
import '@material-tailwind/react/tailwind.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const waitForCheckCookie = async () => {
      const loginChecker = await getUserByCookie();
      const status = loginChecker.status;
      setIsLogin(status);
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

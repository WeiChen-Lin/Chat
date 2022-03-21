import { useState } from 'react';
import ReactDOM from 'react-dom';
import Container from './components/container';
import IndexPage from './components/logPage';
import { getUserByCookie } from './fetchers/loginPage/remember';
import './index.css';
import '@material-tailwind/react/tailwind.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const handleIsLogin = (status) => {
    setIsLogin(status);
  };

  // const loginChecker = getUserByCookie();
  // handleIsLogin(loginChecker);

  return <div>{isLogin ? <Container /> : <IndexPage handleIsLogin={handleIsLogin} />}</div>;
}
ReactDOM.render(<App />, document.getElementById('root'));

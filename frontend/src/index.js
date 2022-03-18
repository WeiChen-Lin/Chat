import { useState } from 'react';
import ReactDOM from 'react-dom';
import Container from './components/container';
import IndexPage from './components/logPage';
import './index.css';
import '@material-tailwind/react/tailwind.css';

// const domain_name = "http://localhost:8000";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const handleIsLogin = (status) => {
    setIsLogin(status);
  };
  // fetch(domain_name + "/login", {
  //   method: "POST",
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  return (
    <div>
      {isLogin ? (
        <Container handleIsLogin={() => handleIsLogin()} />
      ) : (
        <IndexPage handleIsLogin={() => handleIsLogin()} />
      )}
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));

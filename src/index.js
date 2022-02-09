import React from 'react';
import ReactDOM from 'react-dom';
// import Container from './container';
import IndexPage from './logPage'
import './index.css';
import "@material-tailwind/react/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <Container /> */}
    <IndexPage />
  </React.StrictMode>,
  document.getElementById('root')
);

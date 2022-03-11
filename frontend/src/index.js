import React from "react";
import ReactDOM from "react-dom";
import Container from "./components/container";
import IndexPage from "./components/logPage";
import "./index.css";
import "@material-tailwind/react/tailwind.css";

// const domain_name = "http://localhost:8000";

function App() {
  const isLogin = localStorage.getItem("access-token");
  // fetch(domain_name + "/login", {
  //   method: "POST",
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });

  if (isLogin) {
    return <Container />;
  } else {
    return <IndexPage />;
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

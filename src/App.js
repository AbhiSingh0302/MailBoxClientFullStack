import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Main from "./components/main/Main";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Mail from "./components/Mail";
import Message from "./components/Message";

function App() {
  // let [authToken,setAuthToken] = useState(localStorage.getItem("authMailToken"));
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  // useEffect(() => {
  //   setAuthToken(localStorage.getItem("authMailToken"));
  // }, [])
  console.log(isLoggedIn);
  
  return (
    <Switch>
      <Route exact path="/">
        <Signup/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/mail">
        {isLoggedIn ? <Mail/> : <Redirect to="/login"/>}
      </Route>
      <Route path="/message/:id">
        <Message/>
      </Route>
    </Switch>
  );
}

export default App;

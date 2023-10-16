import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Main from "./components/main/Main";
import { useEffect, useState } from "react";

function App() {
  let [authToken,setAuthToken] = useState(localStorage.getItem("authMailToken"));

  useEffect(() => {
    setAuthToken(localStorage.getItem("authMailToken"));
  }, [])
  
  return (
    <Switch>
      <Route exact path="/">
        <Signup/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/main">
        {authToken ? <Main/> : <Redirect to="/login"/>}
      </Route>
    </Switch>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import get from "../requests/get";
import Verification from "./Verification";

export default function App() {
  const [isLoggedIn, setAsLoggedIn] = useState(null);
  const [isVerified, setAsVerified] = useState(null);

  const verifyToken = async () => {
    if (localStorage.getItem("token")) {
      try {
        const response = await get(
          "http://localhost:8000/auth",
          localStorage.getItem("token")
        );
        const data = await response.json();
        switch (data.status) {
          case "UNVERIFIED":
            setAsLoggedIn(true);
            setAsVerified(false);
            break;
          case "OK":
            setAsLoggedIn(true);
            setAsVerified(true);
            break;
          default:
            localStorage.removeItem("token");
            setAsLoggedIn(false);
        }
      } catch (error) {}
    } else setAsLoggedIn(false);
    console.log(isVerified);
  };

  useEffect(() => verifyToken());

  return isLoggedIn === null ? (
    <></>
  ) : (
    <Router>
      <Switch>
        <Route path="/signup">
          {isLoggedIn ? (
            isVerified ? (
              <Redirect to="/" />
            ) : (
              <Verification />
            )
          ) : (
            <Signup />
          )}
        </Route>
        <Route path="/home">
          {isLoggedIn ? (
            isVerified ? (
              <Home />
            ) : (
              <Verification />
            )
          ) : (
            <Redirect to="/signup" />
          )}
        </Route>
        <Route path="/">
          {isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/signup" />}
        </Route>
      </Switch>
    </Router>
  );
}

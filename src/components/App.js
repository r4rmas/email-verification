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
  const tokenExists = localStorage.getItem("token") !== null;
  const [isLoggedIn, setAsLoggedIn] = useState(tokenExists);
  const [isVerified, setAsVerified] = useState(true);

  const verifyToken = async () => {
    if (tokenExists) {
      try {
        const response = await get(
          "http://localhost:8000/auth",
          localStorage.getItem("token")
        );
        const data = await response.json();
        if (data.status === "UNVERIFIED") {
          setAsLoggedIn(true);
          setAsVerified(false);
        } else if (data.status === "OK") {
          setAsLoggedIn(true);
          setAsVerified(true);
        } else {
          localStorage.removeItem("token");
          setAsLoggedIn(false);
        }
      } catch (error) {}
    }
  };

  useEffect(() => verifyToken());

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
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
        <Route path="/signup" exact>
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
      </Switch>
    </Router>
  );
}

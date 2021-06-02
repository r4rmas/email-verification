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

export default function App() {
  const tokenExists = localStorage.getItem("token") !== null;
  const [isLoggedIn, setAsLoggedIn] = useState(tokenExists);
  const [isVerified, setAsVerified] = useState("");

  const verifyToken = async () => {
    if (tokenExists) {
      try {
        const response = await get(
          "http://localhost:8000/auth",
          localStorage.getItem("token")
        );
        const data = await response.json();
        if (data.auth === "OK") {
          setAsLoggedIn(true);
          setAsVerified(data.status);
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
            <Home isVerified={isVerified} />
          ) : (
            <Redirect to="/signup" />
          )}
        </Route>
        <Route path="/signup" exact>
          {isLoggedIn ? <Redirect to="/" /> : <Signup />}
        </Route>
      </Switch>
    </Router>
  );
}

import React, { useState } from "react";
import post from "../requests/post";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (event) => {
    if (password === passwordConfirmation) {
      event.preventDefault();
      try {
        const response = await post("http://localhost:8000/signup", {
          email: email,
          password: password,
        });
        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.reload();
      } catch (error) {}
    }
    //codigo si las passwords no son las mismas
  };

  return (
    <div className="container-signup">
      <span className="error"></span>
      <form onSubmit={handleSubmit}>
        <div className="section--form-signup">
          <span>Email:</span>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="text"
            required
          />
        </div>
        <div className="section--form-signup">
          <span>Password:</span>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type="password"
            required
          />
        </div>
        <div className="section--form-signup">
          <span>Repeat password:</span>
          <input
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            value={passwordConfirmation}
            type="password"
            required
          />
        </div>
        <button className="button-signup" type="submit">
          SIGN UP
        </button>
      </form>
    </div>
  );
}

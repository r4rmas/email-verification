import React, { useState } from "react";
import post from "../requests/post";

export default function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (event) => {
    //proceso de verificacion
    if (password === passwordConfirmation) {
      event.preventDefault();
      try {
        const response = await post("http://localhost:8000/signup", {
          username: username,
          password: password,
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {}
    }
  };

  return (
    <div className="container-form">
      <span className="error"></span>
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="section--form-signup">
          <span>Username:</span>
          <input
            onChange={(event) => setUsername(event.target.value)}
            value={username}
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

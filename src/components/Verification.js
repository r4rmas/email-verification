import React, { useState } from "react";
import get from "../requests/get";

export default function Verification() {
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await post(
        "http://localhost:8000/verification",
        { verificationCode: verificationCode },
        localStorage.getItem("token")
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="container-verification">
      <form onSubmit={handleSubmit}>
        <h2>¡Hola! enviamos un código de verificación a tu correo</h2>
        <p>Por favor, ingresa el código y verifica tu cuenta:</p>
        <input
          value={verificationCode}
          onChange={(event) => setVerificationCode(event.target.value)}
          type="text"
        />
        <button type="submit">VERIFICAR</button>
      </form>
    </div>
  );
}

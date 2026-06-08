import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {

    if (user === "admin" && password === "1234") {
      navigate("/dashboard");
      return;
    }

    alert("Credenciales incorrectas");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Sistema de Parqueadero</h1>

        <input
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>
          Ingresar
        </button>

      </div>

    </div>
  );
}

export default Login;
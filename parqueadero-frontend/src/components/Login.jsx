import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  // Estados para almacenar el usuario y la contraseña ingresados
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  // Hook para redirigir a otras rutas
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const login = () => {

    // Verifica si las credenciales son correctas
    if (user === "admin" && password === "1234") {
      // Redirige al dashboard si las credenciales son válidas
      navigate("/dashboard");
      return;
    }

    // Muestra una alerta si las credenciales son incorrectas
    alert("Credenciales incorrectas");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Título del formulario */}
        <h1>Sistema de Parqueadero</h1>

        {/* Campo de entrada para el usuario */}
        <input
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        {/* Campo de entrada para la contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Botón para iniciar sesión */}
        <button onClick={login}>
          Ingresar
        </button>

      </div>

    </div>
  );
}

export default Login;
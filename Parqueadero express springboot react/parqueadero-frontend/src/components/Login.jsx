import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authServices";

export default function Login({ setUser }) {

  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  // Estados para manejar el usuario, contraseña y posibles errores
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    setError(""); // Resetea el mensaje de error

    try {
      // Llama al servicio de autenticación con el usuario y contraseña
      const res = await login({
        username,
        password
      });

      // Guarda el usuario en el almacenamiento local
      localStorage.setItem("user", username);

      // Actualiza el estado del usuario en el componente padre
      setUser(username);

      // Redirige al usuario al dashboard
      navigate("/dashboard");

    } catch (err) {
      // Muestra un mensaje de error si ocurre un problema
      setError(
        err.response?.data?.message || "Usuario o contraseña incorrectos."
      );
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo del sistema */}
        <div className="login-logo">
          🚗
        </div>

        {/* Título y descripción */}
        <h1>Sistema de Parqueadero</h1>
        <p>Inicia sesión para continuar</p>

        {/* Muestra el mensaje de error si existe */}
        {error &&
          <div className="error-box">
            {error}
          </div>
        }

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleLogin}>
          <label>Usuario</label>
          <input
            value={username} // Valor del input controlado por el estado
            onChange={(e) => setUsername(e.target.value)} // Actualiza el estado al escribir
            placeholder="Ingrese su usuario"
            required // Campo obligatorio
          />

          <label>Contraseña</label>
          <input
            type="password" // Input de tipo contraseña
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado al escribir
            placeholder="Ingrese su contraseña"
            required // Campo obligatorio
          />

          <button type="submit">
            Ingresar
          </button>
        </form>

        {/* Enlace para redirigir al registro */}
        <div className="form-footer">
          ¿No tienes una cuenta?
          <br />
          <Link to="/register">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}

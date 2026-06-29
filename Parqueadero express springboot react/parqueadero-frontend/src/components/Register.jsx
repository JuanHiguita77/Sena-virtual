import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authServices";

export default function Register() {

    // Hook para la navegación entre rutas
    const navigate = useNavigate();

    // Estados para manejar los valores de los campos del formulario
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Estados para manejar mensajes de error y éxito
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Función para manejar el registro de usuario
    const handleRegister = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Reinicia los mensajes de error y éxito
        setError("");
        setSuccess("");

        // Verifica si las contraseñas coinciden
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            // Llama al servicio de registro con los datos del usuario
            const res = await register({
                username,
                password
            });

            // Muestra el mensaje de éxito
            setSuccess(res.data.message);

            // Redirige al usuario a la página de inicio de sesión después de 1.5 segundos
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            // Muestra un mensaje de error si ocurre algún problema
            setError(
                err.response?.data?.message || "Error al registrar."
            );
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">
                    👤
                </div>

                <h1>Crear Cuenta</h1>
                <p>Registra un nuevo usuario</p>

                {/* Muestra un mensaje de error si existe */}
                {error &&
                    <div className="error-box">
                        {error}
                    </div>
                }

                {/* Muestra un mensaje de éxito si existe */}
                {success &&
                    <div className="success-box">
                        {success}
                    </div>
                }

                {/* Formulario de registro */}
                <form onSubmit={handleRegister}>
                    <label>Usuario</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nombre de usuario"
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />

                    <label>Confirmar contraseña</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repita la contraseña"
                        required
                    />

                    <button>
                        Crear Cuenta
                    </button>
                </form>

                {/* Enlace para redirigir a la página de inicio de sesión */}
                <div className="form-footer">
                    ¿Ya tienes una cuenta?
                    <br />
                    <Link to="/login">
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}

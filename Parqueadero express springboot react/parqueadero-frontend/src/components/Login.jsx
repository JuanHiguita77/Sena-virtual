import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authServices";

export default function Login({ setUser }) {

    const navigate = useNavigate();

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");

    const handleLogin=async(e)=>{

        e.preventDefault();

        setError("");

        try{

            const res=await login({
                username,
                password
            });

            localStorage.setItem("user",username);

            setUser(username);

            navigate("/dashboard");

        }catch(err){

            setError(
                err.response?.data?.message || "Usuario o contraseña incorrectos."
            );

        }

    }

    return(

        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    🚗
                </div>

                <h1>Sistema de Parqueadero</h1>

                <p>Inicia sesión para continuar</p>

                {error &&

                    <div className="error-box">
                        {error}
                    </div>

                }

                <form onSubmit={handleLogin}>

                    <label>Usuario</label>

                    <input
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        placeholder="Ingrese su usuario"
                        required
                    />

                    <label>Contraseña</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Ingrese su contraseña"
                        required
                    />

                    <button type="submit">

                        Ingresar

                    </button>

                </form>

                <div className="form-footer">

                    ¿No tienes una cuenta?

                    <br/>

                    <Link to="/register">

                        Crear cuenta

                    </Link>

                </div>

            </div>

        </div>

    );

}
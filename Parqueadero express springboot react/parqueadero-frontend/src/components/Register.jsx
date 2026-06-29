import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authServices";

export default function Register(){

    const navigate=useNavigate();

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");

    const handleRegister=async(e)=>{

        e.preventDefault();

        setError("");
        setSuccess("");

        if(password!==confirmPassword){

            setError("Las contraseñas no coinciden.");

            return;

        }

        try{

            const res=await register({

                username,
                password

            });

            setSuccess(res.data.message);

            setTimeout(()=>{

                navigate("/login");

            },1500);

        }

        catch(err){

            setError(

                err.response?.data?.message || "Error al registrar."

            );

        }

    }

    return(

        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">

                    👤

                </div>

                <h1>Crear Cuenta</h1>

                <p>Registra un nuevo usuario</p>

                {error &&

                    <div className="error-box">

                        {error}

                    </div>

                }

                {success &&

                    <div className="success-box">

                        {success}

                    </div>

                }

                <form onSubmit={handleRegister}>

                    <label>Usuario</label>

                    <input
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        placeholder="Nombre de usuario"
                        required
                    />

                    <label>Contraseña</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />

                    <label>Confirmar contraseña</label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        placeholder="Repita la contraseña"
                        required
                    />

                    <button>

                        Crear Cuenta

                    </button>

                </form>

                <div className="form-footer">

                    ¿Ya tienes una cuenta?

                    <br/>

                    <Link to="/login">

                        Iniciar sesión

                    </Link>

                </div>

            </div>

        </div>

    );

}
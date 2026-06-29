import { Navigate } from "react-router-dom";

// Componente de ruta protegida
export default function ProtectedRoute({ children }) {
    // Obtiene el usuario almacenado en el localStorage
    const user = localStorage.getItem("user");

    // Si el usuario existe, renderiza los hijos (children), de lo contrario redirige a la página de login
    return user ? children : <Navigate to="/login" />;
}
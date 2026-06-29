import { useNavigate } from "react-router-dom";

/**
 * Componente LogoutButton
 * 
 * Este componente representa un botón para cerrar sesión. 
 * Al hacer clic en el botón, el usuario es redirigido a la página principal ("/").
 * 
 * @component
 * @example
 * return (
 *   <LogoutButton />
 * )
 * 
 * @returns {JSX.Element} Botón de cierre de sesión.
 */
function LogoutButton() {

  const navigate = useNavigate();

  return (
    <button
      className="logout-btn"
      onClick={() => navigate("/")}
    >
      Cerrar Sesión
    </button>
  );
}

export default LogoutButton;
import { useNavigate } from "react-router-dom";

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
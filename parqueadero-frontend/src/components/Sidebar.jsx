import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  return (
    <aside className="sidebar">

      <h2>MENÚ</h2>

      <Link to="/dashboard">
        📊 Dashboard
      </Link>

      <Link to="/vehicles">
        🚗 Vehículos
      </Link>

      <div className="separator"></div>

      <button
        className="logout-link"
        onClick={() => navigate("/")}
      >
        🚪 Cerrar Sesión
      </button>

    </aside>
  );
}

export default Sidebar;
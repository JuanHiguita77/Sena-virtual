import { Link, useNavigate } from "react-router-dom";

// Componente Sidebar
function Sidebar() {

  // Hook para la navegación programática
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      {/* Título del menú */}
      <h2>MENÚ</h2>

      {/* Enlace al dashboard */}
      <Link to="/dashboard">
        Dashboard
      </Link>

      {/* Enlace a la sección de vehículos */}
      <Link to="/vehicles">
        Vehículos
      </Link>

      {/* Separador visual */}
      <div className="separator"></div>

      {/* Botón para cerrar sesión y redirigir a la página principal */}
      <button
        className="logout-link"
        onClick={() => navigate("/")}
      >
        Cerrar Sesión
      </button>
    </aside>
  );
}

// Exportar el componente Sidebar
export default Sidebar;
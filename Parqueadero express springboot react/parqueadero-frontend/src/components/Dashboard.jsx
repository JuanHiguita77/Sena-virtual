import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getVehicles } from "../services/VehicleService";

function Dashboard() {

  // Estado para almacenar la lista de vehículos
  const [vehicles, setVehicles] = useState([]);

  // Hook useEffect para cargar los datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  // Función asíncrona para obtener los datos de los vehículos
  const loadData = async () => {
    const data = await getVehicles();
    setVehicles(data); // Actualiza el estado con los datos obtenidos
  };

  // Total de vehículos registrados
  const totalVehiculos = vehicles.length;

  // Filtra y cuenta los vehículos de tipo "Carro"
  const carros = vehicles.filter(
    v => v.vehicleType === "Carro"
  ).length;
  
  // Filtra y cuenta los vehículos de tipo "Moto"
  const motos = vehicles.filter(
    v => v.vehicleType === "Moto"
  ).length;
  
  // Filtra y cuenta los vehículos de tipo "Otro"
  const otros = vehicles.filter(
    v => v.vehicleType === "Otro"
  ).length;

  return (

    <div className="dashboard-layout">

      {/* Componente de barra lateral */}
      <Sidebar />

      <main className="main-content">

        {/* Encabezado de la página */}
        <div className="page-header">
          <h1>Dashboard</h1>
        </div>

        {/* Sección de estadísticas */}
        <div className="stats">

          {/* Tarjeta para mostrar el total de vehículos */}
          <div className="stat-card">
            <h3>Total Vehículos</h3>
            <p>{totalVehiculos}</p>
          </div>

          {/* Tarjeta para mostrar el total de carros */}
          <div className="stat-card">
            <h3>Carros</h3>
            <p>{carros}</p>
          </div>

          {/* Tarjeta para mostrar el total de motos */}
          <div className="stat-card">
            <h3>Motos</h3>
            <p>{motos}</p>
          </div>

          {/* Tarjeta para mostrar el total de otros vehículos */}
          <div className="stat-card">
            <h3>Otros</h3>
            <p>{otros}</p>
          </div>
        </div>

        {/* Sección de información general */}
        <div className="form-card">

          <h2>Información General</h2>

          <p>
            Este sistema permite administrar
            los vehículos registrados dentro
            del parqueadero.
          </p>

          <br />

          <p>
            Utilice el menú lateral para acceder
            al módulo de gestión de vehículos.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
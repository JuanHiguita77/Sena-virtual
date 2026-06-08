import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getVehicles } from "../services/VehicleService";

function Dashboard() {

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  const totalVehiculos = vehicles.length;

  const carros = vehicles.filter(
    v => v.vehicleType === "Carro"
  ).length;
  
  const motos = vehicles.filter(
    v => v.vehicleType === "Moto"
  ).length;
  
  const otros = vehicles.filter(
    v => v.vehicleType === "Otro"
  ).length;

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-header">
          <h1>Dashboard</h1>
        </div>

        <div className="stats">

          <div className="stat-card">
            <h3>Total Vehículos</h3>
            <p>{totalVehiculos}</p>
          </div>

          <div className="stat-card">
            <h3>Carros</h3>
            <p>{carros}</p>
          </div>

          <div className="stat-card">
            <h3>Motos</h3>
            <p>{motos}</p>
          </div>

          <div className="stat-card">
            <h3>Otros</h3>
            <p>{otros}</p>
          </div>
        </div>

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
import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import VehicleForm from "./VehicleForm";
import VehicleTable from "./VehicleTable";

import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from "../services/VehicleService";

function Vehicles() {

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] =
    useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  const handleSave = async (vehicle) => {

    if (vehicle.id) {

      await updateVehicle(
        vehicle.id,
        vehicle
      );

    } else {

      await createVehicle(vehicle);
    }

    setSelectedVehicle(null);

    loadVehicles();
  };

  const handleDelete = async (id) => {

    if (window.confirm("¿Eliminar vehículo?")) {

      await deleteVehicle(id);

      loadVehicles();
    }
  };

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-header">
          <h1>Gestión de Vehículos</h1>
        </div>

        <VehicleForm
          selectedVehicle={selectedVehicle}
          onSave={handleSave}
        />

        <VehicleTable
          vehicles={vehicles}
          onEdit={setSelectedVehicle}
          onDelete={handleDelete}
        />

      </main>

    </div>

  );
}

export default Vehicles;
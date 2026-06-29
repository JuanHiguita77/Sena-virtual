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

  // Estado para almacenar la lista de vehículos
  const [vehicles, setVehicles] = useState([]);
  // Estado para almacenar el vehículo seleccionado (para editar)
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Cargar la lista de vehículos al montar el componente
  useEffect(() => {
    loadVehicles();
  }, []);

  // Función para cargar los vehículos desde el servicio
  const loadVehicles = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  // Manejar la acción de guardar (crear o actualizar) un vehículo
  const handleSave = async (vehicle) => {
    if (vehicle.id) {
      // Si el vehículo tiene un ID, se actualiza
      await updateVehicle(vehicle.id, vehicle);
    } else {
      // Si no tiene ID, se crea uno nuevo
      await createVehicle(vehicle);
    }

    // Limpiar el vehículo seleccionado después de guardar
    setSelectedVehicle(null);

    // Recargar la lista de vehículos
    loadVehicles();
  };

  // Manejar la acción de eliminar un vehículo
  const handleDelete = async (id) => {
    // Confirmar antes de eliminar
    if (window.confirm("¿Eliminar vehículo?")) {
      await deleteVehicle(id);
      // Recargar la lista de vehículos después de eliminar
      loadVehicles();
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Componente de barra lateral */}
      <Sidebar />

      <main className="main-content">
        {/* Encabezado de la página */}
        <div className="page-header">
          <h1>Gestión de Vehículos</h1>
        </div>

        {/* Formulario para crear o editar vehículos */}
        <VehicleForm
          selectedVehicle={selectedVehicle}
          onSave={handleSave}
        />

        {/* Tabla para mostrar la lista de vehículos */}
        <VehicleTable
          vehicles={vehicles}
          onEdit={setSelectedVehicle} // Editar vehículo
          onDelete={handleDelete} // Eliminar vehículo
        />
      </main>
    </div>
  );
}

export default Vehicles;

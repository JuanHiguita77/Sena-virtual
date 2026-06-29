import { useEffect, useState } from "react";

function VehicleForm({ selectedVehicle, onSave }) {

  // Estados para almacenar los valores de placa, propietario y tipo de vehículo
  const [plate, setPlate] = useState("");
  const [owner, setOwner] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  // Efecto que se ejecuta cuando cambia el vehículo seleccionado
  useEffect(() => {
    if (selectedVehicle) {
      // Si hay un vehículo seleccionado, se llenan los campos con sus datos
      setPlate(selectedVehicle.plate);
      setOwner(selectedVehicle.owner);
      setVehicleType(selectedVehicle.vehicleType);
    }
  }, [selectedVehicle]);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Validación de la placa
    if (plate.length < 5 || plate.length > 6) {
      alert("La placa debe tener entre 5 y 6 caracteres");
      return;
    }

    // Validación del nombre del propietario
    if (owner.length < 3) {
      alert("Nombre inválido");
      return;
    }

    // Validación del tipo de vehículo
    if (!vehicleType) {
      alert("Seleccione un tipo de vehículo");
      return;
    }

    // Llama a la función onSave con los datos del vehículo
    onSave({
      id: selectedVehicle?.id, // Si existe, incluye el ID del vehículo seleccionado
      plate,
      owner,
      vehicleType
    });

    // Limpia los campos del formulario
    setPlate("");
    setOwner("");
    setVehicleType("");
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      {/* Título dinámico dependiendo si se está editando o registrando */}
      <h2>
        {selectedVehicle
          ? "Editar Vehículo"
          : "Registrar Vehículo"}
      </h2>

      {/* Campo para ingresar la placa */}
      <input
        placeholder="Placa"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      {/* Campo para ingresar el propietario */}
      <input
        placeholder="Propietario"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />

      {/* Selector para el tipo de vehículo */}
      <select
        value={vehicleType}
        onChange={(e) =>
          setVehicleType(e.target.value)
        }
      >
        <option value="">
          Seleccione un tipo
        </option>
        <option value="Carro">
          Carro
        </option>
        <option value="Moto">
          Moto
        </option>
        <option value="Otro">
          Otro Vehículo
        </option>
      </select>

      {/* Botón para guardar el vehículo */}
      <button type="submit">
        Guardar Vehículo
      </button>
    </form>
  );
}

export default VehicleForm;
import { useEffect, useState } from "react";

function VehicleForm({ selectedVehicle, onSave }) {

  const [plate, setPlate] = useState("");
  const [owner, setOwner] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  useEffect(() => {

    if (selectedVehicle) {
      setPlate(selectedVehicle.plate);
      setOwner(selectedVehicle.owner);
      setVehicleType(selectedVehicle.vehicleType);
    }

  }, [selectedVehicle]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (plate.length < 5 || plate.length > 6) {
      alert("La placa debe tener entre 5 y 6 caracteres");
      return;
    }

    if (owner.length < 3) {
      alert("Nombre inválido");
      return;
    }

    if (!vehicleType) {
        alert("Seleccione un tipo de vehículo");
        return;
    }

    onSave({
      id: selectedVehicle?.id,
      plate,
      owner,
      vehicleType
    });

    setPlate("");
    setOwner("");
    setVehicleType("");
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>

      <h2>
        {selectedVehicle
          ? "Editar Vehículo"
          : "Registrar Vehículo"}
      </h2>

      <input
        placeholder="Placa"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      <input
        placeholder="Propietario"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />

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

    <button type="submit">
        Guardar Vehículo
    </button>

    </form>
  );
}

export default VehicleForm;
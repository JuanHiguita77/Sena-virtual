function VehicleTable({
    vehicles,
    onEdit,
    onDelete
  }) {
  
    return (
  
      <table>
  
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Propietario</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
  
        <tbody>
  
          {vehicles.map(vehicle => (
  
            <tr key={vehicle.id}>
  
              <td>{vehicle.id}</td>
              <td>{vehicle.plate}</td>
              <td>{vehicle.owner}</td>
              <td>{vehicle.vehicleType}</td>
  
              <td>
  
                <button
                  onClick={() => onEdit(vehicle)}
                >
                  Editar
                </button>
  
                <button
                  onClick={() =>
                    onDelete(vehicle.id)
                  }
                >
                  Eliminar
                </button>
  
              </td>
  
            </tr>
  
          ))}
  
        </tbody>
  
      </table>
  
    );
  }
  
  export default VehicleTable;
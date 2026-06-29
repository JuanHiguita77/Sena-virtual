// Componente VehicleTable que recibe las props: vehicles, onEdit y onDelete
function VehicleTable({
  vehicles, // Lista de vehículos
  onEdit,   // Función para editar un vehículo
  onDelete  // Función para eliminar un vehículo
  }) {
  
  return (
    // Tabla para mostrar los vehículos
    <table>
  
    <thead>
      <tr>
      <th>ID</th> {/* Columna para el ID del vehículo */}
      <th>Placa</th> {/* Columna para la placa del vehículo */}
      <th>Propietario</th> {/* Columna para el propietario del vehículo */}
      <th>Tipo</th> {/* Columna para el tipo de vehículo */}
      <th>Acciones</th> {/* Columna para las acciones (editar/eliminar) */}
      </tr>
    </thead>
  
    <tbody>
      {/* Itera sobre la lista de vehículos y genera una fila para cada uno */}
      {vehicles.map(vehicle => (
      <tr key={vehicle.id}> {/* Cada fila tiene un identificador único */}
        <td>{vehicle.id}</td> {/* Muestra el ID del vehículo */}
        <td>{vehicle.plate}</td> {/* Muestra la placa del vehículo */}
        <td>{vehicle.owner}</td> {/* Muestra el propietario del vehículo */}
        <td>{vehicle.vehicleType}</td> {/* Muestra el tipo de vehículo */}
  
        <td>
        {/* Botón para editar el vehículo */}
        <button
          onClick={() => onEdit(vehicle)} // Llama a la función onEdit con el vehículo actual
        >
          Editar
        </button>
  
        {/* Botón para eliminar el vehículo */}
        <button
          onClick={() =>
          onDelete(vehicle.id) // Llama a la función onDelete con el ID del vehículo actual
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
  
  // Exporta el componente para que pueda ser utilizado en otros archivos
  export default VehicleTable;

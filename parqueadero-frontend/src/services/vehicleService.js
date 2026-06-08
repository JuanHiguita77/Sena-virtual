const API_URL = "http://localhost:8080/vehicles";

export async function getVehicles() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function createVehicle(vehicle) {
  return await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vehicle)
  });
}

/**
 * Actualiza la información de un vehículo en el servidor.
 * 
 * @async
 * @function updateVehicle
 * @param {string} id - El identificador único del vehículo a actualizar.
 * @param {Object} vehicle - Un objeto que contiene los datos actualizados del vehículo.
 * @returns {Promise<Response>} Una promesa que resuelve con la respuesta de la solicitud fetch.
 */
export async function updateVehicle(id, vehicle) {
  return await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vehicle)
  });
}

export async function deleteVehicle(id) {
  return await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
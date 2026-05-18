const API_URL = "http://localhost:8080/vehicles";

let editingId = null;

// Registrar o actualizar
async function saveVehicle() {

    const plate = document.getElementById("plate").value.trim();
    const owner = document.getElementById("owner").value.trim();

    if (!plate || !owner) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const vehicle = {
        id: editingId || Date.now(),
        plate,
        owner
    };

    let response;

    if (editingId) {

        response = await fetch(`${API_URL}/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicle)
        });

    } else {

        response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicle)
        });
    }

    const result = await response.text();

    alert(result);

    clearForm();

    loadVehicles();
}

// Obtener vehículos
async function loadVehicles() {

    const response = await fetch(API_URL);

    const vehicles = await response.json();

    const table = document.getElementById("vehicleTable");

    table.innerHTML = "";

    vehicles.forEach(vehicle => {

        table.innerHTML += `
            <tr>
                <td>${vehicle.id}</td>
                <td>${vehicle.plate}</td>
                <td>${vehicle.owner}</td>
                <td>
                    <button onclick="editVehicle(${vehicle.id}, '${vehicle.plate}', '${vehicle.owner}')">
                        Editar
                    </button>

                    <button onclick="deleteVehicle(${vehicle.id})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

// Editar
function editVehicle(id, plate, owner) {

    editingId = id;

    document.getElementById("plate").value = plate;
    document.getElementById("owner").value = owner;
}

// Eliminar
async function deleteVehicle(id) {

    const confirmDelete = confirm("¿Eliminar vehículo?");

    if (!confirmDelete) return;

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    const result = await response.text();

    alert(result);

    loadVehicles();
}

// Limpiar formulario
function clearForm() {

    editingId = null;

    document.getElementById("plate").value = "";
    document.getElementById("owner").value = "";
}

loadVehicles();
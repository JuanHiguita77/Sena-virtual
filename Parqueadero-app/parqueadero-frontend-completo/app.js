const API_URL = "http://localhost:8080/vehicles";

let editingId = null;

// ✅ Función para navegar entre secciones
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Registrar o actualizar
async function saveVehicle() {

    const plate = document.getElementById("plate").value.trim();
    const owner = document.getElementById("owner").value.trim();
    const vehicleType  = document.getElementById("vehicleType").value;

    if (!plate || !owner || !vehicleType) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const vehicle = {
        plate,
        owner,
        vehicleType
    };

    let response;

    if (editingId) {

        response = await fetch(`${API_URL}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehicle)
        });

    } else {

        response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehicle)
        });
    }

    const result = await response.text();
    alert(result);
    clearForm();
    loadVehicles();
}

// Obtener vehículos y poblar ambas tablas
async function loadVehicles() {

    const response = await fetch(API_URL);
    const vehicles = await response.json();

    // ✅ Tabla del dashboard (con columna ID)
    const dashboardTable = document.getElementById("dashboardTable");
    if (dashboardTable) {
        dashboardTable.innerHTML = "";
        vehicles.forEach(vehicle => {
            dashboardTable.innerHTML += `
                <tr>
                    <td>${vehicle.id}</td>
                    <td>${vehicle.plate}</td>
                    <td>${vehicle.owner}</td>
                    <td>${vehicle.vehicleType}</td>
                    <td>
                        <button onclick="editVehicle(${vehicle.id}, '${vehicle.plate}', '${vehicle.owner}', '${vehicle.vehicleType}')">Editar</button>
                        <button onclick="deleteVehicle(${vehicle.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }

    // ✅ Tabla de la sección Vehículos (con columna Tipo)
    const vehicleTable = document.getElementById("vehicleTable");
    if (vehicleTable) {
        vehicleTable.innerHTML = "";
        vehicles.forEach(vehicle => {
            vehicleTable.innerHTML += `
                <tr>
                    <td>${vehicle.plate}</td>
                    <td>${vehicle.owner}</td>
                    <td>${vehicle.vehicleType || '-'}</td>
                    <td>
                        <button onclick="editVehicle(${vehicle.id}, '${vehicle.plate}', '${vehicle.owner}','${vehicle.vehicleType}')">Editar</button>
                        <button onclick="deleteVehicle(${vehicle.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }
}

// Editar
function editVehicle(id, plate, owner, vehicleType) {
    editingId = id;
    document.getElementById("plate").value = plate;
    document.getElementById("owner").value = owner;
    document.getElementById("vehicleType").value = vehicleType;
    showSection('vehiculos'); // Navegar a la sección de edición
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
    document.getElementById("vehicleType").value = "Carro";
}

// Cerrar sesión
function logout() {
    if (confirm("¿Deseas cerrar sesión?")) {
        window.location.href = "login.html";
    }
}

// Cargar datos al iniciar
loadVehicles();
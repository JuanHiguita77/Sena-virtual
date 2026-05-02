
package com.parqueadero.repository;

import com.parqueadero.model.Vehicle;
import java.util.ArrayList;
import java.util.List;

//Repositorio para almacenar los vehículos (simulación de base de datos)
public class VehicleRepository {

    private List<Vehicle> vehicles = new ArrayList<>();

    // Obtener todos los vehículos
    public List<Vehicle> findAll() {
        return vehicles;
    }

    // Guardar un nuevo vehículo
    public void save(Vehicle v) {
        vehicles.add(v);
    }
}

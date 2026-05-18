
package com.parqueadero.service;

import com.parqueadero.model.Vehicle;
import com.parqueadero.repository.VehicleRepository;
import java.util.List;

public class VehicleService {

    private VehicleRepository repository = new VehicleRepository();

    public List<Vehicle> getAllVehicles() {
        return repository.findAll();
    }

    public void addVehicle(Vehicle v) {
        repository.save(v);
    }
}

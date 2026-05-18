package com.parqueadero.service;

import com.parqueadero.model.Vehicle;
import com.parqueadero.repository.VehicleRepository;

import java.util.List;

public class VehicleService {

    private final VehicleRepository repository = new VehicleRepository();

    public List<Vehicle> getAllVehicles() {
        return repository.findAll();
    }

    public String addVehicle(Vehicle vehicle) {

        if (repository.existsByPlate(vehicle.getPlate())) {
            return "La placa ya existe";
        }

        repository.save(vehicle);

        return "Vehículo registrado correctamente";
    }

    public boolean updateVehicle(Long id, Vehicle updatedVehicle) {

        Vehicle vehicle = repository.findById(id);

        if (vehicle != null) {

            vehicle.setPlate(updatedVehicle.getPlate());
            vehicle.setOwner(updatedVehicle.getOwner());

            return true;
        }

        return false;
    }

    public boolean deleteVehicle(Long id) {
        return repository.delete(id);
    }
}
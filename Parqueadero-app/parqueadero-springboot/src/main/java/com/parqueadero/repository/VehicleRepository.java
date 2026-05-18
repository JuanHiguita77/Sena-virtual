package com.parqueadero.repository;

import com.parqueadero.model.Vehicle;

import java.util.ArrayList;
import java.util.List;

public class VehicleRepository {

    private final List<Vehicle> vehicles = new ArrayList<>();

    public List<Vehicle> findAll() {
        return vehicles;
    }

    public void save(Vehicle vehicle) {
        vehicles.add(vehicle);
    }

    public Vehicle findById(Long id) {

        return vehicles.stream()
                .filter(v -> v.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public boolean existsByPlate(String plate) {

        return vehicles.stream()
                .anyMatch(v -> v.getPlate().equalsIgnoreCase(plate));
    }

    public boolean delete(Long id) {

        return vehicles.removeIf(v -> v.getId().equals(id));
    }
}
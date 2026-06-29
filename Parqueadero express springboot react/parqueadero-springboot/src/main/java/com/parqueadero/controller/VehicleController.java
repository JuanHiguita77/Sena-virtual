package com.parqueadero.controller;

import com.parqueadero.model.Vehicle;
import com.parqueadero.service.VehicleService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin("*")
public class VehicleController {

    private final VehicleService service = new VehicleService();

    @GetMapping
    public List<Vehicle> getVehicles() {
        return service.getAllVehicles();
    }

    @PostMapping
    public String addVehicle(@Valid @RequestBody Vehicle vehicle) {

        return service.addVehicle(vehicle);
    }

    @PutMapping("/{id}")
    public String updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody Vehicle vehicle
    ) {

        boolean updated = service.updateVehicle(id, vehicle);

        if (updated) {
            return "Vehículo actualizado";
        }

        return "Vehículo no encontrado";
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable Long id) {

        boolean deleted = service.deleteVehicle(id);

        if (deleted) {
            return "Vehículo eliminado";
        }

        return "Vehículo no encontrado";
    }
}
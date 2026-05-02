
package com.parqueadero.controller;

import com.parqueadero.model.Vehicle;
import com.parqueadero.service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Controlador de los endpoints
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    private VehicleService service = new VehicleService();

    // Obtener todos los vehículos
    @GetMapping
    public List<Vehicle> getVehicles() {
        return service.getAllVehicles();
    }

    // Registrar vehículo
    @PostMapping
    public String addVehicle(@RequestBody Vehicle vehicle) {
        service.addVehicle(vehicle);
        return "Vehículo registrado";
    }
}

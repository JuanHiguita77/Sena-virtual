package com.parqueadero.service;

import com.parqueadero.model.Vehicle;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class VehicleServiceTest {

    @Test
    void shouldAddVehicleSuccessfully(){

        VehicleService service = new VehicleService();

        Vehicle vehicle = new Vehicle(
                null,
                "ABC123",
                "Juan Perez",
                "Carro"
        );

        String result = service.addVehicle(vehicle);

        assertEquals(
                "Vehículo registrado correctamente",
                result
        );

        assertEquals(
                1,
                service.getAllVehicles().size()
        );

    }

    @Test
    void shouldNotAllowDuplicatePlate() {

    VehicleService service = new VehicleService();

    Vehicle vehicle1 = new Vehicle(
            null,
            "ABC123",
            "Juan",
            "Carro"
    );

    Vehicle vehicle2 = new Vehicle(
            null,
            "ABC123",
            "Pedro",
            "Moto"
    );

    service.addVehicle(vehicle1);

    String result = service.addVehicle(vehicle2);

    assertEquals(
            "La placa ya existe",
            result
    );

    }

    @Test
    void shouldReturnVehicleList() {

        VehicleService service = new VehicleService();

        service.addVehicle(new Vehicle(null,"AAA111","Juan","Carro"));
        service.addVehicle(new Vehicle(null,"BBB222","Pedro","Moto"));

        assertEquals(
                2,
                service.getAllVehicles().size()
        );

    }

    @Test
    void shouldUpdateVehicle() {

        VehicleService service = new VehicleService();

        Vehicle vehicle = new Vehicle(
                null,
                "ABC123",
                "Juan",
                "Carro"
        );

        service.addVehicle(vehicle);

        Vehicle updated = new Vehicle(
                null,
                "XYZ999",
                "Carlos",
                "Moto"
        );

        boolean result = service.updateVehicle(1L, updated);

        assertTrue(result);

    }

    @Test
    void shouldNotUpdateNonExistingVehicle() {

        VehicleService service = new VehicleService();

        Vehicle updated = new Vehicle(
                null,
                "XYZ999",
                "Carlos",
                "Moto"
        );

        boolean result = service.updateVehicle(100L, updated);

        assertFalse(result);

    }

    @Test
    void shouldDeleteVehicle() {

        VehicleService service = new VehicleService();

        service.addVehicle(
                new Vehicle(
                        null,
                        "ABC123",
                        "Juan",
                        "Carro"
                )
        );

        boolean result = service.deleteVehicle(1L);

        assertTrue(result);

    }

    @Test
    void shouldNotDeleteVehicleIfNotExists() {

        VehicleService service = new VehicleService();

        boolean result = service.deleteVehicle(50L);

        assertFalse(result);

    }

}
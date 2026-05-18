package com.parqueadero.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La placa es obligatoria")
    @Size(min = 5, max = 10, message = "La placa debe tener entre 5 y 10 caracteres")
    @Pattern(
            regexp = "^[A-Za-z0-9]+$",
            message = "La placa solo puede contener letras y números"
    )
    private String plate;

    @NotBlank(message = "El propietario es obligatorio")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String owner;

    // Constructor vacío requerido por JPA
    public Vehicle() {}

    // Constructor con parámetros
    public Vehicle(Long id, String plate, String owner) {
        this.id = id;
        this.plate = plate;
        this.owner = owner;
    }

    // Getters y setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getPlate() { return plate; }

    public void setPlate(String plate) { this.plate = plate; }

    public String getOwner() { return owner; }

    public void setOwner(String owner) { this.owner = owner; }
}

package com.parqueadero.model;

//Objeto Vehicle
public class Vehicle {

    private Long id;
    private String plate;
    private String owner;

    public Vehicle() {}

    //Constructor
    public Vehicle(Long id, String plate, String owner) {
        this.id = id;
        this.plate = plate;
        this.owner = owner;
    }

    //Setters y Getters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPlate() { return plate; }
    public void setPlate(String plate) { this.plate = plate; }

    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
}

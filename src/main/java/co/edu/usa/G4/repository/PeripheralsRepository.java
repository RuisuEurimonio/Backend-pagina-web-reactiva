/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.G4.repository;

import co.edu.usa.G4.crudRepository.PeripheralsCrudRepository;
import co.edu.usa.G4.model.Peripherals;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Usuario
 */
@Repository
public class PeripheralsRepository {

    @Autowired
    private PeripheralsCrudRepository peripheralR;

    public List<Peripherals> getAll() {
        return peripheralR.findAll();
    }
    
    public Optional<Peripherals> getPeripherals(String reference) {
        return peripheralR.findById(reference);
    }

    public Peripherals create(Peripherals peripherals) {
        return peripheralR.save(peripherals);
    }

    public void update(Peripherals peripherals) {
        peripheralR.save(peripherals);
    }

    public void delete(Peripherals peripherals) {
        peripheralR.delete(peripherals);
    }
    public List<Peripherals> getByPrice(double price){
        return peripheralR.findByPriceLessThanEqual(price);
    }

    public List<Peripherals> getByDescriptionContains(String description){
        return peripheralR.findByDescriptionContainingIgnoreCase(description);
    }

    public List<Peripherals> getByReference(String name){
        return peripheralR.findByReference(name);
    }

    public List<Peripherals> getByCategory(String category){
        return peripheralR.findByCategory(category);
    }
}

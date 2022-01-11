/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.G4.service;

import co.edu.usa.G4.model.Peripherals;
import co.edu.usa.G4.repository.PeripheralsRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service
public class PeripheralsService {

    @Autowired
    private PeripheralsRepository peripheralsR;

    public List<Peripherals> getAll() {
        return peripheralsR.getAll();
    }

    public Optional<Peripherals> getPeripherals1(String reference) {
        return peripheralsR.getPeripherals(reference);
    }

    public Peripherals create(Peripherals peripherals) {
        if (peripherals.getReference() == null) {
            return peripherals;
        } else {
            return peripheralsR.create(peripherals);
        }
    }

    public Peripherals update(Peripherals peripherals) {
        System.out.println("Servicio 1 de 10");
        System.out.println(peripherals);
        if (peripherals.getReference() != null) {
            
            System.out.println("Servicio 2 de 10");
            System.out.println(peripherals.getReference());
            System.out.println(peripheralsR.getPeripherals(peripherals.getReference()));
            
            Optional<Peripherals> peripheralsDb = peripheralsR.getPeripherals(peripherals.getReference());
            
            
            if (!peripheralsDb.isEmpty()) {
                
                System.out.println("Servicio 3 de 10");
                
                if (peripherals.getBrand() != null) {
                    peripheralsDb.get().setBrand(peripherals.getBrand());
                    System.out.println("Servicio 4 de 10");
                }
                if (peripherals.getCategory() != null) {
                    peripheralsDb.get().setCategory(peripherals.getCategory());
                    System.out.println("Servicio 5 de 10");
                }

                if (peripherals.getDescription() != null) {
                    peripheralsDb.get().setDescription(peripherals.getDescription());
                    System.out.println("Servicio 6 de 10");
                }
                if (peripherals.getPrice() != 0.0) {
                    peripheralsDb.get().setPrice(peripherals.getPrice());
                    System.out.println("Servicio 7 de 10");
                }
                if (peripherals.getQuantity() > 0) {
                    peripheralsDb.get().setQuantity(peripherals.getQuantity());
                    System.out.println("Servicio 8 de 10");
                }
                if (peripherals.getPhotography() != null) {
                    peripheralsDb.get().setPhotography(peripherals.getPhotography());
                    System.out.println("Servicio 9 de 10");
                }
                peripheralsDb.get().setAvailability(peripherals.isAvailability());
                peripheralsR.update(peripheralsDb.get());
                System.out.println("Servicio 10 de 10");
                return peripheralsDb.get();
            } else {
                return peripherals;
            }
        } else {
            return peripherals;
        }
    }

    public boolean delete(String reference) {
        System.out.println("Delete 1 de 2");
        Boolean aBoolean = getPeripherals1(reference).map(product -> {
            peripheralsR.delete(product);
            System.out.println("Delete 2 de 2");
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public List<Peripherals> getByPrice(double price){
        return peripheralsR.getByPrice(price);
    }

    public List<Peripherals> getByDescriptionContains(String description){
        return peripheralsR.getByDescriptionContains(description);
    }

    public List<Peripherals> getByReference(String name){
        return peripheralsR.getByReference(name);
    }

    public List<Peripherals> gerByCategory(String category){
        return peripheralsR.getByCategory(category);
    }
}

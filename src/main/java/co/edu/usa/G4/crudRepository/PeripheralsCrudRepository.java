package co.edu.usa.G4.crudRepository;

import co.edu.usa.G4.model.Peripherals;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Luis Felipe Linares Perdomo
 */
public interface PeripheralsCrudRepository extends MongoRepository<Peripherals, String> {
    public List<Peripherals> findByPriceLessThanEqual(double price);
    public List<Peripherals> findByDescriptionContainingIgnoreCase(String description);
    public List<Peripherals> findByReference(String name);
    public List<Peripherals> findByCategory(String category);
}

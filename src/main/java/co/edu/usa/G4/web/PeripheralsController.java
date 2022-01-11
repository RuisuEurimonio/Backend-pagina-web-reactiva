/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.G4.web;

import co.edu.usa.G4.model.Peripherals;
import co.edu.usa.G4.service.PeripheralsService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Usuario
 */
@RestController
@RequestMapping("api/peripherals")
@CrossOrigin("*")
public class PeripheralsController {

    @Autowired
    private PeripheralsService peripheralsS;

    @GetMapping("/all")
    public List<Peripherals> getAll() {
        return peripheralsS.getAll();
    }

    @GetMapping("/{reference}")
    public Optional<Peripherals> getPeripherals(@PathVariable("reference") String reference) {
        return peripheralsS.getPeripherals1(reference);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Peripherals create(@RequestBody Peripherals peripherals) {
        return peripheralsS.create(peripherals);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Peripherals update(@RequestBody Peripherals peripherals) {
        System.out.println(peripherals);
        return peripheralsS.update(peripherals);
    }

    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") String reference) {
        return peripheralsS.delete(reference);
    }

    @GetMapping("/price/{price}")
    public List<Peripherals> findBypRICE(@PathVariable("price")double price){
        return peripheralsS.getByPrice(price);
    }

    @GetMapping("/description/{description}")
    public List<Peripherals> findByDescriptionContains(@PathVariable ("description")String description){
        return peripheralsS.getByDescriptionContains(description);
    }

    @GetMapping("/name/{name}")
    public List<Peripherals> getByReference(@PathVariable ("name")String name){
        return peripheralsS.getByReference(name);
    }

    @GetMapping("/category/{category}")
    public List<Peripherals> getByCategory(@PathVariable("category")String category){
        return peripheralsS.gerByCategory(category);
    }
}

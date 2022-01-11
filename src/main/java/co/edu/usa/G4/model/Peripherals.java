/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.G4.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Usuario
 */
@Document(collection = "peripherals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Peripherals{

    @Id
    private String reference;
    private String brand;
    private String category;
    private String description;
    private double price;
    private boolean availability = true;
    private int quantity;
    private String photography;
}

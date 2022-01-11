/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.G4.crudRepository;

import co.edu.usa.G4.model.User;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Luis Felipe Linares Perdomo
 */

public interface UserCrudRepository extends MongoRepository<User, Integer>{
    
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email,String password);
    Optional<User> findTopByOrderByIdDesc();
    List<User> findByMonthBirthtDay(String month);
}

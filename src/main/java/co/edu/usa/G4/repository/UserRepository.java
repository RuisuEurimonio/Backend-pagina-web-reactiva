/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.G4.repository;

import co.edu.usa.G4.crudRepository.UserCrudRepository;
import co.edu.usa.G4.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Usuario
 */
@Repository
public class UserRepository {

    /**
     * Guardo en una variable las comunicacion que se va a tener con el crudRepository de user.
     */
    @Autowired
    private UserCrudRepository userCR;

    /**
     * Metodo para obtener una lista de todos los usuarios en la base de datos.
     * @return lista de usuarios
     */
    public List<User> getAll() {
        return userCR.findAll();
    }

    /**
     * Metodo que sirve para obtener un usuario en especifico por medio de una id.
     * @param idUser
     * @return User
     */
    public Optional<User> getUser(int idUser) {
        return userCR.findById(idUser);
    }

    /**
     * Metodo que sirve para crear un nuevo usuario por medio de un usuario
     * @param user
     * @return metodo de creacion de usuario
     */
    public User create(User user) {
        return userCR.save(user);
    }

    /**
     * Metodo que sirve para actualizar a un usuario por medio de un usuario.
     * @param user
     */
    public void update(User user) {
        userCR.save(user);
    }

    /**
     * Metodo que sirve para eliminar a un usuario por medio de su usuario.
     * @param user
     */
    public void delete(User user) {
        userCR.delete(user);
    }

    /**
     * Metodo que sirve para validar si un correo ya existe en la base de datos.
     * @param email
     * @return Boolean.
     */
    public boolean emailExists(String email) {
        Optional<User> usuario = userCR.findByEmail(email);
        
        return !usuario.isEmpty();
    }

    /**
     * Metodo que sirve para autentificar un inicio de sesion recibiendo un email y una contraseña
     * @param email
     * @param password
     * @return datos del usuario relacionado
     */
    public Optional<User> authenticateUser(String email, String password) {
        return userCR.findByEmailAndPassword(email, password);
    }

    /**
     *Metodo que sirve para encontrar el ultimo id registrado en la base de datos de un usuario
     * @return ultimo id
     */
    public Optional<User> lastUserId(){
           return userCR.findTopByOrderByIdDesc();
    }

    /**
     * Metodo que sirve para consultar una lista de usuarios por medio de su mes de cumpleaños.
     * @param month
     * @return lista de usuarios
     */
    public List<User> getByMonthBirthDay(String month){
           return userCR.findByMonthBirthtDay(month);
    }
}

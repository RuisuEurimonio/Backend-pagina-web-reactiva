/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.G4.service;

import co.edu.usa.G4.model.User;
import co.edu.usa.G4.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Esta capa se encarga de gestionar la logica del servicio de los usuarios, comunicandose con el repositorio
 * y recibiendo informacion del controlador.
 * @author Luis Felipe Linares Perdomo
 */
@Service
public class UserService {

    /**
     * Se guarda en una variable la comunicacion que va a tener con el repositorio del usuario.
     */
    @Autowired
    private UserRepository userR;

    /**
     * Metodo que sirve para recibir todos los usuarios registrados en la base de datos.
     * @return Metodo para la lista de usuarios.
     */
    public List<User> getAll() {
        return userR.getAll();
    }

    /**
     * Metodo que sirve para recibir un usuario en especifico de la base de datos por medio del id
     * @param id
     * @return Metodo para obtener un usuario.
     */
    public Optional<User> getUser(int idUser) {
        return userR.getUser(idUser);
    }

    /**
     * Metodo que sirve para crear un nuevo usuario y se asigna su id en base a los ya registrados en caso de no
     * venir con uno ya especificado.
     * @param user
     * @return Metodo de creacion de un usuario.
     */
    public User create(User user){
        Optional<User> userIdMax = userR.lastUserId();
        if(user.getId() == null ){
            if(userIdMax.isEmpty()){
                user.setId(1);
            } else {
                user.setId(userIdMax.get().getId() + 1);
            }
        }

        Optional<User> userNew = userR.getUser(user.getId());
        if(userNew.isEmpty()){
            if(emailExists(user.getEmail()) == false){
                return userR.create(user);
            } else {
                return user;
            }
        } else {
            return user;
        }
    }

    /**
     * Metodo que sirve para actualizar al usuario ingresado por un body, donde se valida cada campo.
     * @param user
     * @return Metodo de actualizacion de usuario.
     */
    public User update(User user) {
        System.out.println("User - service 1 de 14");
        if (user.getId() != null) {
            System.out.println("User - service 2 de 14");
            Optional<User> userDb = userR.getUser(user.getId());
            if (!userDb.isEmpty()) {
                System.out.println("User - service 3 de 14");
                if (user.getIdentification() != null) {
                    userDb.get().setIdentification(user.getIdentification());
                    System.out.println("User - service 4 de 14");
                }
                if (user.getName() != null) {
                    userDb.get().setName(user.getName());
                    System.out.println("User - service 5 de 14");
                }
                if (user.getAddress() != null) {
                    userDb.get().setAddress(user.getAddress());
                    System.out.println("User - service 6 de  14");
                }
                if (user.getCellPhone() != null) {
                    userDb.get().setCellPhone(user.getCellPhone());
                    System.out.println("User - service 7 de 14");
                }
                if (user.getEmail() != null) {
                    userDb.get().setEmail(user.getEmail());
                    System.out.println("User - service 8 de 14");
                }
                if (user.getPassword() != null) {
                    userDb.get().setPassword(user.getPassword());
                    System.out.println("User - service 9 de 14");
                }
                if (user.getZone() != null) {
                    userDb.get().setZone(user.getZone());
                    System.out.println("User - service 10 de 14");
                }
                if (user.getType() != null) {
                    userDb.get().setType(user.getType());
                    System.out.println("User - service 11 de 14");
                }
                if (user.getBirthtDay() != null ){
                    userDb.get().setBirthtDay(user.getBirthtDay());
                    System.out.println("User - service 12 de 14");
                }
                if (user.getMonthBirthtDay() != null){
                    userDb.get().setMonthBirthtDay(user.getMonthBirthtDay());
                    System.out.println("User - service 13 de 14");
                }

                System.out.println("User - service 14 de 14");
                userR.update(userDb.get());
                return userDb.get();
            } else {
                System.out.println("User - service ELSE");
                return user;
            }
        } else {
            return user;
        }
    }

    /**
     * Metodo que sirve para eliminar un usuario teniendo en cuenta su id
     * @param userId
     * @return  Metodo para la eliminacion de un usuario.
     */
    public boolean delete(int userId) {
        Boolean aBoolean = getUser(userId).map(user -> {
            userR.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    /**
     * Metodo que sirve para consultar la existencia de un correo, si existe devuelte true.
     * @param email
     * @return Metodo de consulta de email, true or false.
     */
    public boolean emailExists(String email) {
        return userR.emailExists(email);
    }

    /**
     * Metodo que sirve para consultar un usuario en base a su email y contraseña, en caso de ser incorrectas
     * o no existir devuelve null
     * @param email
     * @param password
     * @return  Metodo de consulta por email y password
     */
    public User authenticateUser(String email, String password) {
        Optional<User> usuario = userR.authenticateUser(email, password);

        if (usuario.isEmpty()) {
            return new User();
        } else {
            return usuario.get();
        }
    }

    /**
     * Metodo que sirve para obtener a una lista de usuarios por medio de su mes de cumpleaños.
     * @param month
     * @return lista de usuarios
     */
    public List<User> getByMonthBirthtDay(String month){
        return userR.getByMonthBirthDay(month);
    }
}

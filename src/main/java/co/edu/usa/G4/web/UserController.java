/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.G4.web;

import co.edu.usa.G4.model.User;
import co.edu.usa.G4.service.UserService;
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
 * Clase que se encarga de recibir mediante api los pedidos del fronte end, es la puerta a la base de datos.
 * @author Luis Felipe Linares Perdomo.
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    /**
     * Creo una variable para poder comunicarme con la capa del servicio de usuarios.
     */
    @Autowired
    private UserService userS;

    /**
     * Metodo para poder obtener todos los usuarios de la base de datos,
     * @return lista de usuarios.
     */
    @GetMapping("/all")
    public List<User> getAll() {
        return userS.getAll();
    }

    /**
     * Metodo para poder obtener un solo usuario por medio de su ip
     * @param codigo
     * @return usuario
     */
    @GetMapping("/{codigo}")
    public Optional <User> getUser(@PathVariable("codigo") int codigo) {
        return userS.getUser(codigo);
    }

    /**
     * Metodo para crear un nuevo usuario con la informacion de un usuario creado por body.
     * @param user
     * @return metodo de creacion usuario.
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user) {
        return userS.create(user);
    }

    /**
     * Metodo para actualizar un usuario recibiendo un usuario creado por body.
     * @param user
     * @return metodo de actualizacion de usuario.
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user) {
        return userS.update(user);
    }

    /**
     * Metodo para eliminar a un usuario recibiendo un id de la url
     * @param codigo
     * @return metodo de elminiacion de usuario.
     */
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("codigo") int codigo) {
        return userS.delete(codigo);
    }

    /**
     * Metodo para validar usuarios por medio del correo y contraseña, recibiendolos por medio de la url
     * @param email
     * @param password
     * @return usuario consultado.
     */
    @GetMapping("/{email}/{password}")
    public User authenticateUser(@PathVariable("email") String email, @PathVariable("password") String password) {
        return userS.authenticateUser(email, password);
    }

    /**
     * Metodo para validar la existencia de un correo por medio de la informacion de la url
     * @param email
     * @return True o false
     */
    @GetMapping("/emailexist/{email}")
    public boolean emailExists(@PathVariable("email") String email) {
        return userS.emailExists(email);
    }

    @GetMapping("/birthday/{month}")
    public List<User> getMonthBirthDay(@PathVariable("month")String month){
        return userS.getByMonthBirthtDay(month);
    }
}

package co.edu.usa.G4.web;

import co.edu.usa.G4.model.Order;
import co.edu.usa.G4.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class orderController {
    @Autowired
    private OrderService orderS;

    @GetMapping("/all")
    public List<Order> getAll(){
        return orderS.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Order> getOrder(@PathVariable("id") int id){
        return orderS.getOrder(id);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order create(@RequestBody Order order){
        return orderS.create(order);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order order){
        System.out.println("order Update 1-1");
        return orderS.update(order);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id ){
        return orderS.delete(id);
    }

    @GetMapping("/zona/{zona}")
    public List<Order> findByZone(@PathVariable("zona") String zone){
        return orderS.findByZone(zone);
    }

    @GetMapping("/salesman/{id}")
    public List<Order> ordersSalesManById(@PathVariable("id") Integer id){
        return orderS.ordersSalesManById(id);
    }

    @GetMapping("/state/{state}/{id}")
    public List<Order> ordersSalesManByState(@PathVariable("state")String state, @PathVariable("id") Integer id ){
        return orderS.ordersSalesManByState(state, id);
    }

    @GetMapping("/date/{date}/{id}")
    public List<Order> ordersSalesManByDate(@PathVariable("date")String dateStr, @PathVariable("id")Integer id ){
        return orderS.ordersSalesManByDate(dateStr, id);
    }
}

package co.edu.usa.G4.service;

import co.edu.usa.G4.model.Order;
import co.edu.usa.G4.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderR;

    public List<Order> getAll(){
        return (List<Order>) orderR.getAll();
    }

    public Optional<Order> getOrder(int id){
        return orderR.getOrder(id);
    }

    public Order create(Order order){
        Optional<Order> orderIdMax = orderR.lastOrderId();
        if(order.getId() == null){
            if(orderIdMax.isEmpty()){
                order.setId(1);
            } else {
                order.setId(orderIdMax.get().getId() + 1);
            }
        }
        Optional<Order> orderNew = orderR.getOrder(order.getId());
        if(orderNew.isEmpty()){
            return orderR.create(order);
        } else {
            return order;
        }
    }

    public Order update(Order order) {
        System.out.println("order Service 1 de 5");
        if (order.getId() != null) {
            System.out.println("order Service 2 de 5");
            Optional<Order> orderDb = orderR.getOrder(order.getId());
            if (!orderDb.isEmpty()) {
                System.out.println("order Service 3 de 5");
                if (order.getStatus() != null) {
                    System.out.println("order Service 4 de 5");
                    orderDb.get().setStatus(order.getStatus());
                }
                System.out.println("order Service 5 de 5");
                orderR.update(orderDb.get());
                return orderDb.get();
            } else {
                System.out.println("order Service Else 2");
                return order;
            }
        } else {
            System.out.println("order Service Else2");
            return order;
        }
    }

    public boolean delete(int id){
        Boolean dBoolean = getOrder(id).map(order -> {
            orderR.delete(order);;
            return true;
        }).orElse(false);
        return false;
    }

    public List<Order> findByZone(String zone){
        return orderR.findByZone(zone);
    }

    public List<Order> ordersSalesManById(Integer id){
        return orderR.ordersSalesManById(id);
    }

    public List<Order> ordersSalesManByState(String state, int id){
        return orderR.ordersSalesManByState(state, id);
    }

    public List<Order> ordersSalesManByDate(String dateStr, int id){
        return orderR.ordersSalesManByDate(dateStr, id);
    }

}

package co.edu.usa.G4.repository;

import co.edu.usa.G4.crudRepository.OrderCrudRepository;
import co.edu.usa.G4.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Repository
public class OrderRepository {
    @Autowired
    private OrderCrudRepository orderCR;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Order> getAll(){
        return (List<Order>) orderCR.findAll();
    }

    public Optional<Order> getOrder(int id){
        return orderCR.findById(id);
    }

    public Order create(Order order){
        return orderCR.save(order);
    }

    public void update(Order order){
        orderCR.save(order);
    }

    public void delete(Order order){
        orderCR.delete(order);
    }

    public Optional<Order> lastOrderId(){
        return orderCR.findTopByOrderByIdDesc();
    }

    public List<Order> findByZone(String zone){
        return orderCR.findByZone(zone);
    }

    public List<Order> ordersSalesManById(Integer id){
        Query query = new Query();

        Criteria criterio = Criteria.where("salesMan.id").is(id);
        query.addCriteria(criterio);

        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }

    public List<Order> ordersSalesManByState(String state, Integer id){
        Query query = new Query();
        Criteria criterio = Criteria.where("salesMan.id").is(id)
                .and("status").is(state);

        query.addCriteria(criterio);

        List<Order> orders = mongoTemplate.find(query,Order.class);

        return orders;
    }

    public List<Order> ordersSalesManByDate(String dateStr, Integer id){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Query query = new Query();

        Criteria dateCriteria = Criteria.where("registerDay")
                .gte(LocalDate.parse(dateStr, dtf).minusDays(1).atStartOfDay())
                .lt(LocalDate.parse(dateStr, dtf).plusDays(1).atStartOfDay())
                .and("salesMan.id").is(id);

        query.addCriteria(dateCriteria);

        List<Order> orders = mongoTemplate.find(query,Order.class);

        return orders;
    }
}

package co.edu.usa.G4;

import co.edu.usa.G4.crudRepository.OrderCrudRepository;
import co.edu.usa.G4.crudRepository.PeripheralsCrudRepository;
import co.edu.usa.G4.crudRepository.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

@Component
@SpringBootApplication
public class G4Application implements CommandLineRunner {

        @Autowired
        private PeripheralsCrudRepository periphericalsCR;
        @Autowired
        private UserCrudRepository userCR;
        @Autowired
        private OrderCrudRepository orderCR;
        
	public static void main(String[] args) {
		SpringApplication.run(G4Application.class, args);
                
                System.out.println("Ejecutando.");
	}
            
        @Override
        public void run(String... args) throws Exception {
            periphericalsCR.deleteAll();
            userCR.deleteAll();
            orderCR.deleteAll();
        }
    
}

package com.example.demo;

import com.example.demo.models.User;
import com.example.demo.models.UserRepository;
import org.junit.jupiter.api.Test;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void contextLoads() {
        createUser();
    }
    
    private void createUser() {
        String password = "123456";
        String salt = BCrypt.gensalt();
        String passwordHash = BCrypt.hashpw(password, salt);
        User user = new User().setName("admin").setPasswordHash(passwordHash);
        userRepository.save(user);
    }
}

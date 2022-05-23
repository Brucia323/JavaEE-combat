package com.example.demo.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.example.demo.models.*;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.demo.utils.MiddleWare.getTokenFrom;

@RestController
@RequestMapping("/api/user")
public class Users extends Cors {
    @Resource
    private UserRepository userRepository;
    @Resource
    private HealthRepository healthRepository;
    @Resource
    private JourneyRepository journeyRepository;
    @Resource
    private VaccineRepository vaccineRepository;
    
    @GetMapping()
    public ResponseEntity<Object> getUserList(@RequestHeader("authorization") String authorization) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        List<User> users = userRepository.findAll();
        return ResponseEntity.status(200).body(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUser(@RequestHeader("authorization") String authorization, @PathVariable("id") int id) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        User user = userRepository.getById(id);
        List<Health> healthList = healthRepository.findByUser(user);
        List<Journey> journeyList = journeyRepository.findByUser(user);
        List<Vaccine> vaccineList = vaccineRepository.findByUser(user);
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("health", healthList);
        response.put("journey", journeyList);
        response.put("vaccine", vaccineList);
        return ResponseEntity.status(200).body(response);
    }
    
    @PostMapping()
    public ResponseEntity<Object> createUser(@RequestHeader("authorization") String authorization, @RequestBody Map<String, ?> body) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        String password = (String) body.get("password");
        String salt = BCrypt.gensalt();
        String passwordHash = BCrypt.hashpw(password, salt);
        User user = new User().setPasswordHash(passwordHash).setName((String) body.get(
                "username")).setAccount((String) body.get("account"));
        userRepository.saveAndFlush(user);
        return ResponseEntity.status(201).body(user);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@RequestHeader("authorization") String authorization, @RequestBody Map<String, ?> body, @PathVariable("id") int id) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        String password = (String) body.get("password");
        User user = userRepository.getById(id);
        boolean passwordCorrect = BCrypt.checkpw(password, user.getPasswordHash());
        if (passwordCorrect) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "旧密码和新密码相同");
            return ResponseEntity.status(400).body(response);
        }
        String salt = BCrypt.gensalt();
        String passwordHash = BCrypt.hashpw(password, salt);
        user.setPasswordHash(passwordHash);
        userRepository.save(user);
        return ResponseEntity.status(200).build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@RequestHeader("authorization") String authorization, @PathVariable("id") int id) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        userRepository.deleteById(id);
        return ResponseEntity.status(204).build();
    }
}

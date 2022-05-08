package com.example.demo.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.example.demo.models.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.demo.utils.MiddleWare.getTokenFrom;

@RestController
@RequestMapping("/api/health")
public class Healths extends Cors {
    @Resource
    private HealthRepository healthRepository;
    @Resource
    private UserRepository userRepository;
    
    @GetMapping()
    public ResponseEntity<Object> getHealthList(@RequestHeader("authorization") String authorization) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        List<Health> healthList = healthRepository.findAll();
        return ResponseEntity.status(200).body(healthList);
    }
    
    @PostMapping()
    public ResponseEntity<Object> createHealth(@RequestHeader("authorization") String authorization, @RequestBody Map<String, ?> body) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        int userid = decodedToken.get("id").asInt();
        User user = userRepository.getById(userid);
        user.setHealthState((boolean) body.get("healthState"));
        userRepository.save(user);
        Health health = new Health().setUser(user).setHealthState((boolean) body.get(
                "healthState")).setTime(LocalDateTime.now());
        healthRepository.saveAndFlush(health);
        return ResponseEntity.status(201).body(health);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateHealth(@RequestHeader("authorization") String authorization, @RequestBody Map<String, ?> body, @PathVariable("id") int id) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        int userid = decodedToken.get("id").asInt();
        Health health = healthRepository.getById(id);
        if (userid == health.getUser().getId()) {
            health.setHealthState((boolean) body.get("healthState"));
            healthRepository.save(health);
            return ResponseEntity.status(200).body(health);
        }
        return ResponseEntity.status(403).build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteHealth(@RequestHeader("authorization") String authorization, @PathVariable("id") int id) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        int userid = decodedToken.get("id").asInt();
        Health health = healthRepository.getById(id);
        if (userid == health.getUser().getId()) {
            healthRepository.deleteById(id);
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(403).build();
    }
    
    @GetMapping("/count")
    public ResponseEntity<Object> getEpidemic(@RequestHeader("authorization") String authorization) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        Object[][] epidemics = healthRepository.countHealthState();
        Map<String,Object> map=new HashMap<>();
        List<Map<String,Object>> list=new ArrayList<>();
        for (Object[] epidemic:epidemics){
            map.put("date",epidemic[0]);
            map.put("healthState",epidemic[1]);
            map.put("count",epidemic[2]);
            list.add(map);
        }
        return ResponseEntity.status(200).body(list);
    }
}

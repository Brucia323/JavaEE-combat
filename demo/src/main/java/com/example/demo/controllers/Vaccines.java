package com.example.demo.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.example.demo.models.User;
import com.example.demo.models.UserRepository;
import com.example.demo.models.Vaccine;
import com.example.demo.models.VaccineRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.demo.utils.MiddleWare.getTokenFrom;

@RestController
@RequestMapping("/api/vaccine")
public class Vaccines extends Cors {
    @Resource
    private VaccineRepository vaccineRepository;
    @Resource
    private UserRepository userRepository;
    
    @GetMapping()
    public ResponseEntity<Object> getVaccineList(@RequestHeader(
            "authorization") String authorization) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        List<Vaccine> vaccineList = vaccineRepository.findAll();
        return ResponseEntity.status(200).body(vaccineList);
    }
    
    @PostMapping()
    public ResponseEntity<Object> createVaccine(@RequestHeader("authorization") String authorization, @RequestBody Map<String, ?> body) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        int userid = decodedToken.get("id").asInt();
        User user = userRepository.getById(userid);
        System.out.println(body.toString());
        Vaccine vaccine = new Vaccine()
                .setName((String) body.get("name"))
                .setNeedle((int) body.get("needle"))
                .setTime(LocalDateTime.now())
                .setUser(user);
        vaccineRepository.saveAndFlush(vaccine);
        return ResponseEntity.status(201).body(vaccine);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateVaccine(@RequestHeader("authorization") String authorization, @PathVariable("id") int id, @RequestBody Map<String, ?> body) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        int userid = decodedToken.get("id").asInt();
        Vaccine vaccine = vaccineRepository.getById(id);
        if (userid == vaccine.getUser().getId()) {
            vaccine.setName((String) body.get("name")).setNeedle((int) body.get(
                    "needle"));
            vaccineRepository.save(vaccine);
            return ResponseEntity.status(200).body(vaccine);
        }
        return ResponseEntity.status(403).build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteVaccine(@RequestHeader("authorization") String authorization, @PathVariable("id") int id) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        int userid = decodedToken.get("id").asInt();
        Vaccine vaccine = vaccineRepository.getById(id);
        if (userid == vaccine.getUser().getId()) {
            vaccineRepository.deleteById(id);
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(403).build();
    }
}

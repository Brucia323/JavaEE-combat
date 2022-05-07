package com.example.demo.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.example.demo.models.Journey;
import com.example.demo.models.JourneyRepository;
import com.example.demo.models.User;
import com.example.demo.models.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.demo.utils.MiddleWare.getTokenFrom;

@RestController
@RequestMapping("/api/journey")
public class Journeys extends Cors {
    @Resource
    private JourneyRepository journeyRepository;
    @Resource
    private UserRepository userRepository;
    
    @GetMapping()
    public ResponseEntity<Object> getJourneyList(@RequestHeader(
            "authorization") String authorization) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        List<Journey> journeyList = journeyRepository.findAll();
        return ResponseEntity.status(200).body(journeyList);
    }
    
    @PostMapping()
    public ResponseEntity<Object> createJourney(@RequestHeader("authorization") String authorization, @RequestBody Map<String, ?> body) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        int userid = decodedToken.get("id").asInt();
        User user = userRepository.getById(userid);
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy" +
                "-MM-dd'T'HH:mm:ss.SSS'Z'");
        Journey journey = new Journey()
                .setUser(user)
                .setLocation((String) body.get("location"))
                .setStartTime(LocalDateTime.parse((CharSequence) body.get(
                        "startTime"), dateTimeFormatter))
                .setEndTime(LocalDateTime.parse((CharSequence) body.get(
                        "endTime"), dateTimeFormatter))
                .setMore((String) body.get("more"));
        journeyRepository.saveAndFlush(journey);
        return ResponseEntity.status(201).body(journey);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateJourney(@RequestHeader("authorization") String authorization, @RequestBody Map<String, ?> body, @PathVariable("id") int id) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        int userid = decodedToken.get("id").asInt();
        Journey journey = journeyRepository.getById(id);
        if (userid == journey.getUser().getId()) {
            journey.setLocation((String) body.get("location")).setMore((String) body.get("more"));
            journeyRepository.save(journey);
            return ResponseEntity.status(200).body(journey);
        }
        return ResponseEntity.status(403).build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteJourney(@RequestHeader("authorization") String authorization, @PathVariable("id") int id) {
        String token = getTokenFrom(authorization);
        Map<String, Claim> decodedToken = JWT.decode(token).getClaims();
        if (decodedToken.get("id").asInt() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "token丢失或无效");
            return ResponseEntity.status(401).body(response);
        }
        int userid = decodedToken.get("id").asInt();
        Journey journey = journeyRepository.getById(id);
        if (userid == journey.getUser().getId()) {
            journeyRepository.deleteById(id);
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(403).build();
    }
}

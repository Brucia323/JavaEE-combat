package com.example.demo.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.models.User;
import com.example.demo.models.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class Login {
    @Resource
    Environment env;
    @Resource
    private UserRepository userRepository;
    
    @PostMapping()
    public ResponseEntity<Object> login(@RequestBody Map<String, ?> body) {
        String username = (String) body.get("username");
        String password = (String) body.get("password");
        User user = userRepository.findByName(username);
        boolean passwordCorrect = BCrypt.checkpw(password,
                user.getPasswordHash());
        if (!passwordCorrect) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "无效的用户名或密码");
            return ResponseEntity.status(401).body(response);
        }
        String token = JWT.create().withClaim("id", user.getId()).withClaim(
                "username", user.getName()).sign(Algorithm.HMAC256(env.getProperty("SECRET")));
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("id", user.getId());
        response.put("username", user.getName());
        return ResponseEntity.status(200).body(response);
    }
}

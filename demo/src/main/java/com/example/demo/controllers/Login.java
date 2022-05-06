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
@RequestMapping("/api/login")
public class Login extends Cors {
    @Resource
    Environment env;
    @Resource
    private UserRepository userRepository;
    
    @PostMapping()
    public ResponseEntity<Object> login(@RequestBody Map<String, ?> body) {
        String account = (String) body.get("account");
        String password = (String) body.get("password");
        User user = userRepository.findByAccount(account);
        boolean passwordCorrect = BCrypt.checkpw(password,
                user.getPasswordHash());
        if (!passwordCorrect) {
            Map<String, String> response = new HashMap<>();
            response.put("错误", "无效的账号或密码");
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

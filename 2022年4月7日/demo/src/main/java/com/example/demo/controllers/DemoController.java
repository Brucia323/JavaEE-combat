package com.example.demo.controllers;

import java.util.List;

import com.example.demo.models.Demo;
import com.example.demo.utils.mapper.DemoMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/demo")
public class DemoController {
    @Resource
    private DemoMapper demoMapper;

    @GetMapping()
    public ResponseEntity<List<Demo>> getDemo() {
        List<Demo> demos = demoMapper.selectList(null);
        return ResponseEntity.status(200).body(demos);
    }

    @PostMapping()
    public ResponseEntity<Demo> createDemo(@RequestBody Demo demo) {
        demoMapper.insert(demo);
        return ResponseEntity.status(201).body(demo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Demo> updateDemo(@PathVariable("id") int id, @RequestBody Demo demo) {
        demoMapper.updateById(demo);
        return ResponseEntity.status(200).body(demo);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemo(@PathVariable("id") int id) {
        demoMapper.deleteById(id);
        return ResponseEntity.status(204).build();
    }
}

package com.zcy.controller;

import java.io.File;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class files {
    @PostMapping("/api/file")
    public ResponseEntity<Object> upload(@RequestParam("file") MultipartFile file) {
        Object status = "error";
        String fileName = file.getOriginalFilename();
        String filePath = "C:/Users/ZZZCNY/Documents/GitHub/JavaEE-combat/2022年3月21日/demo/src/main/resources/static/";
        fileName = filePath + UUID.randomUUID() + fileName;
        File file2 = new File(fileName);
        if (!file2.getParentFile().exists()) {
            file2.getParentFile().mkdirs();
        }
        try {
            file.transferTo(file2);
            status = "success";
            return ResponseEntity.status(201).body(status);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(422).body(status);
    }
}

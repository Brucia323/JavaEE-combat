package com.example.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthRepository extends JpaRepository<Health, Integer> {
    List<Health> findByUser(User user);
}

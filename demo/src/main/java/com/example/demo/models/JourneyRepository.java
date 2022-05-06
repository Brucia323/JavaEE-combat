package com.example.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JourneyRepository extends JpaRepository<Journey, Integer> {
    List<Journey> findByUser(User user);
}

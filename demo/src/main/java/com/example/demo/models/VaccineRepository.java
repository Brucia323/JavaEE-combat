package com.example.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VaccineRepository extends JpaRepository<Vaccine, Integer> {
    List<Vaccine> findByUser(User user);
}

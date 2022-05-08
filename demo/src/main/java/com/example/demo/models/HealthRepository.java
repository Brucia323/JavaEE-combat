package com.example.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HealthRepository extends JpaRepository<Health, Integer> {
    List<Health> findByUser(User user);
    @Query(value = "select date(time) date, health_state, count(*) count from health group by date(time), health_state order by date(time)",nativeQuery = true)
    Object[][] countHealthState();
}

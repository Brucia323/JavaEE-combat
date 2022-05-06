package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@JsonIgnoreProperties(value = {"hibernateLazyInitializer"})
public class User {
    @Id
    @GeneratedValue
    private int id;
    @Column(unique = true,nullable = false)
    private String account;
    private String name;
    @JsonIgnore
    @Column(nullable = false)
    private String passwordHash;
    private boolean healthState;
}

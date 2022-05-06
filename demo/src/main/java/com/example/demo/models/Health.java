package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@JsonIgnoreProperties(value = {"hibernateLazyInitializer"})
public class Health {
    @Id
    @GeneratedValue
    private int id;
    private boolean healthState;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDateTime time;
}

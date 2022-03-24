package com.demo.schedule;

import java.util.Date;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTask {
    @Scheduled(fixedRate = 5000)
    public void run() {
        System.out.println(new Date());
    }
}

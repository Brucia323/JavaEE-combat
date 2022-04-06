package com.demo;

import com.alibaba.druid.pool.DruidDataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DruidDataSource dataSource() {
        return new DruidDataSource();
    }
}

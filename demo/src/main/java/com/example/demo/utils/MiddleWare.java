package com.example.demo.utils;

public class MiddleWare {
    public static String getTokenFrom(String authorization) {
        if (authorization != null && authorization.toLowerCase().startsWith(
                "bearer ")) {
            return authorization.substring(7);
        }
        return null;
    }
}

package com.example.online_assessment_backend.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptGenerator {
  public static void main(String[] args) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    System.out.println(encoder.encode("a2"));
    System.out.println(encoder.encode("vs3"));
    System.out.println(encoder.encode("am"));
  }
}
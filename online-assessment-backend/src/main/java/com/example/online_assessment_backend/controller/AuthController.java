package com.example.online_assessment_backend.controller;

import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    // private final AuthService authService;

    // // REGISTER
    // @PostMapping("/register")
    // public String register(@Valid @RequestBody RegisterRequest request) {
    //     return authService.register(request);
    // }

    // // LOGIN
    // @PostMapping("/login")
    // public String login(@RequestBody LoginRequest request) {
    //     return authService.login(request);
    // }

    @GetMapping("/me")
    public Map<String, String> me(Authentication auth) {

        return Map.of(
                "username", auth.getName(),
                "role", auth.getAuthorities().iterator().next().getAuthority());
    }
}

package com.example.online_assessment_backend.dto;

import lombok.Data;

@Data
public class CreateUserRequest {

    private String fullName;
    private String username;
    private String mobile;
    private String password;
    private String role;

}
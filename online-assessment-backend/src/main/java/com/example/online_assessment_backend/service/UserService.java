package com.example.online_assessment_backend.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.online_assessment_backend.dto.CreateUserRequest;
import com.example.online_assessment_backend.entity.UserEntity;
import com.example.online_assessment_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public void createUser(CreateUserRequest request) {

        UserEntity user = new UserEntity();

        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setMobile(request.getMobile());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());
        user.setEnabled(true);

        userRepository.save(user);
    }

    public void toggleUser(Long id) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEnabled(!user.isEnabled());

        userRepository.save(user);
    }

    public void disableUser(Long id) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole().equals("ROLE_ADMIN")) {
            throw new RuntimeException("Admin cannot be disabled");
        }

        user.setEnabled(false);

        userRepository.save(user);
    }
}
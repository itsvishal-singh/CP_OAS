package com.example.online_assessment_backend.controller;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.online_assessment_backend.dto.CreateUserRequest;
import com.example.online_assessment_backend.entity.UserEntity;
import com.example.online_assessment_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  // GET ALL USERS
  @GetMapping
  public List<UserEntity> getUsers() {
    return userRepository.findAll();
  }

  // CREATE USER (Admin or Student)
  @PostMapping("/create")
  public String createUser(@RequestBody CreateUserRequest request) {

    UserEntity user = new UserEntity();

    user.setFullName(request.getFullName());
    user.setUsername(request.getUsername());
    user.setMobile(request.getMobile());

    user.setPassword(passwordEncoder.encode(request.getPassword()));

    user.setRole(request.getRole());

    user.setEnabled(true);

    userRepository.save(user);

    return "User created successfully";
  }

  // ENABLE / DISABLE USER
  @PutMapping("/{id}/toggle")
  public String toggleUser(@PathVariable Long id) {

    UserEntity user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setEnabled(!user.isEnabled());

    userRepository.save(user);

    return "User status updated";
  }

  // DELETE USER
  @DeleteMapping("/{id}")
  public String deleteUser(@PathVariable Long id) {

    UserEntity user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getRole().equals("ROLE_ADMIN")) {
      throw new RuntimeException("Admin accounts cannot be deleted");
    }

    user.setEnabled(false);

    userRepository.save(user);

    return "User disabled successfully";
  }
}
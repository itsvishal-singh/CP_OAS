package com.example.online_assessment_backend.controller;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.CreateUserRequest;
import com.example.online_assessment_backend.dto.RegisterRequest;
import com.example.online_assessment_backend.entity.UserEntity;
import com.example.online_assessment_backend.repository.UserRepository;
import com.example.online_assessment_backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

  private final UserService userService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @GetMapping
  public List<UserEntity> getUsers() {
    return userService.getAllUsers();
  }

  @PostMapping("/create")
  public String createUser(@RequestBody CreateUserRequest request) {

    userService.createUser(request);

    return "User created successfully";
  }

  @PutMapping("/{id}/toggle")
  public String toggleUser(@PathVariable Long id) {

    userService.toggleUser(id);

    return "User status updated";
  }

  @DeleteMapping("/{id}")
  public String deleteUser(@PathVariable Long id) {

    userService.disableUser(id);

    return "User disabled successfully";
  }

  @PutMapping("/{id}/update")
  public String updateUser(@PathVariable Long id, @RequestBody RegisterRequest request) {

    UserEntity user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setFullName(request.getFullName());
    user.setMobile(request.getMobile());

    if (request.getPassword() != null && !request.getPassword().isEmpty()) {
      user.setPassword(passwordEncoder.encode(request.getPassword()));
    }

    userRepository.save(user);

    return "User updated successfully";
  }

}
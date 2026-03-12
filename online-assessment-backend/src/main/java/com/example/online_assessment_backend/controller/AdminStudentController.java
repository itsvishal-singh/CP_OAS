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

import com.example.online_assessment_backend.dto.RegisterRequest;
import com.example.online_assessment_backend.entity.UserEntity;
import com.example.online_assessment_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/students")
@RequiredArgsConstructor
public class AdminStudentController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @GetMapping
  public List<UserEntity> getAllStudents() {
    return userRepository.findByRole("ROLE_STUDENT");
  }

  @DeleteMapping("/{id}")
  public String deleteStudent(@PathVariable Long id) {

    UserEntity user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setEnabled(!user.isEnabled());

    userRepository.save(user);

    return "Student disabled successfully";
  }

  @PutMapping("/{id}/toggle")
  public String toggleStudent(@PathVariable Long id) {

    UserEntity user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));
    user.setEnabled(!user.isEnabled());

    userRepository.save(user);

    return "Student status updated";
  }

  @PostMapping("/create")
  public String createStudent(@RequestBody RegisterRequest request) {

    UserEntity user = new UserEntity();

    user.setFullName(request.getFullName());
    user.setUsername(request.getUsername());
    user.setMobile(request.getMobile());

    user.setPassword(passwordEncoder.encode(request.getPassword()));

    user.setRole("ROLE_STUDENT");
    user.setEnabled(true);

    userRepository.save(user);

    return "Student created successfully";
  }
}
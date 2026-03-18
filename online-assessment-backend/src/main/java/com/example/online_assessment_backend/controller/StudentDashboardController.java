
package com.example.online_assessment_backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.StudentDashboardResponse;
import com.example.online_assessment_backend.entity.UserEntity;
import com.example.online_assessment_backend.repository.UserRepository;
import com.example.online_assessment_backend.service.ExamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentDashboardController {

  private final ExamService examService;
  private final UserRepository userRepository;

  @GetMapping("/dashboard")
  public StudentDashboardResponse dashboard(
      Authentication auth) {

    return examService
        .getStudentDashboard(auth.getName());
  }

  @GetMapping("/profile")
  public UserEntity getProfile(Authentication auth) {
    return userRepository.findByUsername(auth.getName())
        .orElseThrow(() -> new RuntimeException("User not found"));
  }

  @PutMapping("/profile")
  public UserEntity updateProfile(@RequestBody UserEntity updatedUser, Authentication auth) {

    UserEntity user = userRepository.findByUsername(auth.getName())
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setFullName(updatedUser.getFullName());
    user.setMobile(updatedUser.getMobile());

    return userRepository.save(user);
  }
  
}

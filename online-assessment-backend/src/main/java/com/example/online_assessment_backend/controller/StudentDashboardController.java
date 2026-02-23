
package com.example.online_assessment_backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.StudentDashboardResponse;
import com.example.online_assessment_backend.service.ExamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentDashboardController {

  private final ExamService examService;

  @GetMapping("/dashboard")
  public StudentDashboardResponse dashboard(
      Authentication auth) {

    return examService
        .getStudentDashboard(auth.getName());
  }
}
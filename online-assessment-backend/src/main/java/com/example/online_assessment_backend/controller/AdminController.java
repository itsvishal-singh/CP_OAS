package com.example.online_assessment_backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.AdminStatsResponse;
import com.example.online_assessment_backend.repository.ExamRepository;
import com.example.online_assessment_backend.repository.QuestionRepository;
import com.example.online_assessment_backend.repository.UserRepository;
import com.example.online_assessment_backend.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final ExamRepository examRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    @GetMapping("/stats")
    public AdminStatsResponse getStats() {
        return adminService.getDashboardStats();
    }

    @GetMapping("/admin/dashboard")
    public Map<String, Object> dashboard() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalExams", examRepository.count());
        data.put("totalStudents", userRepository.count());
        data.put("activeExams", examRepository.countByActiveTrue());
        data.put("totalQuestions", questionRepository.count());

        return data;
    }

}
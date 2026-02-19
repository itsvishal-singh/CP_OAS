package com.example.online_assessment_backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.StartExamResponse;
import com.example.online_assessment_backend.entity.ExamEntity;
import com.example.online_assessment_backend.service.ExamService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/api/student/exams")
@RequiredArgsConstructor
public class StudentExamController {

    private final ExamService examService;

    // ✅ Get all exams
    @GetMapping
    public List<ExamEntity> getExamsForStudent() {
        return examService.getAllExams();
    }

    // ✅ Start exam
    @PostMapping("/{examId}/start")
    public StartExamResponse startExam(
            @PathVariable Long examId,
            Authentication authentication) {

        String username = authentication.getName();

        return examService.startExam(examId, username);
    }
}

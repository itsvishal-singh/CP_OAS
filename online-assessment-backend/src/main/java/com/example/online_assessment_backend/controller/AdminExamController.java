package com.example.online_assessment_backend.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.service.ExamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/exams")
@RequiredArgsConstructor
public class AdminExamController {

    private final ExamService examService;

    @PostMapping("/{examId}/close")
    public String closeExam(@PathVariable Long examId) {
        return examService.closeExam(examId);
    }

    @PostMapping("/{examId}/reopen")
    public String reopenExam(@PathVariable Long examId) {
        return examService.reopenExam(examId);
    }
}
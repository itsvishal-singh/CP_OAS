package com.example.online_assessment_backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.CreateExamRequest;
import com.example.online_assessment_backend.service.ExamService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @PostMapping("/create")
    public String createExam(@Valid @RequestBody CreateExamRequest request) {
        return examService.createExam(request);
    }
}

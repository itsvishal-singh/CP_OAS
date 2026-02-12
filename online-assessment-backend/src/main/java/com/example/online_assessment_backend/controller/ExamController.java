package com.example.online_assessment_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.example.online_assessment_backend.dto.CreateExamRequest;
import com.example.online_assessment_backend.service.ExamService;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @PostMapping("/create")
    public String createExam(@Valid @RequestBody CreateExamRequest request) {
        return examService.createExam(request);
    }
}

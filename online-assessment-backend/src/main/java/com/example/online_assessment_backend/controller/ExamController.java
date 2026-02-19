package com.example.online_assessment_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.CreateExamRequest;
import com.example.online_assessment_backend.dto.ExamWithQuestionsResponse;
import com.example.online_assessment_backend.dto.SubmitExamRequest;
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

    @GetMapping("/{examId}")
    public ExamWithQuestionsResponse getExam(@PathVariable Long examId) {

        return examService.getExamWithQuestions(examId);
    }

    @PostMapping("/exams/submit")
    public ResponseEntity<?> submitExam(
            @RequestBody SubmitExamRequest request) {
        return ResponseEntity.ok(
                examService.submitExam(request));
    }

}

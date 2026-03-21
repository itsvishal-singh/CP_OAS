package com.example.online_assessment_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.ExamSessionResponse;
import com.example.online_assessment_backend.dto.ResultResponse;
import com.example.online_assessment_backend.dto.SubmitExamRequest;
import com.example.online_assessment_backend.entity.ExamAttemptEntity;
import com.example.online_assessment_backend.entity.ExamEntity;
import com.example.online_assessment_backend.service.ExamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentExamController {

    private final ExamService examService;

    // ✅ Get all exams
    @GetMapping("/exams")
    public List<ExamEntity> getExamsForStudent() {
        return examService.getAllExams();
    }

    @GetMapping("/exams/{examId}")
    public ResponseEntity<?> getExam(
            @PathVariable Long examId) {

        return ResponseEntity.ok(
                examService.getExamWithQuestions(examId));
    }

    // Start Session
    @GetMapping("/exams/{examId}/start-session")
    public ExamSessionResponse startSession(
            @PathVariable Long examId,
            Authentication authentication) {

        String username = authentication.getName();

        return examService.startExamSession(examId, username);
    }

    // ✅ Start exam
    @PostMapping("/exams/{examId}/start")
    public ExamSessionResponse startExam(
            @PathVariable Long examId,
            Authentication authentication) {

        String username = authentication.getName();

        return examService.startExamSession(examId, username);
    }

    @PostMapping("/exams/submit")
    public String submitExam(
            @RequestBody SubmitExamRequest request) {

        return examService.submitExam(request);
    }

    @GetMapping("/results")
    public List<ResultResponse> getMyResults(Authentication auth) {
        return examService.getMyResults(auth.getName());
    }

    @GetMapping("/results/{attemptId}")
    public ResponseEntity<ResultResponse> getResult(@PathVariable Long attemptId) {
        ResultResponse result = examService.getResultByAttemptId(attemptId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/attempts")
    public List<ExamAttemptEntity> getMyAttempts(Authentication authentication) {
        String username = authentication.getName();
        return examService.getMyAttempts(username);
    }
}

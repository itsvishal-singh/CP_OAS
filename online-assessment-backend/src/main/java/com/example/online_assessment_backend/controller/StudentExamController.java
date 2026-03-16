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
import com.example.online_assessment_backend.entity.ExamEntity;
import com.example.online_assessment_backend.entity.ResultEntity;
import com.example.online_assessment_backend.service.ExamService;
import com.example.online_assessment_backend.service.ResultService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/student/exams")
@RequiredArgsConstructor
public class StudentExamController {

    private final ExamService examService;
    private final ResultService resultService;

    // ✅ Get all exams
    @GetMapping
    public List<ExamEntity> getExamsForStudent() {
        return examService.getAllExams();
    }

    @GetMapping("/{examId}")
    public ResponseEntity<?> getExam(
            @PathVariable Long examId) {

        return ResponseEntity.ok(
                examService.getExamWithQuestions(examId));
    }

    // Start Session
    @GetMapping("/{examId}/start-session")
    public ExamSessionResponse startSession(
            @PathVariable Long examId,
            Authentication authentication) {

        String username = authentication.getName();

        return examService.startExamSession(examId, username);
    }

    // ✅ Start exam
    @PostMapping("/{examId}/start")
    public ExamSessionResponse startExam(
            @PathVariable Long examId,
            Authentication authentication) {

        String username = authentication.getName();

        return examService.startExamSession(examId, username);
    }

    @PostMapping("/submit")
    public String submitExam(
            @RequestBody SubmitExamRequest request) {

        return examService.submitExam(request);
    }

    @GetMapping("/results")
    public List<ResultResponse> getMyResults(Authentication auth) {

        return examService.getMyResults(auth.getName());
    }

    @GetMapping("/results/{attemptId}")
    public ResponseEntity<ResultEntity> getResult(@PathVariable Long attemptId) {
        ResultEntity result = resultService.getResultByAttemptId(attemptId);
        return ResponseEntity.ok(result);
    }
}

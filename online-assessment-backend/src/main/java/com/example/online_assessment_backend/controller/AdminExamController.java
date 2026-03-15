package com.example.online_assessment_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.CreateExamRequest;
import com.example.online_assessment_backend.entity.ExamEntity;
import com.example.online_assessment_backend.service.ExamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/exams")
@RequiredArgsConstructor
public class AdminExamController {

    private final ExamService examService;

    @GetMapping
    public List<ExamEntity> getAllExams() {
        return examService.getAllExams();
    }

    @PostMapping
    public String createExam(@RequestBody CreateExamRequest request) {
        return examService.createExam(request);
    }

    @DeleteMapping("/{id}")
    public String deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return "Exam Deleted Successfully";
    }

    @PutMapping("/{id}")
    public String updateExam(
            @PathVariable Long id,
            @RequestBody CreateExamRequest request) {

        return examService.updateExam(id, request);
    }

    @PostMapping("/{examId}/close")
    public String closeExam(@PathVariable Long examId) {
        return examService.closeExam(examId);
    }

    @PostMapping("/{examId}/reopen")
    public String reopenExam(@PathVariable Long examId) {
        return examService.reopenExam(examId);
    }

    @PutMapping("/{id}/toggle")
    public String toggleExamStatus(@PathVariable Long id) {

        return examService.toggleExamStatus(id);
    }
}
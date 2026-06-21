package com.example.online_assessment_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.online_assessment_backend.dto.AdminResultResponse;
import com.example.online_assessment_backend.dto.ExamReportResponse;
import com.example.online_assessment_backend.service.ExamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
public class AdminReportController {

    private final ExamService examService;

    @GetMapping("/exam/{examId}")
    public ExamReportResponse getExamReport(
            @PathVariable Long examId) {

        return examService.getExamReport(examId);
    }

    @GetMapping("/exam/{examId}/students")
    public List<AdminResultResponse> getStudentResults(
            @PathVariable Long examId) {

        return examService.getStudentResults(examId);
    }
}
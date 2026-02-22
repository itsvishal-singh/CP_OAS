package com.example.online_assessment_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.online_assessment_backend.dto.AdminResultResponse;
import com.example.online_assessment_backend.service.ExamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/results")
@RequiredArgsConstructor
public class AdminResultController {

    private final ExamService examService;

    @GetMapping
    public List<AdminResultResponse> getAllResults() {

        return examService.getAllResults();
    }
}
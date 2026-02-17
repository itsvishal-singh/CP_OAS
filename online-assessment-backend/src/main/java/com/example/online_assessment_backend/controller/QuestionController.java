package com.example.online_assessment_backend.controller;

import org.springframework.web.bind.annotation.*;

import com.example.online_assessment_backend.dto.CreateQuestionRequest;
import com.example.online_assessment_backend.service.QuestionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/create")
    public String createQuestion(@Valid @RequestBody CreateQuestionRequest request) {

        return questionService.createQuestion(request);
    }
}

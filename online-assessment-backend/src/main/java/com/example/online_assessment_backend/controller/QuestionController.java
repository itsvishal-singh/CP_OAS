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

import com.example.online_assessment_backend.dto.CreateQuestionRequest;
import com.example.online_assessment_backend.dto.QuestionResponse;
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

    @GetMapping("/all")
    public List<QuestionResponse> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @PutMapping("/update/{id}")
    public String updateQuestion(@PathVariable Long id,
            @RequestBody CreateQuestionRequest request) {
        return questionService.updateQuestion(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteQuestion(@PathVariable Long id) {
        return questionService.deleteQuestion(id);
    }

    @GetMapping("/count/{examId}")
    public long getQuestionCount(@PathVariable Long examId) {
        return questionService.countByExamId(examId);
    }
}

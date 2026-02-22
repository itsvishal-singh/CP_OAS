package com.example.online_assessment_backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ResultResponse {

    private Long examId;
    private String examTitle;

    private int score;
    private int correctAnswers;
    private int totalQuestions;

    private LocalDateTime submittedAt;
}
package com.example.online_assessment_backend.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminResultResponse {

    private String studentName;
    private String studentEmail;

    private Long examId;
    private String examTitle;

    private int score;
    private int totalQuestions;

    private LocalDateTime submittedAt;
}
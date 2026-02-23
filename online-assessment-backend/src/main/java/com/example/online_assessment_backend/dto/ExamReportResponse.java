package com.example.online_assessment_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExamReportResponse {

    private Long examId;
    private String examTitle;

    private long totalAttempts;
    private long passed;
    private long failed;

    private double averageScore;
    private int highestScore;
}
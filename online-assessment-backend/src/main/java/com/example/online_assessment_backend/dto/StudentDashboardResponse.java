package com.example.online_assessment_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentDashboardResponse {

    private long totalExams;
    private long attempted;
    private long pending;

    private Double averageScore;
    private Integer highestScore;

    private String lastExam;
}
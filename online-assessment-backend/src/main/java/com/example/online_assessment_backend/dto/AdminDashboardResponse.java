package com.example.online_assessment_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardResponse {

    private long totalStudents;
    private long totalExams;
    private long totalAttempts;

    private Double averageScore;
    private Double passRate;
}
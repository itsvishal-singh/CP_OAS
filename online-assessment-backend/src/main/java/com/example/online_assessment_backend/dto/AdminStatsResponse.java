package com.example.online_assessment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminStatsResponse {

    private long totalExams;
    private long totalStudents;
    private long activeExams;
    private long totalQuestions;
    private long totalAttempts;
    private double averageScore;

}
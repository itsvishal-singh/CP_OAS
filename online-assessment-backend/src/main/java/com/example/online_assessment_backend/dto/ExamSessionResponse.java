package com.example.online_assessment_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExamSessionResponse {

    private Long attemptId;

    private Long examId;
    private String title;
    private Integer duration;

    private LocalDateTime startTime;

    private List<QuestionResponse> questions;
}
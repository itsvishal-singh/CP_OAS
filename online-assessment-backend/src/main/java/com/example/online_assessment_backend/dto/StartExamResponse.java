package com.example.online_assessment_backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StartExamResponse {

    private Long attemptId;
    private Long examId;
    private LocalDateTime startedAt;
}

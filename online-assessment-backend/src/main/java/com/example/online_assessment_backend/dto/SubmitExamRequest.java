package com.example.online_assessment_backend.dto;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmitExamRequest {

    private Long attemptId;
    private Map<String, String> answers;
}

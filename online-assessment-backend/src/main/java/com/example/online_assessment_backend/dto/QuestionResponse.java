package com.example.online_assessment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestionResponse {

    private Long id;
    private String question;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
}

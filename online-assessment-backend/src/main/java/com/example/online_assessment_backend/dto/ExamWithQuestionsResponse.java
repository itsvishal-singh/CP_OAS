package com.example.online_assessment_backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExamWithQuestionsResponse {

  private Long examId;
  private String title;
  private Integer duration;
  private Integer totalMarks;

  private List<QuestionResponse> questions;
}

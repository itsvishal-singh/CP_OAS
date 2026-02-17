package com.example.online_assessment_backend.service;

import org.springframework.stereotype.Service;

import com.example.online_assessment_backend.dto.CreateQuestionRequest;
import com.example.online_assessment_backend.entity.QuestionEntity;
import com.example.online_assessment_backend.repository.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {

  private final QuestionRepository questionRepository;

  public String createQuestion(CreateQuestionRequest request) {

    QuestionEntity question = QuestionEntity.builder()
        .examId(request.getExamId())

        .question(request.getQuestion())
        .optionA(request.getOptionA())
        .optionB(request.getOptionB())
        .optionC(request.getOptionC())
        .optionD(request.getOptionD())
        .correctAnswer(request.getCorrectAnswer())
        .build();

    questionRepository.save(question);

    return "Question Added Successfully";
  }
}

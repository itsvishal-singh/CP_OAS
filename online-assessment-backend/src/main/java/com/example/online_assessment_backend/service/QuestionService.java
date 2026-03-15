package com.example.online_assessment_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.online_assessment_backend.dto.CreateQuestionRequest;
import com.example.online_assessment_backend.dto.QuestionResponse;
import com.example.online_assessment_backend.entity.QuestionEntity;
import com.example.online_assessment_backend.repository.ExamRepository;
import com.example.online_assessment_backend.repository.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {

  private final QuestionRepository questionRepository;
  private final ExamRepository examRepository;

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

  public List<QuestionResponse> getAllQuestions() {

    List<QuestionEntity> questions = questionRepository.findAll();

    return questions.stream().map(q -> {

      String examTitle = examRepository
          .findById(q.getExamId())
          .map(e -> e.getTitle())
          .orElse("Unknown Exam");

      return new QuestionResponse(
          q.getId(),
          q.getQuestion(),
          q.getOptionA(),
          q.getOptionB(),
          q.getOptionC(),
          q.getOptionD(),
          q.getCorrectAnswer(),
          examTitle);

    }).toList();
  }

  public String updateQuestion(Long id, CreateQuestionRequest request) {

    QuestionEntity question = questionRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Question not found"));

    question.setQuestion(request.getQuestion());
    question.setOptionA(request.getOptionA());
    question.setOptionB(request.getOptionB());
    question.setOptionC(request.getOptionC());
    question.setOptionD(request.getOptionD());
    question.setCorrectAnswer(request.getCorrectAnswer());

    questionRepository.save(question);

    return "Question Updated Successfully";
  }

  public String deleteQuestion(Long id) {

    QuestionEntity q = questionRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Question not found"));

    questionRepository.delete(q);

    return "Question deleted successfully";
  }
  public long countByExamId(Long examId) {
    return questionRepository.countByExamId(examId);
}
}

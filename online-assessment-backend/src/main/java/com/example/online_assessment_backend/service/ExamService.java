package com.example.online_assessment_backend.service;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.online_assessment_backend.entity.ExamEntity;
import com.example.online_assessment_backend.entity.QuestionEntity;
import com.example.online_assessment_backend.repository.ExamRepository;
import com.example.online_assessment_backend.repository.QuestionRepository;
import com.example.online_assessment_backend.dto.CreateExamRequest;
import com.example.online_assessment_backend.dto.ExamWithQuestionsResponse;
import com.example.online_assessment_backend.dto.QuestionResponse;

@Service
@RequiredArgsConstructor
public class ExamService {
    @Autowired
    private final ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public String createExam(CreateExamRequest request) {

        ExamEntity exam = new ExamEntity();
        exam.setTitle(request.getTitle());
        exam.setDuration(request.getDuration());
        exam.setTotalMarks(request.getTotalMarks());

        examRepository.save(exam);

        return "Exam created successfully";
    }

public ExamWithQuestionsResponse getExamWithQuestions(Long examId) {

    ExamEntity exam = examRepository.findById(examId)
            .orElseThrow(() -> new RuntimeException("Exam not found"));

    List<QuestionEntity> questions =
            questionRepository.findByExamId(examId);

    List<QuestionResponse> questionList =
            questions.stream()
            .map(q -> new QuestionResponse(
                    q.getId(),
                    q.getQuestion(),
                    q.getOptionA(),
                    q.getOptionB(),
                    q.getOptionC(),
                    q.getOptionD()
            ))
            .toList();

    return new ExamWithQuestionsResponse(
            exam.getId(),
            exam.getTitle(),
            exam.getDuration(),
            exam.getTotalMarks(),
            questionList
    );
}

}
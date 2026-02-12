package com.example.online_assessment_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.online_assessment_backend.entity.ExamEntity;
import com.example.online_assessment_backend.repository.ExamRepository;
import com.example.online_assessment_backend.dto.CreateExamRequest;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;

    public String createExam(CreateExamRequest request) {

        ExamEntity exam = new ExamEntity();
        exam.setTitle(request.getTitle());
        exam.setDuration(request.getDuration());
        exam.setTotalMarks(request.getTotalMarks());

        examRepository.save(exam);

        return "Exam created successfully";
    }
}

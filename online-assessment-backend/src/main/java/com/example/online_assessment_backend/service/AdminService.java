package com.example.online_assessment_backend.service;

import org.springframework.stereotype.Service;

import com.example.online_assessment_backend.dto.AdminStatsResponse;
import com.example.online_assessment_backend.repository.ExamAttemptRepository;
import com.example.online_assessment_backend.repository.ExamRepository;
import com.example.online_assessment_backend.repository.QuestionRepository;
import com.example.online_assessment_backend.repository.ResultRepository;
import com.example.online_assessment_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final ExamAttemptRepository attemptRepository;
    private final ResultRepository resultRepository;

    public AdminStatsResponse getDashboardStats() {

        long exams = examRepository.count();

        long students = userRepository.countByRole("ROLE_STUDENT");

        long attempts = attemptRepository.count();
        long activeExams = examRepository.countByActiveTrue();
        long totalQuestions = questionRepository.count();

        Double avgScore = resultRepository.getAverageScore();

        if (avgScore == null)
            avgScore = 0.0;

        return AdminStatsResponse.builder()
                .totalExams(exams)
                .totalStudents(students)
                .activeExams(activeExams)
                .totalQuestions(totalQuestions)
                .totalAttempts(attempts)
                .averageScore(avgScore)
                .build();
    }

    public long getActiveExams() {
        return examRepository.countByActiveTrue();
    }

    public long getTotalQuestions() {
        return questionRepository.count();
    }

}
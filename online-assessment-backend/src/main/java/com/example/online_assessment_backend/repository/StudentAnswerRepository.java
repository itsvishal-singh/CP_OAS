package com.example.online_assessment_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.online_assessment_backend.entity.StudentAnswerEntity;

public interface StudentAnswerRepository
        extends JpaRepository<StudentAnswerEntity, Long> {
                Optional<StudentAnswerEntity> findByAttempt_IdAndQuestion_Id(Long attemptId, Long questionId);
}
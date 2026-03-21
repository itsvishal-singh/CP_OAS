package com.example.online_assessment_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.online_assessment_backend.entity.ExamAttemptEntity;

public interface ExamAttemptRepository
                extends JpaRepository<ExamAttemptEntity, Long> {

        List<ExamAttemptEntity> findByExam_IdAndStudent_IdAndStatus(
                        Long examId,
                        Long studentId,
                        String status);

        long countByStudent_Id(Long studentId);

        long countByStudent_IdAndCompletedTrue(Long studentId);

        @Override
        long count();

        Optional<ExamAttemptEntity> findTopByStudent_IdOrderByIdDesc(Long studentId);

        List<ExamAttemptEntity> findByStudent_Id(Long studentId);
}

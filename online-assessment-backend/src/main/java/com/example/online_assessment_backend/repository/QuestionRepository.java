package com.example.online_assessment_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.online_assessment_backend.entity.QuestionEntity;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {

    List<QuestionEntity> findByExamId(Long examId);
}

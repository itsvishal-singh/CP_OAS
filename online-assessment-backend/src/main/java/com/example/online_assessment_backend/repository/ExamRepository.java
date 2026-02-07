package com.example.online_assessment_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.online_assessment_backend.entity.ExamEntity;

public interface ExamRepository extends JpaRepository<ExamEntity, Long> {
}

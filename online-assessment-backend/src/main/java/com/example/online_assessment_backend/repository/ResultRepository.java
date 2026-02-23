package com.example.online_assessment_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.online_assessment_backend.entity.ResultEntity;

public interface ResultRepository extends JpaRepository<ResultEntity, Long> {
  List<ResultEntity> findByAttempt_Student_Id(Long studentId);

  List<ResultEntity> findByAttempt_Exam_Id(Long examId);

  List<ResultEntity> findAllByOrderByScoreDesc();

  @Query("SELECT AVG(r.score) FROM ResultEntity r")
  Double getAverageScore();

  @Query("SELECT MAX(r.score) FROM ResultEntity r WHERE r.attempt.student.id = :studentId")
  Integer getMaxScore(@Param("studentId") Long studentId);

  @Query("SELECT AVG(r.score) FROM ResultEntity r WHERE r.attempt.student.id = :studentId")
  Double getStudentAverage(@Param("studentId") Long studentId);

    public long countByScoreGreaterThanEqual(int score);
}

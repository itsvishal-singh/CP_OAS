package com.example.online_assessment_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exam_attempts")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExamAttemptEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "exam_id")
    private ExamEntity exam;

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private UserEntity student;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "status", nullable = false)
    private String status;

    @PrePersist
    public void prePersist() {
        this.startTime = LocalDateTime.now();
    }

    @Column(name = "score")
    private Integer score;

    @Builder.Default
    @Column(name = "completed")
    private Boolean completed = false;

}

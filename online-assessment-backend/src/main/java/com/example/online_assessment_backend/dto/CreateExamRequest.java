package com.example.online_assessment_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateExamRequest {

    @NotBlank
    private String title;

    @NotNull
    private Integer durationMinutes;

    @NotNull
    private Integer totalMarks;

    // getters & setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDuration(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Integer getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(Integer totalMarks) {
        this.totalMarks = totalMarks;
    }
}

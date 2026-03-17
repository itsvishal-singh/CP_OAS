package com.example.online_assessment_backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.online_assessment_backend.entity.ResultEntity;
import com.example.online_assessment_backend.repository.ResultRepository;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public ResultEntity getResultByAttemptId(Long attemptId) {
        return resultRepository.findByAttemptId(attemptId)
                .orElseThrow(() -> new RuntimeException("Result not found"));
    }
}
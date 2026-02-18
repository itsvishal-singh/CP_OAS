package com.example.online_assessment_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.online_assessment_backend.dto.CreateExamRequest;
import com.example.online_assessment_backend.dto.ExamWithQuestionsResponse;
import com.example.online_assessment_backend.dto.QuestionResponse;
import com.example.online_assessment_backend.entity.ExamAttemptEntity;
import com.example.online_assessment_backend.entity.ExamEntity;
import com.example.online_assessment_backend.entity.QuestionEntity;
import com.example.online_assessment_backend.entity.UserEntity;
import com.example.online_assessment_backend.repository.ExamRepository;
import com.example.online_assessment_backend.repository.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamService {
        @Autowired
        private final ExamRepository examRepository;

        @Autowired
        private QuestionRepository questionRepository;

        public String createExam(CreateExamRequest request) {

                ExamEntity exam = new ExamEntity();
                exam.setTitle(request.getTitle());
                exam.setDuration(request.getDuration());
                exam.setTotalMarks(request.getTotalMarks());

                examRepository.save(exam);

                return "Exam created successfully";
        }

        public ExamWithQuestionsResponse getExamWithQuestions(Long examId) {

                ExamEntity exam = examRepository.findById(examId)
                                .orElseThrow(() -> new RuntimeException("Exam not found"));

                List<QuestionEntity> questions = questionRepository.findByExamId(examId);

                List<QuestionResponse> questionList = questions.stream()
                                .map(q -> new QuestionResponse(
                                                q.getId(),
                                                q.getQuestion(),
                                                q.getOptionA(),
                                                q.getOptionB(),
                                                q.getOptionC(),
                                                q.getOptionD()))
                                .toList();

                return new ExamWithQuestionsResponse(
                                exam.getId(),
                                exam.getTitle(),
                                exam.getDuration(),
                                exam.getTotalMarks(),
                                questionList);
        }

        public StartExamResponse startExam(Long examId, String username) {

                // 1️⃣ Find exam
                ExamEntity exam = examRepository.findById(examId)
                                .orElseThrow(() -> new RuntimeException("Exam not found"));

                // 2️⃣ Find student
                UserEntity student = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                // 3️⃣ Check active attempt
                examAttemptRepository
                                .findByExamIdAndStudentIdAndStatus(
                                                exam.getId(),
                                                student.getId(),
                                                "STARTED")
                                .ifPresent(a -> {
                                        throw new RuntimeException("Exam already started");
                                });

                // 4️⃣ Create new attempt
                ExamAttemptEntity attempt = ExamAttemptEntity.builder()
                                .exam(exam)
                                .student(student)
                                .status("STARTED")
                                .build();

                examAttemptRepository.save(attempt);

                return StartExamResponse.builder()
                                .attemptId(attempt.getId())
                                .examId(exam.getId())
                                .startedAt(attempt.getStartTime())
                                .build();
        }

}
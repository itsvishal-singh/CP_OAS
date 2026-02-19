package com.example.online_assessment_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.online_assessment_backend.dto.CreateExamRequest;
import com.example.online_assessment_backend.dto.ExamWithQuestionsResponse;
import com.example.online_assessment_backend.dto.QuestionResponse;
import com.example.online_assessment_backend.dto.StartExamResponse;
import com.example.online_assessment_backend.dto.SubmitExamRequest;
import com.example.online_assessment_backend.entity.ExamAttemptEntity;
import com.example.online_assessment_backend.entity.ExamEntity;
import com.example.online_assessment_backend.entity.QuestionEntity;
import com.example.online_assessment_backend.entity.UserEntity;
import com.example.online_assessment_backend.repository.ExamAttemptRepository;
import com.example.online_assessment_backend.repository.ExamRepository;
import com.example.online_assessment_backend.repository.QuestionRepository;
import com.example.online_assessment_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamService {
        @Autowired
        private final ExamRepository examRepository;

        @Autowired
        private QuestionRepository questionRepository;
        private final ExamAttemptRepository examAttemptRepository;
        private final UserRepository userRepository;

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

        public String submitExam(SubmitExamRequest request) {

                ExamAttemptEntity attempt = examAttemptRepository
                                .findById(request.getAttemptId())
                                .orElseThrow(() -> new RuntimeException("Attempt not found"));

                if (attempt.getCompleted()) {
                        return "Exam already submitted";
                }

                int totalScore = 0;

                for (Map.Entry<Long, String> entry : request.getAnswers().entrySet()) {

                        Long questionId = entry.getKey();
                        String selectedAnswer = entry.getValue();

                        QuestionEntity question = questionRepository
                                        .findById(questionId)
                                        .orElseThrow(() -> new RuntimeException("Question not found"));

                        if (question.getCorrectAnswer().equalsIgnoreCase(selectedAnswer)) {
                                totalScore++;
                        }
                }

                attempt.setScore(totalScore);
                attempt.setCompleted(true);
                attempt.setEndTime(LocalDateTime.now());

                examAttemptRepository.save(attempt);

                return "Exam submitted successfully. Score: " + totalScore;
        }
        public List<ExamEntity> getAllExams() {
                return examRepository.findAll();
            }
            

}
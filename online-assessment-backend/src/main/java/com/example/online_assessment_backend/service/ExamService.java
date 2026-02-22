package com.example.online_assessment_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.online_assessment_backend.dto.AdminResultResponse;
import com.example.online_assessment_backend.dto.CreateExamRequest;
import com.example.online_assessment_backend.dto.ExamWithQuestionsResponse;
import com.example.online_assessment_backend.dto.QuestionResponse;
import com.example.online_assessment_backend.dto.ResultResponse;
import com.example.online_assessment_backend.dto.StartExamResponse;
import com.example.online_assessment_backend.dto.SubmitExamRequest;
import com.example.online_assessment_backend.entity.ExamAttemptEntity;
import com.example.online_assessment_backend.entity.ExamEntity;
import com.example.online_assessment_backend.entity.QuestionEntity;
import com.example.online_assessment_backend.entity.ResultEntity;
import com.example.online_assessment_backend.entity.StudentAnswerEntity;
import com.example.online_assessment_backend.entity.UserEntity;
import com.example.online_assessment_backend.repository.ExamAttemptRepository;
import com.example.online_assessment_backend.repository.ExamRepository;
import com.example.online_assessment_backend.repository.QuestionRepository;
import com.example.online_assessment_backend.repository.ResultRepository;
import com.example.online_assessment_backend.repository.StudentAnswerRepository;
import com.example.online_assessment_backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamService {

        private final ExamRepository examRepository;
        private final StudentAnswerRepository studentAnswerRepository;
        private final ResultRepository resultRepository;

        private final QuestionRepository questionRepository;
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
                if (!exam.getActive()) {
                        throw new RuntimeException("Exam is closed by admin");
                }

                // 2️⃣ Find student
                UserEntity student = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                // 3️⃣ Check active attempt
                Optional<ExamAttemptEntity> activeAttempt;
                activeAttempt = examAttemptRepository
                                .findByExam_IdAndStudent_IdAndStatus(
                                                exam.getId(),
                                                student.getId(),
                                                "STARTED");

                if (activeAttempt.isPresent()) {
                        ExamAttemptEntity attempt = activeAttempt.get();

                        return StartExamResponse.builder()
                                        .attemptId(attempt.getId())
                                        .examId(exam.getId())
                                        .startedAt(attempt.getStartTime())
                                        .build();
                }

                // 4️⃣ Create new attempt
                ExamAttemptEntity attempt = ExamAttemptEntity.builder()
                                .exam(exam)
                                .student(student)
                                .status("STARTED")
                                .completed(false)
                                .build();

                examAttemptRepository.save(attempt);

                return StartExamResponse.builder()
                                .attemptId(attempt.getId())
                                .examId(exam.getId())
                                .startedAt(attempt.getStartTime())
                                .build();
        }

        @Transactional
        public String submitExam(SubmitExamRequest request) {

                ExamAttemptEntity attempt = examAttemptRepository.findById(request.getAttemptId())
                                .orElseThrow(() -> new RuntimeException("Attempt not found"));

                if (attempt.getCompleted()) {
                        return "Already submitted";
                }

                int correct = 0;
                int total = request.getAnswers().size();

                for (Map.Entry<Long, String> entry : request.getAnswers().entrySet()) {

                        Long qId = entry.getKey();
                        String selected = entry.getValue();

                        QuestionEntity question = questionRepository.findById(qId)
                                        .orElseThrow(() -> new RuntimeException("Question not found"));

                        // Save answer
                        StudentAnswerEntity answer = StudentAnswerEntity.builder()
                                        .attempt(attempt)
                                        .question(question)
                                        .selectedOption(selected)
                                        .build();

                        studentAnswerRepository.save(answer);

                        // Check correctness
                        if (question.getCorrectAnswer()
                                        .equalsIgnoreCase(selected)) {
                                correct++;
                        }
                }

                int score = correct; // 1 mark per question

                // Save Result
                ResultEntity result = ResultEntity.builder()
                                .attempt(attempt)
                                .correctAnswers(correct)
                                .score(score)
                                .totalQuestions(total)
                                .build();

                resultRepository.save(result);

                // Update attempt
                attempt.setCompleted(true);
                attempt.setEndTime(LocalDateTime.now());
                attempt.setScore(score);

                examAttemptRepository.save(attempt);

                return "Exam submitted. Score: " + score + "/" + total;
        }

        public List<ExamEntity> getAllExams() {
                return examRepository.findAll();
        }

        public List<ResultResponse> getMyResults(String username) {

                UserEntity student = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<ResultEntity> results = resultRepository.findByAttempt_Student_Id(student.getId());

                return results.stream()
                                .map(r -> ResultResponse.builder()
                                                .examId(r.getAttempt().getExam().getId())
                                                .examTitle(r.getAttempt().getExam().getTitle())
                                                .score(r.getScore())
                                                .correctAnswers(r.getCorrectAnswers())
                                                .totalQuestions(r.getTotalQuestions())
                                                .submittedAt(r.getAttempt().getEndTime())
                                                .build())
                                .toList();
        }

        public List<AdminResultResponse> getAllResults() {

                List<ResultEntity> results = resultRepository.findAll();

                return results.stream()
                                .map(r -> AdminResultResponse.builder()
                                                .studentName(r.getAttempt().getStudent().getUsername())
                                                .studentEmail(r.getAttempt().getStudent().getUsername())

                                                .examId(r.getAttempt().getExam().getId())
                                                .examTitle(r.getAttempt().getExam().getTitle())

                                                .score(r.getScore())
                                                .totalQuestions(r.getTotalQuestions())

                                                .submittedAt(r.getAttempt().getEndTime())
                                                .build())
                                .toList();
        }

        public String closeExam(Long examId) {

                ExamEntity exam = examRepository.findById(examId)
                                .orElseThrow(() -> new RuntimeException("Exam not found"));

                exam.setActive(false);
                examRepository.save(exam);

                return "Exam closed successfully";
        }

        public String reopenExam(Long examId) {

                ExamEntity exam = examRepository.findById(examId)
                                .orElseThrow(() -> new RuntimeException("Exam not found"));

                exam.setActive(true);
                examRepository.save(exam);

                return "Exam reopened successfully";
        }

}
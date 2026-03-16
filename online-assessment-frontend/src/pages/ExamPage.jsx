import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ExamPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadExam();
  }, []);

  const loadExam = async () => {
    try {
      // 1️⃣ start exam
      // await api.post(`/student/exams/${examId}/start`);

      // // 2️⃣ fetch exam questions
      const res = await api.post(`/student/exams/${examId}/start`);

      setExam(res.data);

      setTime(res.data.duration * 60);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  if (!exam) return <p>Loading exam...</p>;

  const question = exam?.questions?.[current];

  const selectAnswer = (option) => {
    setAnswers({
      ...answers,
      [question.id]: option,
    });
  };

  const nextQuestion = () => {
    if (current < exam.questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };
  const submitExam = async () => {
    try {
  
      console.log("Attempt ID:", exam.attemptId);
      console.log("Answers:", answers);
  
      await api.post("/student/exams/submit", {
        attemptId: exam.attemptId,
        answers: answers
      });
  
      alert("Exam submitted successfully!");
  
      // Redirect to result page
      navigate(`/student/results/${exam.attemptId}`);
  
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Question {current + 1} / {exam.questions.length}
        </h1>

        <h2 className="text-red-600 text-xl">⏱ {formatTime()}</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

        <div className="flex flex-col gap-3">
          {["A", "B", "C", "D"].map((opt) => {
            const text = question["option" + opt];

            return (
              <button
                key={opt}
                onClick={() => selectAnswer(opt)}
                className={`border p-3 rounded text-left ${
                  answers[question.id] === opt ? "bg-indigo-200" : ""
                }`}
              >
                {opt}. {text}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Previous
        </button>

        <button
          onClick={nextQuestion}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      <div className="mt-6">
        <button
           onClick={() => {
            if (window.confirm("Are you sure you want to submit the exam?")) {
              submitExam();
            }}}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
}

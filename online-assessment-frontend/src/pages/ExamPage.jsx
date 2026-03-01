import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get(`/student/exams/${examId}/start-session`);
      setQuestions(res.data.questions);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOptionSelect = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/student/exams/submit`, {
        examId,
        answers,
      });

      navigate("/student/results");
    } catch (err) {
      console.error(err);
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const question = questions[currentIndex];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>

      <div className="bg-white shadow p-4 rounded mb-4">
        <p className="mb-4">{question.question}</p>

        {[
          question.optionA,
          question.optionB,
          question.optionC,
          question.optionD,
        ].map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="option"
                checked={answers[question.id] === option}
                onChange={() => handleOptionSelect(question.id, option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Exam
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

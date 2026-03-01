import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function StudentExams() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await api.get("/student/exams");
      setExams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const startExam = async (examId) => {
    await api.post(`/student/exams/${examId}/start`);
    navigate(`/student/exams/${examId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Available Exams</h1>

      <div className="grid gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{exam.title}</h2>
              <p className="text-green-600">
                Duration: {`${exam.duration}`} minutes
              </p>
            </div>

            <button
              onClick={() => startExam(exam.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Start Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
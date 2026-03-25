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
   
    navigate(`/student/exams/${examId}`);
  };

  return (
    <div className="p-12 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-700  to-indigo-700 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        🚀 Available Exams
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:scale-[1.02] transition-transform duration-500 flex flex-col justify-between text-center"
          >
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-2">
                {exam.title}
              </h2>

              <p className="text-blue-500 mb-1">
                ⏱ Duration:{" "}
                <span className="font-bold text-blue-700">
                  {exam.durationMinutes} min
                </span>
              </p>

              <p className="text-blue-500">
                🎯 Marks:{" "}
                <span className="font-bold text-blue-700">
                  {exam.totalMarks}
                </span>
              </p>
            </div>

            <button
              onClick={() => startExam(exam.id)}
              className="mt-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white font-semibold py-2 mx-8 rounded-xl hover:scale-105 transition"
            >
              Start Exam →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

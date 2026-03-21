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
    // await api.post(`/student/exams/${examId}/start`);
    navigate(`/student/exams/${examId}`);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
  
      <h1 className="text-3xl font-bold mb-8 text-indigo-700">
        🚀 Available Exams
      </h1>
  
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {exam.title}
              </h2>
  
              <p className="text-gray-500 mb-1">
                ⏱ Duration: <span className="font-semibold">{exam.durationMinutes} min</span>
              </p>
  
              <p className="text-gray-500">
                🎯 Marks: <span className="font-semibold">{exam.totalMarks}</span>
              </p>
            </div>
  
            <button
              onClick={() => startExam(exam.id)}
              className="mt-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:scale-105 transition"
            >
              Start Exam →
            </button>
          </div>
        ))}
      </div>
  
    </div>
  );
}
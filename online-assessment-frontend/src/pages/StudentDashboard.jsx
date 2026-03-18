import { useEffect, useState } from "react";
import api from "../api/axios";
import { data, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);
  const [exams, setExams] = useState([]);
  const COLORS = ["#6366f1", "#22c55e"];
  const chartData = [
    { name: "Attempted", value: stats?.attempted || 0 },
    {
      name: "Pending",
      value: (stats?.totalExams || 0) - (stats?.attempted || 0),
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
    loadExams();
    loadProfile();
  }, []);

  const loadDashboard = async () => {
    const res = await api.get("/student/dashboard");
    setStats(res.data);
  };
  const loadProfile = async () => {
    try {
      const res = await api.get("/student/profile");
      localStorage.setItem("fullName", res.data.fullName);
    } catch (err) {
      console.log("Profile fetch failed");
    }
  };

  const loadExams = async () => {
    const res = await api.get("/student/exams");
    setExams(res.data);
  };

  const startExam = (examId) => {
    navigate(`/exams/${examId}`);
  };

  if (!stats) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-white font-bold mb-6">Student Dashboard</h1>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-6 rounded-xl shadow text-center">
          <h2>Total Exams</h2>
          <p className="text-3xl">{stats.totalExams}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow text-center">
          <h2>Attempted</h2>
          <p className="text-3xl">{stats.attempted}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow text-center">
          <h2>Average Score</h2>
          <p className="text-3xl">
            {stats.averageScore ? stats.averageScore.toFixed(1) : "0.0"}%
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Exam Progress</h2>

        <div className="flex justify-center">
          <PieChart width={350} height={300}>
            <Pie data={chartData} dataKey="value" outerRadius={100} label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Exams */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-indigo-200">
            <tr>
              <th className="p-4">Exam</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Marks</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {exams.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-gray-500">
                  No exams available
                </td>
              </tr>
            ) : (
              exams.map((exam) => (
                <tr key={exam.id} className="border">
                  <td className="p-4">{exam.title}</td>

                  <td className="p-4">{exam.durationMinutes} minutes</td>

                  <td className="p-4">{exam.totalMarks}</td>

                  <td className="p-4">
                    <button
                      onClick={() => startExam(exam.id)}
                     className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Start
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

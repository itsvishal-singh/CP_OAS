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
      <h1 className="text-3xl text-green-500 font-bold mb-6">Your Place</h1>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT SIDE → CARDS */}
        <div className="flex flex-col gap-5">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-6 rounded-xl shadow">
            <h3>Total Exams</h3>
            <p className="text-3xl">{stats.totalExams}</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow">
            <h3>Attempted</h3>
            <p className="text-3xl">{stats.attempted}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow">
            <h3>Average Score</h3>
            <p className="text-3xl">
              {stats.averageScore ? stats.averageScore.toFixed(1) : "0.0"}%
            </p>
          </div>
        </div>

        {/* RIGHT SIDE → PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold mb-4">Exam Progress</h2>

          <PieChart width={300} height={250}>
            <Pie data={chartData} dataKey="value" outerRadius={80} label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          {/* BUTTON BELOW CHART */}
          <button
            onClick={() => navigate("/student/exams")}
            className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            View Exams
          </button>
        </div>
      </div>

    </div>
  );
}

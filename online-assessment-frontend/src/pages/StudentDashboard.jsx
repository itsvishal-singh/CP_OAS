import { useEffect, useState } from "react";
import api from "../api/axios";
import { data, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);
  // const [exams, setExams] = useState([]);
  const COLORS = ["#22c55e", "	#6666ff"];
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
    // loadExams();
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

  // const loadExams = async () => {
  //   const res = await api.get("/student/exams");
  //   setExams(res.data);
  // };

  // const startExam = (examId) => {
  //   navigate(`/exams/${examId}`);
  // };

  if (!stats) return <p className="text-white">Loading...</p>;

  return (
    <div className="px-14 py-4 bg-gradient-to-b from-indigo-700 via-blue-500 to-purple-700 h-[calc(100vh-99px)]">
      <h1 className="text-5xl text-white font-semibold m-1 pb-14 text-center ">
        Your Home
      </h1>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* LEFT SIDE → CARDS */}
        <div className="flex flex-col gap-5 font-bold mx-10">
          <div className="bg-white text-blue-700 text-center py-8 rounded-xl shadow">
            <h1 className="text-xl">Total Exams</h1>
            <p className="text-3xl mt-1">{stats.totalExams}</p>
          </div>

          <div className="bg-white text-green-600 text-center py-8 rounded-xl shadow">
            <h1 className="text-xl">Attempted</h1>
            <p className="text-3xl mt-1">{stats.attempted}</p>
          </div>

          <div className="bg-white text-purple-600 text-center py-8 rounded-xl shadow">
            <h1 className="text-xl">Average Score</h1>
            <p className="text-3xl mt-1">
              {stats.averageScore ? stats.averageScore.toFixed(1) : "0.0"}%
            </p>
          </div>
        </div>

        {/* RIGHT SIDE → PIE CHART */}
        <div className="bg-white py-8 mx-8 rounded-xl shadow flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Exam Progress</h2>

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
          <div className="mt-5 flex gap-3">
            {/* All Exams */}
            <button
              onClick={() => navigate("/student/exams")}
              className="sm:px-5 p-2 bg-blue-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base "
            >
              All Exams
            </button>

            {/* Attempted Exams */}
            <button
              onClick={() => navigate("/student/attempts")}
              className="sm:px-5 p-2 bg-green-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base "
            >
              Attempted
            </button>

            {/* Results */}
            <button
              onClick={() => navigate("/student/results")}
              className=" sm:px-5 p-2 bg-purple-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base "
            >
              Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

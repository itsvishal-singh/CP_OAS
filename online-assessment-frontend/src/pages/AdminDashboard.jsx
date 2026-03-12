import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p className="text-3xl font-bold mb-6 text-center">Loading...</p>;

  return (
    <AdminLayout> 
   

      <h1 className="text-3xl text-white font-bold mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-2 m-8 text-center gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold">Total Exams</h2>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.totalExams}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold">Total Students</h2>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.totalStudents}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold">Active Exams</h2>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.activeExams}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold">Total Questions</h2>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.totalQuestions}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold">Attempts</h2>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.totalAttempts}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold">Average Score</h2>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.averageScore.toFixed(1)}%
          </p>
        </div>

      </div>

    </AdminLayout>
  );
}
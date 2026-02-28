import { useNavigate } from "react-router-dom";


export default function StudentDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-6">
  <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
    

  <div className="space-y-4">
    <button
      onClick={() => navigate("/student/exams")}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
    >
      📘 View Available Exams
    </button>

    <button
      onClick={() => navigate("/student/results")}
      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
    >
      📊 View My Results
    </button>
  </div>
</div>
  );
}

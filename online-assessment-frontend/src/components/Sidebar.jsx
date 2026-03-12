import { Link } from "react-router-dom";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(); // refresh navbar state
  };
  return (
    <aside className="w-60 bg-gradient-to-br from-purple-900 to-indigo-900 text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-indigo-200">
        Admin Panel
      </div>

      <nav className="flex flex-col p-4 gap-3">
        <Link
          to="/admin"
          className="px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/students"
          className="px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Students
        </Link>
        <Link
          to="/admin/exams"
          className="px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Manage Exams
        </Link>

        <Link
          to="/admin/questions"
          className="px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Questions
        </Link>

        <Link
          to="/admin/results"
          className="px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Results
        </Link>

        <Link
          to=""
          className="px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
}

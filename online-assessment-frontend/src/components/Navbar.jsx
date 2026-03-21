import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const fullName = localStorage.getItem("fullName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(); // refresh navbar state
  };

  return (
    <nav className="bg-gradient-to-t from-indigo-700 via-blue-700 to-purple-700 text-white shadow-2xl px-12 py-6 flex justify-between items-center ">
      {/* Dynamic Home Title */}
      <Link
        to={
          role === "ROLE_ADMIN"
            ? "/admin"
            : role === "ROLE_STUDENT"
            ? "/student"
            : "/"
        }
        className="text-xl font-bold text-white hover:underline"
      >
        {role === "ROLE_ADMIN"
          ? "Admin Home"
          : role === "ROLE_STUDENT"
          ? `Welcome ${fullName || username}`
          : "Assessment Home"}
      </Link>
      <div className="flex gap-6 items-center">
        {role && (
          <Link to={role === "ROLE_ADMIN" ? "/admin" : "/student"}>
            Dashboard
          </Link>
        )}
        {role === "ROLE_STUDENT" && (
          <>
            <Link
              to="/student/exams"
              className="hover:text-yellow-300 transition"
            >
              Exams
            </Link>
            <Link
              to="/student/results"
              className="hover:text-yellow-300 transition"
            >
              Results
            </Link>
            <Link
              to="/student/profile"
              className="hover:text-yellow-300 transition"
            >
              Profile
            </Link>
          </>
        )}
        {role ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="px-6 sm:px-6 py-2 bg-white text-blue-600 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base ">Login</Link>
            <Link
              to="/register"
              className="px-6 sm:px-6 py-2 bg-white text-green-600 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base "
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

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
    <nav className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white shadow-md px-10 py-4 flex justify-between items-center sticky top-0 z-50">
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
        {role === "ROLE_STUDENT" && <Link to="/student/profile">Profile</Link>}

        {role ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="bg-white text-indigo-700 px-4 py-2 rounded-lg"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const updateRole = () => {
      setRole(localStorage.getItem("role"));
    };
  
    window.addEventListener("storage", updateRole);
    updateRole();
  
    return () => window.removeEventListener("storage", updateRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-indigo-700">
        Online Assessment
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {!role && (
          <>
            <Link to="/login">
              <button className="px-4 py-2 text-indigo-600 hover:underline">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Register
              </button>
            </Link>
          </>
        )}

        {role === "ROLE_ADMIN" && (
          <>
            <Link to="/admin">
              <button className="px-4 py-2 text-indigo-600 hover:underline">
                Dashboard
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

        {role === "ROLE_STUDENT" && (
          <>
            <Link to="/student">
              <button className="px-4 py-2 text-indigo-600 hover:underline">
                Dashboard
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}
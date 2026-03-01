import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = btoa(username + ":" + password);
      localStorage.setItem("auth", token);

      const res = await api.get("/auth/me");
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      alert("Invalid login ❌");
      localStorage.clear();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[380px]">

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Online Assessment
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="text"
            placeholder="Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-right text-sm">
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => alert("Forgot Password feature coming soon 🚀")}
            >
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
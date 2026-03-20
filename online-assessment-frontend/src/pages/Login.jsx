import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = btoa(username + ":" + password);
      localStorage.setItem("auth", token);

      const res = await api.get("/auth/me");
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);

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
    <div className="h-[calc(100vh-83px)] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-300 to-purple-600">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[450px]">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Your Assessment
        </h2>

        <p className="text-center text-gray-500 mb-6">Sign in to continue</p>

        <form onSubmit={handleLogin} className="space-y-4 font-semibold">
          <input
            type="text"
            placeholder="Email"
            className="w-full border p-3 rounded-xl text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-green-600 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

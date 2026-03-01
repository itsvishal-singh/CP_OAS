import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const passwordsMatch =
    confirmPassword.length === 0 || password === confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) return;

    try {
      await axios.post("http://localhost:8085/api/auth/register", {
        username,
        password,
        role: "STUDENT",   // Fixed role
        fullName,
        mobile,
      });

      alert("Registration Successful ✅");
      navigate("/login");
    } catch (err) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px]">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
          Create Student Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Join the assessment platform
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                passwordsMatch
                  ? "focus:ring-green-400"
                  : "focus:ring-red-400 border-red-400"
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {!passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match ❌
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!passwordsMatch}
            className={`w-full py-3 rounded-lg text-white transition duration-300 shadow-md ${
              passwordsMatch
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
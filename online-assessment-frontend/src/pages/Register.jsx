import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8085/api/auth/register", {
        username,
        password,
        role
      });

      alert("Registration Successful ✅");
      navigate("/login");

    } catch (err) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <form 
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Register
        </button>

      </form>

    </div>
  );
}
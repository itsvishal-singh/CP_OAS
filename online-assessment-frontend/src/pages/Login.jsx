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
      // Create Basic Auth token
      const token = btoa(username + ":" + password);

      // Save token
      localStorage.setItem("auth", token);

      // Test login
      const res = await api.get("/auth/me");

      // Save role
      localStorage.setItem("role", res.data.role);

      // Redirect
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
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentExams from "./pages/StudentExams";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="ROLE_STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/exams"
          element={
            <ProtectedRoute allowedRole="ROLE_STUDENT">
              <StudentExams />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

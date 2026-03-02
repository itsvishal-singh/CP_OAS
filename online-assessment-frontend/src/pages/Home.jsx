import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-500 to-purple-900 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-12 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          Online Assessment System
        </h1>

        <div className="space-x-4">
          <Link to="/login">
            <button className="px-5 py-2 border border-white rounded-lg hover:bg-white hover:text-indigo-900 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-5 py-2 bg-white text-indigo-900 rounded-lg hover:bg-gray-200 transition">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-24 px-6">

        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          Smart & Secure <br />
          Online Examination Platform
        </h2>

        <p className="max-w-2xl text-lg text-gray-200 mb-10">
          Conduct automated assessments with instant scoring,
          real-time monitoring, and detailed performance tracking.
        </p>

        <div className="flex gap-6">
          <Link to="/register">
            <button className="px-8 py-3 bg-white text-indigo-900 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="px-8 py-3 border border-white rounded-xl font-semibold hover:bg-white hover:text-indigo-900 transition duration-300">
              Take Exam
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-32 px-12 pb-20">
        <h3 className="text-3xl font-bold text-center mb-14">
          Platform Features
        </h3>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-3">
              Automated Evaluation
            </h4>
            <p className="text-gray-300">
              Instant scoring system with accurate result processing.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-3">
              Secure Exam System
            </h4>
            <p className="text-gray-300">
              Role-based authentication and protected exam sessions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-3">
              Performance Tracking
            </h4>
            <p className="text-gray-300">
              Track scores, attempts, and improvement history.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-white/20 text-gray-300">
        © 2026 Online Assessment System | Developed for Academic Project
      </footer>

    </div>
  );
}
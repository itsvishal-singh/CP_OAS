import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl w-full px-4 mb-16 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Smart & Secure <br />
          Online Assessment System
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 px-2 leading-relaxed">
          Conduct automated assessments with instant scoring, real-time
          monitoring, and detailed performance tracking.
        </p>

        {/* CTA button */}
        <div className="flex justify-center">
          <Link to="/login">
            <button className="px-6 sm:px-8 py-3 bg-white text-indigo-900 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base whitespace-nowrap">
              Start Assessment
            </button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="w-full max-w-6xl px-4 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl text-center hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Automated Evaluation</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Instant scoring system with accurate results.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl text-center hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Secure Exam System</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Role-based authentication and protected exam sessions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl text-center hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Performance Tracking</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Track attempts, scores, and improvement history.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-4 border-t border-white/20 text-gray-200 text-sm w-full px-4 sticky bottom-0">
        © 2026 Online Assessment System | Developed by Vishal Kumar Singh
      </footer>
    </div>
  );
}

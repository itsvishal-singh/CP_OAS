import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-[calc(100vh-99px)] bg-gradient-to-b from-indigo-700 via-blue-500 to-purple-700 text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-6 p-5">
      {/* Hero Section */}
      <div className="text-center max-w-4xl w-full px-4 py-2 mb-16 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Smart & Secure <br />
          Online Assessment System
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 py-1 px-2 leading-relaxed">
          Conduct automated assessments with instant scoring, real-time
          monitoring, and detailed performance tracking.
        </p>

        {/* CTA button */}
        <div className="flex justify-center">
          <Link to="/register">
            <button className="px-6 sm:px-8 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base whitespace-nowrap">
              Start Assessment
            </button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="w-full max-w-7xl px-4 mb-16 sm:mb-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl text-center hover:scale-[1.05] transition-transform duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              Automated Evaluation
            </h3>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Instant scoring system with accurate results.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl text-center hover:scale-[1.05] transition-transform duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              Secure Exam System
            </h3>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Role-based authentication and protected exam sessions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl text-center hover:scale-[1.05] transition-transform duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              Performance Tracking
            </h3>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Track attempts, scores, and improvement history.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer>
      <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl text-center hover:scale-[1.02] transition-transform duration-300">
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              © 2026 Online Assessment System | Developed by Vishal Kumar Singh
            </p>
          </div>
      </footer> */}
      <div>
      <p className="font-light text-purple-400">© 2026 Online Assessment System | Developed by Vishal Kumar Singh</p></div>
    </div>
  );
}

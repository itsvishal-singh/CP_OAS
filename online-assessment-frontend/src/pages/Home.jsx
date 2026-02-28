import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
      
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center w-[400px]">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Online Assessment System
        </h1>

        <p className="text-gray-600 mb-6">
          Take exams. Track results. Improve your performance.
        </p>

        <div className="flex flex-col gap-3">
          
          <Link to="/login">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Register
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}
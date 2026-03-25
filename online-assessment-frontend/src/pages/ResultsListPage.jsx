import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ResultsListPage() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get("/student/results");
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-12 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-700  to-indigo-700 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        📊 My Results
      </h1>

      <div className="grid place-items-center md:grid-cols-2 lg:grid-cols-4 gap-2 p-8">
        {results.map((r) => {
          const percentage =
            r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0;

          const isPass = percentage >= 75;

          return (
            <div
              key={r.attemptId}
              className="bg-white rounded-2xl shadow-md p-8 px-10 hover:scale-[1.02] transition-transform duration-500 flex flex-col justify-between text-center"
            >
              <div className="px-12">
                <h2 className="text-xl font-bold text-blue-600 mb-2">
                  {r.examTitle}
                </h2>

                <p className="text-blue-600 text-sm">
                  {new Date(r.submittedAt).toLocaleString()}
                </p>

                <p className="mt-1 text-blue-600">
                  Score: <b>{r.score}</b> / {r.totalQuestions}
                </p>

                <p className="text-sm text-blue-600">
                  Percentage:{" "}
                  <span className="font-semibold">
                    {percentage.toFixed(1)}%
                  </span>
                </p>

                <span
                  className={`text-xs px-4 py-1 rounded-full mt-2 inline-block ${
                    isPass
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {isPass ? "PASS" : "FAIL"}
                </span>
              </div>

              <button
                onClick={() => navigate(`/student/results/${r.attemptId}`)}
                className="mt-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white font-semibold py-2 mx-8 rounded-xl hover:scale-105 transition"
              >
                View →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

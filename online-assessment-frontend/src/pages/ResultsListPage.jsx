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
    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-indigo-700">
        📊 My Results
      </h1>

      <div className="grid gap-5">
        {results.map((r) => {
          const percentage =
            r.totalQuestions > 0
              ? (r.score / r.totalQuestions) * 100
              : 0;

          const isPass = percentage >= 75;

          return (
            <div
              key={r.attemptId}
              className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition"
            >
              {/* LEFT */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {r.examTitle}
                </h2>

                <p className="text-gray-500 text-sm">
                  {new Date(r.submittedAt).toLocaleString()}
                </p>

                <p className="mt-1">
                  Score: <b>{r.score}</b> / {r.totalQuestions}
                </p>

                <p className="text-sm">
                  Percentage:{" "}
                  <span className="font-semibold">
                    {percentage.toFixed(1)}%
                  </span>
                </p>

                {/* PASS FAIL */}
                <span
                  className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${
                    isPass
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {isPass ? "PASS" : "FAIL"}
                </span>
              </div>

              {/* RIGHT BUTTON */}
              <button
                onClick={() =>
                  navigate(`/student/results/${r.attemptId}`)
                }
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
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
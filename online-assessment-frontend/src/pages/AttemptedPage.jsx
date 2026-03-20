import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AttemptedPage() {
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
  
    if (!username || !password) {
      navigate("/login");
      return;
    }
  
    axios
      .get("http://localhost:8085/api/student/attempts", {
        auth: { username, password }
      })
      .then((res) => {
        setAttempts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">
        📘 Attempted Exams
      </h1>

      {/* EMPTY STATE */}
      {attempts.length === 0 && (
        <p className="text-gray-500">No attempts found.</p>
      )}

      <div className="grid gap-5">
        {attempts.map((a) => {
          const isCompleted = a.completed;

          return (
            <div
              key={a.id}
              className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition"
            >
              {/* LEFT */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {a.exam?.title}
                </h2>

                <p className="text-sm text-gray-500">
                  Started:{" "}
                  {a.startTime ? new Date(a.startTime).toLocaleString() : "N/A"}
                </p>

                {isCompleted && (
                  <p className="text-green-600 font-medium mt-1">
                    Score: {a.score ?? 0}
                  </p>
                )}

                {/* STATUS */}
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                    isCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {isCompleted ? "Completed" : "In Progress"}
                </span>
              </div>

              {/* RIGHT */}
              <div className="flex gap-3">
                {!isCompleted && (
                  <button
                    onClick={() => navigate(`/student/exam/${a.exam?.id}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Resume
                  </button>
                )}

                {isCompleted && (
                  <button
                    onClick={() => navigate(`/student/results/${a.id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    View Result
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

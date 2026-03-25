import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ResultPage() {
  const { attemptId } = useParams();

  const [result, setResult] = useState(null);

  useEffect(() => {
    api
      .get(`/student/results/${attemptId}`)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [attemptId]);

  if (!result) return <p>Loading result...</p>;

  const percentage =
    result.totalQuestions > 0
      ? (result.score / result.totalQuestions) * 100
      : 0;

  const isPass = percentage >= 75;

  return (
    <div className="p-12 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-700  to-indigo-700 h-[calc(100vh-99px)] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        🎯 Exam Result
      </h1>

      <div className="bg-gradient-to-tr from-indigo-400 to-purple-400 text-white p-8 rounded-2xl shadow-lg w-96 text-center mb-6 hover:scale-[1.02] transition-transform duration-500">
        <h2 className="text-xl font-bold">Your Score</h2>
        <p className="text-6xl font-bold mt-2">{result.score}</p>
      
        <p className="mt-2 text-xl font-bold">{percentage.toFixed(1)}%</p>

        
        <div className="mt-3">
          {isPass ? (
            <span className="bg-green-200 text-green-600 px-5 py-2 rounded-2xl text-lg font-bold">
              ✅ PASS
            </span>
          ) : (
            <span className="bg-red-200 text-red-600 px-5 py-2 rounded-2xl text-lg font-bold">
              ❌ FAIL
            </span>
          )}
        </div>
      </div>

      {/* DETAILS */}
      <div className="bg-white p-6 rounded-2xl shadow w-96 space-y-4 hover:scale-[1.02] transition-transform duration-500 ">
        <div className="flex justify-between ">
          <span className="text-blue-600 font-semibold">Total Questions</span>
          <b className="text-blue-700 font-bold text-lg">{result.totalQuestions}</b>
        </div>

        <div className="flex justify-between">
          <span className="text-green-600 font-semibold">Correct Answers</span>
          <b className="text-green-700 font-bold text-lg">{result.correctAnswers}</b>
        </div>

        <div className="flex justify-between">
          <span className="text-red-600 font-semibold">Wrong Answers</span>
          <b className="text-red-700 font-bold text-lg">
            {result.totalQuestions - result.correctAnswers}
          </b>
        </div>

        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Submitted At</span>
          <span>{new Date(result.submittedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

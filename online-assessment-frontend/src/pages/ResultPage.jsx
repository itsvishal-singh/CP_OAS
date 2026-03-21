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
    <div className="p-10 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-indigo-700">
        🎯 Exam Result
      </h1>

      {/* SCORE CARD */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg w-96 text-center mb-6">
        <h2 className="text-lg">Your Score</h2>
        <p className="text-5xl font-bold mt-2">{result.score}</p>
        {/* PERCENTAGE */}
        <p className="mt-2 text-lg">{percentage.toFixed(1)}%</p>

        {/* PASS / FAIL BADGE */}
        <div className="mt-3">
          {isPass ? (
            <span className="bg-green-500 px-4 py-1 rounded-full text-sm font-semibold">
              ✅ PASS
            </span>
          ) : (
            <span className="bg-red-500 px-4 py-1 rounded-full text-sm font-semibold">
              ❌ FAIL
            </span>
          )}
        </div>
      </div>

      {/* DETAILS */}
      <div className="bg-white p-6 rounded-xl shadow w-96 space-y-3">
        <div className="flex justify-between">
          <span>Total Questions</span>
          <b>{result.totalQuestions}</b>
        </div>

        <div className="flex justify-between">
          <span>Correct Answers</span>
          <b className="text-green-600">{result.correctAnswers}</b>
        </div>

        <div className="flex justify-between">
          <span>Wrong Answers</span>
          <b className="text-red-500">
            {result.totalQuestions - result.correctAnswers}
          </b>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Submitted At</span>
          <span>{new Date(result.submittedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

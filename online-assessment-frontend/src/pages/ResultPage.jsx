import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ResultPage() {

  const { attemptId } = useParams();

  const [result, setResult] = useState(null);

  useEffect(() => {

    api.get(`/student/exams/results/${attemptId}`)
      .then(res => {
        setResult(res.data);
      })
      .catch(err => {
        console.error(err);
      });

  }, [attemptId]);

  if (!result) return <p>Loading result...</p>;

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">Exam Result</h1>

      <div className="bg-white p-6 rounded-xl shadow w-96">

        <p className="text-lg mb-2">
          Score: <b>{result.score}</b>
        </p>

        <p className="text-lg mb-2">
          Total Questions: <b>{result.totalQuestions}</b>
        </p>

        <p className="text-lg mb-2">
          Correct Answers: <b>{result.correctAnswers}</b>
        </p>

        <p className="text-lg">
          Submitted At: <b>{result.submittedAt}</b>
        </p>

      </div>

    </div>
  );
}
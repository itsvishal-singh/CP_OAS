import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ManageQuestions() {
  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState("");

  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editA, setEditA] = useState("");
  const [editB, setEditB] = useState("");
  const [editC, setEditC] = useState("");
  const [editD, setEditD] = useState("");
  const [editCorrect, setEditCorrect] = useState("");
  const [tab, setTab] = useState("add");

  useEffect(() => {
    loadExams();
    loadQuestions();
  }, []);

  const loadExams = async () => {
    const res = await api.get("/admin/exams");
    setExams(res.data);
  };

  const createQuestion = async (e) => {
    e.preventDefault();

    if (!examId) {
      toast.error("Please select an exam");
      return;
    }

    try {
      await api.post("/admin/questions/create", {
        examId,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
      });

      toast.success("Question added successfully");

      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("");
      loadQuestions();
    } catch (err) {
      toast.error("Failed to add question");
    }
  };
  const loadQuestions = async () => {
    const res = await api.get("/admin/questions/all");
    setQuestions(res.data);
  };
  const deleteQuestion = async (id) => {
    const confirmDelete = window.confirm(
      "⚠️ This question will be permanently deleted.\nDo you want to continue?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/questions/${id}`);

      toast.success("Question deleted");

      loadQuestions();
    } catch (err) {
      toast.error("Delete failed");
    }
  };
  const openEditModal = (q) => {
    setEditingQuestion(q);

    setEditQuestion(q.question);
    setEditA(q.optionA);
    setEditB(q.optionB);
    setEditC(q.optionC);
    setEditD(q.optionD);
    setEditCorrect(q.correctAnswer);
  };
  const updateQuestion = async () => {
    try {
      await api.put(`/admin/questions/update/${editingQuestion.id}`, {
        question: editQuestion,
        optionA: editA,
        optionB: editB,
        optionC: editC,
        optionD: editD,
        correctAnswer: editCorrect,
      });

      toast.success("Question updated successfully");

      setEditingQuestion(null);

      loadQuestions();
    } catch (err) {
      toast.error("Failed to update question");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl text-white font-bold mb-6">Manage Questions</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("add")}
          className={`px-4 py-2 rounded-xl ${
            tab === "add" ? "bg-white text-indigo" : "bg-green-600 text-white"
          }`}
        >
          Add Question
        </button>

        <button
          onClick={() => setTab("list")}
          className={`px-4 py-2 rounded-xl ${
            tab === "list" ? "bg-white text-indigo" : "bg-green-600 text-white"
          }`}
        >
          Question List
        </button>
      </div>

      {tab === "add" && (
        <div>
          <form
            onSubmit={createQuestion}
            className="bg-white p-6 rounded-xl shadow space-y-4"
          >
            {/* Select Exam */}

            <select
              className="border p-2 rounded w-full"
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
            >
              <option value="">Select Exam</option>

              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>

            {/* Question */}

            <input
              type="text"
              placeholder="Enter Question"
              className="border p-2 rounded w-full"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />

            {/* Options */}

            <input
              type="text"
              placeholder="Option A"
              className="border p-2 rounded w-full"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Option B"
              className="border p-2 rounded w-full"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Option C"
              className="border p-2 rounded w-full"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Option D"
              className="border p-2 rounded w-full"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              required
            />

            {/* Correct Answer */}

            <div className="flex gap-6">
              <p>Correct Option:</p>
              <label>
                <input
                  type="radio"
                  value="A"
                  checked={correctAnswer === "A"}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
                <span className="ml-3">A</span>
              </label>

              <label>
                <input
                  type="radio"
                  value="B"
                  checked={correctAnswer === "B"}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
                <span className="ml-2">B</span>
              </label>

              <label>
                <input
                  type="radio"
                  value="C"
                  checked={correctAnswer === "C"}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
                <span className="ml-2">C</span>
              </label>

              <label>
                <input
                  type="radio"
                  value="D"
                  checked={correctAnswer === "D"}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
                <span className="ml-2">D</span>
              </label>
            </div>

            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-green-600">
              Add Question
            </button>
          </form>
        </div>
      )}
      {tab === "list" && (
        <div className="bg-white rounded-xl shadow overflow-hidden mt-8">
          <table className="w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Question</th>
                <th className="p-4">Exam</th>
                <th className="p-4">Correct</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {questions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xl">📭</span>

                      <p className="text-lg font-semibold">
                        No questions found
                      </p>

                      <p className="text-sm text-gray-400">
                        Start by adding your first question
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                questions.map((q) => (
                  <tr key={q.id} className="border">
                    <td className="p-4">{q.id}</td>

                    <td className="p-4" title={q.question}>
                      {q.question.length > 50
                        ? q.question.substring(0, 50) + " ...."
                        : q.question}
                    </td>

                    <td className="p-4">{q.examTitle}</td>

                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {q.correctAnswer}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        className="bg-red-500 text-white px-3 py-1 my-1 rounded hover:bg-red-600"
                        onClick={() => deleteQuestion(q.id)}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => openEditModal(q)}
                        className="bg-green-500 text-white px-3 py-1 mx-2 my-1 rounded hover:bg-green-700 mr-2"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {editingQuestion && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-xl w-[500px]">
                <h2 className="text-xl font-bold mb-4">Edit Question</h2>

                <label className="font-semibold">Question</label>
                <input
                  className="border p-2 w-full mb-3 rounded"
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                />

                <label className="font-semibold">Option A</label>
                <input
                  className="border p-2 w-full mb-3 rounded"
                  value={editA}
                  onChange={(e) => setEditA(e.target.value)}
                />

                <label className="font-semibold">Option B</label>
                <input
                  className="border p-2 w-full mb-3 rounded"
                  value={editB}
                  onChange={(e) => setEditB(e.target.value)}
                />

                <label className="font-semibold">Option C</label>
                <input
                  className="border p-2 w-full mb-3 rounded"
                  value={editC}
                  onChange={(e) => setEditC(e.target.value)}
                />

                <label className="font-semibold">Option D</label>
                <input
                  className="border p-2 w-full mb-3 rounded"
                  value={editD}
                  onChange={(e) => setEditD(e.target.value)}
                />

                <label className="font-semibold">Correct Option</label>

                <div className="flex gap-4 mb-4 mt-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="A"
                      checked={editCorrect === "A"}
                      onChange={(e) => setEditCorrect(e.target.value)}
                    />{" "}
                    A
                  </label>

                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="B"
                      checked={editCorrect === "B"}
                      onChange={(e) => setEditCorrect(e.target.value)}
                    />{" "}
                    B
                  </label>

                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="C"
                      checked={editCorrect === "C"}
                      onChange={(e) => setEditCorrect(e.target.value)}
                    />{" "}
                    C
                  </label>

                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="D"
                      checked={editCorrect === "D"}
                      onChange={(e) => setEditCorrect(e.target.value)}
                    />{" "}
                    D
                  </label>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingQuestion(null)}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-green-600 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={updateQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-red-500 transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ManageExams() {
  const [exams, setExams] = useState([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editMarks, setEditMarks] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [editingExam, setEditingExam] = useState(null);
  const [marks, setMarks] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    const res = await api.get("/admin/exams");

    const examsWithCount = await Promise.all(
      res.data.map(async (exam) => {
        const countRes = await api.get(`/admin/questions/count/${exam.id}`);

        return {
          ...exam,
          questionCount: countRes.data,
        };
      })
    );

    setExams(examsWithCount);
  };

  const createExam = async (e) => {
    e.preventDefault();

    await api.post("/admin/exams", {
      title,
      durationMinutes: duration,
      totalMarks,
    });

    setTitle("");
    setDuration("");
    setTotalMarks("");

    loadExams();
  };

  const openEditModal = (exam) => {
    setEditingExam(exam);

    setEditTitle(exam.title);
    setEditDuration(exam.durationMinutes);
    setEditMarks(exam.totalMarks);
  };
  const deleteExam = async (id) => {
    const confirmDelete = window.confirm(
      "⚠️ This will permanently delete the Exam. Continue?"
    );

    if (!confirmDelete) return;
    try {
      await api.delete(`/admin/exams/${id}`);
      toast.success("Exam deleted successfully");
      loadExams();
    } catch (err) {
      toast.error("Failed to delete Exam");
    }
  };
  const updateExam = async () => {
    try {
      await api.put(`/admin/exams/${editingExam.id}`, {
        title: editTitle,
        durationMinutes: editDuration,
        totalMarks: editMarks,
      });

      setEditingExam(null);
      toast.success("Exam updated Successfully");
      loadExams();
    } catch (err) {
      toast.error("Failed to update Exam");
    }
  };
  const toggleExam = async (exam) => {
    try {
      await api.put(`/admin/exams/${exam.id}/toggle`);

      toast.success(
        exam.active ? "Exam closed Successfully" : "Exam activated Successfully"
      );

      loadExams();
    } catch (err) {
      toast.error("Failed to change Exam status");
    }
  };
  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl text-white font-bold mb-6">Manage Exams</h1>

      {/* Create Exam */}
      <form
        onSubmit={createExam}
        className="bg-white p-5 font-semibold rounded-xl shadow mb-6 flex gap-4 overflow-hidden"
      >
        <input
          type="text"
          placeholder="Exam Title"
          className="w-full text-blue-700 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          className="w-full text-blue-700 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Total Marks"
          className="w-full text-blue-700 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
          required
        />

        <button className="bg-indigo-600 text-white px-6 rounded-xl hover:bg-green-600 transition">
          Create
        </button>
      </form>

      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow mb-4 overflow-hidden w-full">
        <div className="flex items-center font-semibold gap-3">
          <input
            type="text"
            placeholder="Search Exam..."
            className="border p-2 font-semibold rounded-xl text-blue-700 w-80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setSearch("")}
            className="bg-gray-400 text-white px-2 py-2 mx-2  rounded-xl w-1/5  hover:bg-red-600 transition"
          >
            Clear
          </button>
          <button
            onClick={() => navigate(`/admin/questions?examId=${exams.id}`)}
            className="bg-gray-400 text-white px-2 py-2 mx-2  rounded-xl w-1/3  hover:bg-green-600 transition"
          >
            All Questions
          </button>
          <h2 className="text-indigo-600 bg-gray-200 px-4 py-2 w-60 rounded-xl text-lg">
            Total Exams: {filteredExams.length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-center ">
          <thead className="bg-gray-200 text-indigo-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Marks</th>
              <th className="p-4">Questions</th>
              <th className="p-4">Actions</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredExams.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📭</span>

                    <p className="text-lg font-semibold">No Exams found</p>

                    <p className="text-sm text-gray-400">
                      Create your first exam to get started
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredExams.map((exam) => (
                <tr key={exam.id} className="border">
                  <td className="p-4">{exam.id}</td>

                  <td className="p-4">{exam.title}</td>

                  <td className="p-4">{exam.durationMinutes} minutes</td>

                  <td className="p-4">{exam.totalMarks}</td>

                  <td className="p-4">{exam.questionCount}</td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteExam(exam.id)}
                      className="bg-fuchsia-600 text-white px-3 py-1 mx-1 my-1 rounded-xl font-semibold hover:bg-red-600 transition"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => openEditModal(exam)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-xl font-semibold hover:bg-green-500 mr-2 mx-1 my-1"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleExam(exam)}
                      className={`px-3 py-1 mx-1 my-1 rounded-xl font-semibold text-white ${
                        exam.active
                          ? "bg-yellow-500 hover:bg-red-500"
                          : "bg-blue-600 hover:bg-green-500"
                      }`}
                    >
                      {exam.active ? "Close" : "Activate"}
                    </button>
                  </td>

                  <td className="p-4">
                    {exam.active ? (
                      <span className="bg-green-100 text-green-500 px-3 py-1 rounded-xl text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-500 px-3 py-1 rounded-xl text-sm">
                        Closed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {editingExam && (
          <div className="fixed inset-0 flex items-center justify-center font-semibold text-indigo-600 bg-black bg-opacity-60">
            <div className="bg-white p-6 rounded-xl w-[400px] ">
              <h2 className="text-xl font-bold mb-4">Edit Exam</h2>

              <input
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <input
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3"
                value={editDuration}
                onChange={(e) => setEditDuration(e.target.value)}
              />

              <input
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3"
                value={editMarks}
                onChange={(e) => setEditMarks(e.target.value)}
              />

              <div className="flex justify-end mt-2 gap-2">
                <button
                  onClick={() => setEditingExam(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-red-500 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={updateExam}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-green-600 transition"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

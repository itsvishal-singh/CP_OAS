import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../layouts/AdminLayout";

import {
  Search,
  GraduationCap,
  ClipboardList,
  CheckCircle2,
  Trophy,
  BarChart3,
  RefreshCw,
} from "lucide-react";

export default function AdminResultReport() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  const [report, setReport] = useState(null);
  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const res = await api.get("/admin/exams");
      setExams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadReport = async (examId) => {
    if (!examId) return;

    try {
      setLoading(true);

      const analytics = await api.get(`/admin/reports/exam/${examId}`);

      const studentResults = await api.get(
        `/admin/reports/exam/${examId}/students`,
      );

      setReport(analytics.data);

      setStudents(studentResults.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      return (
        (student.studentName || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (student.studentEmail || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [students, search]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const cards = report
    ? [
        {
          title: "Total Attempts",
          value: report.totalAttempts,
          icon: <ClipboardList size={28} />,
          color: "bg-blue-100 text-blue-700",
        },

        {
          title: "Passed",
          value: report.passed,
          icon: <CheckCircle2 size={28} />,
          color: "bg-green-100 text-green-700",
        },

        {
          title: "Average Score",
          value: report.averageScore,
          icon: <BarChart3 size={28} />,
          color: "bg-yellow-100 text-yellow-700",
        },

        {
          title: "Highest Score",
          value: report.highestScore,
          icon: <Trophy size={28} />,
          color: "bg-purple-100 text-purple-700",
        },
      ]
    : [];

  return (
    <AdminLayout>
    <div>
      <div className="text-white font-semibold">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <GraduationCap size={44} />
              Result Reports
            </h1>
          <div>
            <label className="block text-lg mb-3">
              Select Exam
            </label>

            <div className="relative text-blue-700">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full bg-white rounded-xl px-5 py-4 flex justify-between items-center"
              >
                <span>
                  {selectedExam
                    ? exams.find((e) => e.id == selectedExam)?.title
                    : "📚 Choose an Exam"}
                </span>

                <span
                  className={`transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {showDropdown && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border overflow-hidden ">
                  {exams.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => {
                        setSelectedExam(exam.id);

                        setShowDropdown(false);

                        loadReport(exam.id);
                      }}
                      className={`w-full text-center px-5 py-4 transition hover:bg-indigo-600 hover:text-white border ${
                        selectedExam == exam.id
                          ? "bg-indigo-500 text-white"
                          : ""
                      }`}
                    >
                      {exam.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center pt-8 px-6">
            <button
              onClick={() => selectedExam && loadReport(selectedExam)}
              className="flex items-center gap-2 text-white font-semibold hover:scale-105 transition "
            >
              <RefreshCw size={24} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-3xl shadow-lg mt-8 p-16 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-700 mx-auto"></div>

          <p className="mt-6 text-lg font-semibold text-gray-600">
            Loading Report...
          </p>
        </div>
      )}

      {!loading && report && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 font-medium">{card.title}</p>

                    <h2 className="text-4xl font-bold mt-4 text-gray-800">
                      {card.value}
                    </h2>
                  </div>

                  <div className={`p-4 rounded-2xl ${card.color}`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-lg mt-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Student Results
                </h2>

                <p className="text-gray-500 mt-1">
                  Total Students : {filteredStudents.length}
                </p>
              </div>

              <div className="relative mt-5 lg:mt-0">
                <Search
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Search student..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full lg:w-80 border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white">
                  <tr>
                    <th className="text-left px-6 py-4">Student</th>

                    <th className="text-left px-6 py-4">Email</th>

                    <th className="text-center px-6 py-4">Score</th>

                    <th className="text-center px-6 py-4">Questions</th>

                    <th className="text-center px-6 py-4">Percentage</th>

                    <th className="text-center px-6 py-4">Status</th>

                    <th className="text-center px-6 py-4">Submitted</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-indigo-50 transition"
                    >
                      <td className="px-6 py-5 font-semibold text-gray-800">
                        {student.studentName}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {student.studentEmail}
                      </td>

                      <td className="text-center px-6 py-5 font-semibold">
                        {student.score}
                      </td>

                      <td className="text-center px-6 py-5">
                        {student.totalQuestions}
                      </td>

                      <td className="text-center px-6 py-5 font-semibold text-indigo-700">
                        {student.percentage}%
                      </td>

                      <td className="text-center px-6 py-5">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            student.status === "PASS"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td className="text-center px-6 py-5 text-gray-600">
                        {formatDate(student.submittedAt)}
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-16">
                        <div className="flex flex-col items-center">
                          <GraduationCap size={70} className="text-gray-300" />

                          <h2 className="text-2xl font-bold text-gray-500 mt-4">
                            No Student Records
                          </h2>

                          <p className="text-gray-400 mt-2">
                            No students have attempted this exam yet.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!loading && !report && (
        <div className="bg-white rounded-3xl shadow-lg mt-8 p-20">
          <div className="flex flex-col items-center">
            <GraduationCap size={90} className="text-indigo-400" />

            <h2 className="text-3xl font-bold mt-6 text-gray-700">
              Select an Exam
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Choose an exam from the dropdown above to view analytics and
              student results.
            </p>
          </div>
        </div>
      )}
    </div>
  </AdminLayout>
);
}

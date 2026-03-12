import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ManageUsers() {

  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("add");

  const [search, setSearch] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_STUDENT");

  const isMobileValid = mobile.length >= 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/users/create", {
        fullName,
        username: email,
        mobile,
        password,
        role,
      });

      toast.success("User added successfully");

      setFullName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setRole("ROLE_STUDENT");

      loadUsers();
    } catch {
      toast.error("Failed to add user");
    }
  };

  const toggleStudent = async (student) => {
    try {
      await api.put(`/admin/users/${student.id}/toggle`);

      toast.success(
        student.enabled ? "Student Disabled" : "Student Activated"
      );

      loadUsers();
    } catch {
      toast.error("Failed to change status");
    }
  };

  const students = users.filter((u) => u.role === "ROLE_STUDENT");

  const admins = users.filter((u) => u.role === "ROLE_ADMIN");

  const filteredStudents = students.filter((s) =>
    s.username.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAdmins = admins.filter((a) =>
    a.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl text-white font-bold mb-6">Manage Users</h1>

      {/* Tabs */}

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("add")}
          className={`px-4 py-2 rounded-xl ${
            tab === "add"
              ? "bg-white text-indigo-700"
              : "bg-green-600 text-white"
          }`}
        >
          Add User
        </button>

        <button
          onClick={() => setTab("students")}
          className={`px-4 py-2 rounded-xl ${
            tab === "students"
              ? "bg-white text-indigo-700"
              : "bg-green-600 text-white"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setTab("admins")}
          className={`px-4 py-2 rounded-xl ${
            tab === "admins"
              ? "bg-white text-indigo-700"
              : "bg-green-600 text-white"
          }`}
        >
          Admins
        </button>
      </div>

      {/* ADD USER FORM */}

      {tab === "add" && (
        <form
          onSubmit={createUser}
          className="bg-white p-6 rounded-xl shadow mb-6 flex gap-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Mobile"
            pattern="[0-9]{10,}"
            minLength={10}
            maxLength={10}
            className={`w-full border p-3 rounded-lg ${
              isMobileValid
                ? "focus:ring-indigo-400"
                : "focus:ring-red-400"
            }`}
            value={mobile}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setMobile(onlyDigits);
            }}
            required
          />

          <input
            type="text"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="border p-3 rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ROLE_STUDENT">Student</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>

          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl">
            Add
          </button>
        </form>
      )}

      {/* STUDENTS TAB */}

      {tab === "students" && (
        <>
          {/* Search */}

          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow mb-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search student..."
                className="border p-2 rounded w-80"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={() => setSearch("")}
                className="bg-gray-300 hover:bg-red-400 px-4 py-2 rounded-xl"
              >
                Clear
              </button>

              <h2 className="text-indigo-600 bg-gray-300 px-4 py-2 rounded-xl font-semibold">
                Total Students: {filteredStudents.length}
              </h2>
            </div>
          </div>

          {/* Table */}

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Mobile</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-gray-500">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="border">
                      <td className="p-4">{s.id}</td>
                      <td className="p-4">{s.fullName}</td>
                      <td className="p-4">{s.username}</td>
                      <td className="p-4">{s.mobile}</td>

                      <td className="p-4">
                        {s.enabled ? (
                          <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
                            Active
                          </span>
                        ) : (
                          <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
                            Disabled
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => toggleStudent(s)}
                          className={`px-3 py-1 rounded text-white ${
                            s.enabled
                              ? "bg-red-500"
                              : "bg-green-600"
                          }`}
                        >
                          {s.enabled ? "Disable" : "Enable"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ADMINS TAB */}

      {tab === "admins" && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile</th>
              </tr>
            </thead>

            <tbody>
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-6 text-gray-500">
                    No admins found
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((a) => (
                  <tr key={a.id} className="border">
                    <td className="p-4">{a.id}</td>
                    <td className="p-4">{a.fullName}</td>
                    <td className="p-4">{a.username}</td>
                    <td className="p-4">{a.mobile}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
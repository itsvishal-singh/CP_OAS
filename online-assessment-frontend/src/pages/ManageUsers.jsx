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

  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editMobile, setEditMobile] = useState("");
  const [editPassword, setEditPassword] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to load Users");
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

      toast.success("User Created");

      setFullName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setRole("ROLE_STUDENT");

      loadUsers();
    } catch {
      toast.error("Failed to create User");
    }
  };

  const toggleStudent = async (user) => {
    try {
      await api.put(`/admin/users/${user.id}/toggle`);

      toast.success(user.enabled ? "User Disabled" : "User Enabled");

      loadUsers();
    } catch {
      toast.error("Failed to change status");
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditName(user.fullName);
    setEditMobile(user.mobile);
    setEditPassword("");
  };

  const updateUser = async () => {
    try {
      await api.put(`/admin/users/${editingUser.id}/update`, {
        fullName: editName,
        mobile: editMobile,
        password: editPassword,
      });

      toast.success("User Updated");

      setEditingUser(null);

      loadUsers();
    } catch {
      toast.error("Update Failed");
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
  const isMobileValid = mobile.length >= 10;

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

      {/* ADD USER */}

      {tab === "add" && (
        <div className="bg-white p-6 rounded-3xl shadow-2xl w-[500px] p-8">
          <form onSubmit={createUser} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="tel"
              placeholder="+91- Mobile Number"
              pattern="[0-9]{10,}"
              minLength={10}
              maxLength={10}
              className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 ${
                isMobileValid ? "focus:ring-indigo-400" : "focus:ring-red-400 "
              }`}
              value={mobile}
              onChange={(e) => {
                // Allow only digits
                const onlyDigits = e.target.value.replace(/\D/g, "");
                setMobile(onlyDigits);
              }}
              required
            />

            <input
              type="text"
              placeholder="Password"
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <select
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="ROLE_STUDENT">Student</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setFullName("");
                  setEmail("");
                  setMobile("");
                  setPassword("");
                  setRole("ROLE_STUDENT");
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-red-500 transition"
              >
                Cancel
              </button>

              <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-green-700 transition">
                Add User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STUDENTS */}

      {tab === "students" && (
        <>
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow mb-4 overflow-hidden">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search Student..."
                className="border p-2 rounded-xl w-[400px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={() => setSearch("")}
                className="text-white bg-gray-400 hover:bg-red-600 px-4 py-2 rounded-xl"
              >
                Clear
              </button>

              <h2 className="text-indigo-600 bg-gray-200 px-4 py-2 rounded-xl ml-10 font-semibold">
                Total Students: {filteredStudents.length}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-center">
              <thead className="text-indigo-600 bg-gray-200">
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
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-xl text-sm">
                            Active
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-xl text-sm">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="p-4 flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="bg-blue-600 text-white px-4 py-1 rounded-xl hover:bg-green-700 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => toggleStudent(s)}
                          className={`px-3 py-1 rounded-xl text-white ${
                            s.enabled
                              ? "bg-red-500 hover:bg-red-600 transition"
                              : "bg-green-600 hover:bg-green-700 transition"
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

      {/* ADMINS */}

      {tab === "admins" && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-center">
            <thead className="text-indigo-600 bg-gray-200">
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

      {/* EDIT MODAL */}

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <h2 className="text-xl text-indigo-700 font-bold mb-8">Edit User</h2>

            <input
              className="w-full border p-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Full Name"
            />

            
            <input
            type="tel"
            placeholder="+91- Mobile Number"
            pattern="[0-9]{10,}"
            minLength={10}
            maxLength={10}
            className="w-full border p-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={editMobile}
            onChange={(e) => setEditMobile(e.target.value.replace(/\D/g, ""))
            }
            required
          />

            <input
              type="text"
              className="w-full border p-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              placeholder="New Password"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={updateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

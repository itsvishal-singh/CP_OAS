import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ManageUsers() {

  const [users,setUsers] = useState([])
  const [tab,setTab] = useState("add")

  const [search,setSearch] = useState("")

  const [fullName,setFullName] = useState("")
  const [email,setEmail] = useState("")
  const [mobile,setMobile] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("ROLE_STUDENT")

  const [editingUser,setEditingUser] = useState(null)
  const [editName,setEditName] = useState("")
  const [editMobile,setEditMobile] = useState("")
  const [editPassword,setEditPassword] = useState("")

  useEffect(()=>{
    loadUsers()
  },[])

  const loadUsers = async ()=>{
    try{
      const res = await api.get("/admin/users")
      setUsers(res.data)
    }
    catch{
      toast.error("Failed to load Users")
    }
  }

  const createUser = async(e)=>{
    e.preventDefault()

    try{
      await api.post("/admin/users/create",{
        fullName,
        username:email,
        mobile,
        password,
        role
      })

      toast.success("User Created")

      setFullName("")
      setEmail("")
      setMobile("")
      setPassword("")
      setRole("ROLE_STUDENT")

      loadUsers()
    }
    catch{
      toast.error("Failed to create User")
    }
  }

  const toggleStudent = async(user)=>{
    try{

      await api.put(`/admin/users/${user.id}/toggle`)

      toast.success(user.enabled ? "User Disabled" : "User Enabled")

      loadUsers()

    }
    catch{
      toast.error("Failed to change status")
    }
  }

  const openEditModal = (user)=>{
    setEditingUser(user)
    setEditName(user.fullName)
    setEditMobile(user.mobile)
    setEditPassword("")
  }

  const updateUser = async()=>{

    try{

      await api.put(`/admin/users/${editingUser.id}/update`,{
        fullName:editName,
        mobile:editMobile,
        password:editPassword
      })

      toast.success("User Updated")

      setEditingUser(null)

      loadUsers()

    }
    catch{
      toast.error("Update Failed")
    }

  }

  const students = users.filter(u=>u.role==="ROLE_STUDENT")
  const admins = users.filter(u=>u.role==="ROLE_ADMIN")

  const filteredStudents = students.filter(s=>
    s.username.toLowerCase().includes(search.toLowerCase())
  )

  const filteredAdmins = admins.filter(a=>
    a.username.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <AdminLayout>

      <h1 className="text-3xl text-white font-bold mb-6">Manage Users</h1>

      {/* Tabs */}

      <div className="flex gap-4 mb-6">

        <button
          onClick={()=>setTab("add")}
          className={`px-4 py-2 rounded-xl ${
            tab==="add" ? "bg-white text-indigo-700" : "bg-green-600 text-white"
          }`}
        >
          Add User
        </button>

        <button
          onClick={()=>setTab("students")}
          className={`px-4 py-2 rounded-xl ${
            tab==="students" ? "bg-white text-indigo-700" : "bg-green-600 text-white"
          }`}
        >
          Students
        </button>

        <button
          onClick={()=>setTab("admins")}
          className={`px-4 py-2 rounded-xl ${
            tab==="admins" ? "bg-white text-indigo-700" : "bg-green-600 text-white"
          }`}
        >
          Admins
        </button>

      </div>

      {/* ADD USER */}

      {tab==="add" &&(

        <div className="bg-white p-6 rounded-xl shadow w-[500px]">

          <form onSubmit={createUser} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded w-full"
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded w-full"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Mobile"
              className="border p-3 rounded w-full"
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Password"
              className="border p-3 rounded w-full"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <select
              className="border p-3 rounded w-full"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
            >
              <option value="ROLE_STUDENT">Student</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={()=>{

                  setFullName("")
                  setEmail("")
                  setMobile("")
                  setPassword("")
                  setRole("ROLE_STUDENT")

                }}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>

              <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Add User
              </button>

            </div>

          </form>

        </div>

      )}

      {/* STUDENTS */}

      {tab==="students" &&(

        <>

        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow mb-4">

          <div className="flex items-center gap-3">

            <input
              type="text"
              placeholder="Search student..."
              className="border p-2 rounded w-80"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />

            <button
              onClick={()=>setSearch("")}
              className="bg-gray-300 hover:bg-red-400 px-4 py-2 rounded-xl"
            >
              Clear
            </button>

            <h2 className="text-indigo-600 bg-gray-300 px-4 py-2 rounded-xl font-semibold">
              Total Students: {filteredStudents.length}
            </h2>

          </div>

        </div>

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

              {filteredStudents.length===0 ?(

                <tr>
                  <td colSpan="6" className="p-6 text-gray-500">
                    No students found
                  </td>
                </tr>

              ):filteredStudents.map(s=>(

                <tr key={s.id} className="border">

                  <td className="p-4">{s.id}</td>
                  <td className="p-4">{s.fullName}</td>
                  <td className="p-4">{s.username}</td>
                  <td className="p-4">{s.mobile}</td>

                  <td className="p-4">

                    {s.enabled ?

                      <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>

                      :

                      <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
                        Disabled
                      </span>

                    }

                  </td>

                  <td className="p-4 flex justify-center gap-2">

                    <button
                      onClick={()=>openEditModal(s)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>toggleStudent(s)}
                      className={`px-3 py-1 rounded text-white ${
                        s.enabled ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {s.enabled ? "Disable" : "Enable"}
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        </>

      )}

      {/* ADMINS */}

      {tab==="admins" &&(

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

              {filteredAdmins.length===0 ?(

                <tr>
                  <td colSpan="4" className="p-6 text-gray-500">
                    No admins found
                  </td>
                </tr>

              ):filteredAdmins.map(a=>(

                <tr key={a.id} className="border">

                  <td className="p-4">{a.id}</td>
                  <td className="p-4">{a.fullName}</td>
                  <td className="p-4">{a.username}</td>
                  <td className="p-4">{a.mobile}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* EDIT MODAL */}

      {editingUser &&(

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

          <div className="bg-white p-6 rounded-xl w-[450px]">

            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <input
              className="border p-2 w-full mb-3 rounded"
              value={editName}
              onChange={(e)=>setEditName(e.target.value)}
              placeholder="Full Name"
            />

            <input
              className="border p-2 w-full mb-3 rounded"
              value={editMobile}
              onChange={(e)=>setEditMobile(e.target.value)}
              placeholder="Mobile"
            />

            <input
              type="text"
              className="border p-2 w-full mb-3 rounded"
              value={editPassword}
              onChange={(e)=>setEditPassword(e.target.value)}
              placeholder="New Password (optional)"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={()=>setEditingUser(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>

  )

}
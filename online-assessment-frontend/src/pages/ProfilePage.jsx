import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/student/profile");
      setProfile(res.data);
    } catch (err) {
      console.error("Profile API error:", err);
    }
  };
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    await api.put("/student/profile", profile);
    setEdit(false);
    localStorage.setItem("fullName", profile.fullName);
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow w-96">
        <label>Name</label>
        <input
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          disabled={!edit}
          className="w-full border p-2 mb-3"
        />

        <label>Email</label>
        <input
          value={profile.username}
          disabled
          className="w-full border p-2 mb-3"
        />

        <label>Mobile</label>
        <input
          name="mobile"
          value={profile.mobile}
          onChange={handleChange}
          disabled={!edit}
          className="w-full border p-2 mb-3"
        />

        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={updateProfile}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

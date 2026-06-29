import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  User,
  Mail,
  Phone,
  Lock,
  Camera,
  Pencil,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",

    username: "",

    mobile: "",

    role: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/student/profile");

      setProfile(res.data);

      setFormData({
        fullName: res.data.fullName,

        username: res.data.username,

        mobile: res.data.mobile,

        role: res.data.role,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const initials = () => {
    if (!formData.fullName) return "U";

    return formData.fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  const handleSave = async () => {
    try {
      await api.put("/student/profile", {
        fullName: formData.fullName,

        mobile: formData.mobile,
      });

      setProfile(formData);

      setEditMode(false);

      alert("Profile updated successfully.");
    } catch (err) {
      console.log(err);

      alert("Unable to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* HERO */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 text-white shadow-xl p-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Left */}

          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <GraduationCap size={40} />
              My Profile
            </h1>

            <p className="mt-4 text-indigo-100 text-lg">
              Manage your personal information and account settings.
            </p>
          </div>

          {/* Avatar */}

          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-white text-indigo-700 flex items-center justify-center text-5xl font-bold shadow-2xl">
                {initials()}
              </div>

              <button className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full shadow-lg transition">
                <Camera size={18} />
              </button>
            </div>

            <h2 className="mt-5 text-4xl font-bold">{formData.fullName}</h2>

            <p className="text-indigo-100">Student</p>
          </div>

          {/* Account */}

          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-6">
            <div className="flex items-center gap-3">
              <ShieldCheck />

              <span className="font-semibold">Account Status</span>
            </div>

            <h2 className="mt-3 text-2xl font-bold">Active</h2>

            <p className="mt-2 text-indigo-100">Secure Student Account</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Card */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Personal Information
              </h2>

              <p className="text-gray-500 mt-2">
                Update your personal details.
              </p>
            </div>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            ) : null}
          </div>

          {/* Full Name */}

          <div className="mb-6">
            <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <User size={18} />
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              disabled={!editMode}
              onChange={handleChange}
              className={`w-full rounded-xl border-2 p-4 transition ${
                editMode
                  ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100"
              }`}
            />
          </div>

          {/* Email */}

          <div className="mb-6">
            <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <Mail size={18} />
              Email Address
            </label>

            <div className="relative">
              <input
                type="email"
                value={formData.username}
                disabled
                className="w-full rounded-xl bg-gray-100 border-2 border-gray-300 p-4 pr-14"
              />

              <Lock
                size={18}
                className="absolute right-5 top-5 text-gray-500"
              />
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Email address cannot be changed.
            </p>
          </div>

          {/* Mobile */}

          <div className="mb-8">
            <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <Phone size={18} />
              Mobile Number
            </label>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              disabled={!editMode}
              onChange={handleChange}
              className={`w-full rounded-xl border-2 p-4 transition ${
                editMode
                  ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100"
              }`}
            />
          </div>

          {/* Buttons */}

          {editMode && (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
              >
                Save Changes
              </button>

              <button
                onClick={() => {
                  setEditMode(false);

                  setFormData({
                    fullName: profile.fullName,

                    username: profile.username,

                    mobile: profile.mobile,

                    role: profile.role,
                  });
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Right Card */}

        <div className="bg-white rounded-3xl shadow-xl p-8 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Account Information
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-gray-500">Role</p>

              <h3 className="font-bold text-lg">Student</h3>
            </div>

            <div>
              <p className="text-gray-500">Status</p>

              <span className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                Active
              </span>
            </div>

            <div>
              <p className="text-gray-500">Registered Email</p>

              <h3 className="font-semibold break-all">{formData.username}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
          <p className="text-gray-500 font-medium">Attempted Exams</p>

          <h2 className="text-5xl font-bold text-indigo-700 mt-4">0</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
          <p className="text-gray-500 font-medium">Passed Exams</p>

          <h2 className="text-5xl font-bold text-green-600 mt-4">0</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
          <p className="text-gray-500 font-medium">Average Score</p>

          <h2 className="text-5xl font-bold text-purple-700 mt-4">0%</h2>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-10 bg-white rounded-3xl shadow-lg p-6 text-center">
        <h2 className="text-xl font-bold text-gray-700">Student Profile</h2>

        <p className="text-gray-500 mt-2">
          Keep your profile information updated for a better assessment
          experience.
        </p>
      </div>
    </div>
  );
}

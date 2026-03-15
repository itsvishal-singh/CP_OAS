import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-indigo-600 via-blue-900 to-purple-600 p-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
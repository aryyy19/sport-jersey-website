import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold mb-8">Sport Jersey</h2>

      <nav className="flex flex-col gap-3">
        <Link
          to="/admin/dashboard"
          className="rounded-lg bg-gray-700 px-4 py-3 hover:bg-gray-600"
        >
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}

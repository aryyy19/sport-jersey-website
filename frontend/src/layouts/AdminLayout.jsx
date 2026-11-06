import { Outlet } from "react-router-dom";
import AdminSidebar from "../features/admin/components/AdminSidebar";
import AdminHeader from "../features/admin/components/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

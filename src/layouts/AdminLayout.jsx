import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout-parts/AdminSidebar';

function AdminLayout() {
  return (
    // Dùng div và class Tailwind giống UserLayout.jsx
    <div className="flex min-h-screen bg-[#1E1E1E]"> {/* Màu nền tối giống user layout */}
      {/* Sidebar admin */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-6 overflow-auto"> {/* Thêm overflow-auto nếu nội dung dài */}
        <Outlet /> {/* Nội dung các trang admin con sẽ hiển thị ở đây */}
      </main>
    </div>
  );
}

export default AdminLayout;
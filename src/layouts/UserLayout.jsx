import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout-parts/Sidebar';

function UserLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-6 bg-[#1E1E1E]">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;

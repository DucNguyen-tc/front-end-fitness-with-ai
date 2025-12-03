import {
  Dashboard, // Icon Dashboard
  People, // Icon Quản lý Người dùng
  FitnessCenter, // Icon Quản lý Bài tập
  Assignment, // Icon Quản lý Kế hoạch (Plan)
  Logout,
  Category as CategoryIcon, // Icon Quản lý Nhóm cơ
} from "@mui/icons-material";
import logo from "../../assets/logo.png"; // Dùng lại logo cũ
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../stores/UserContext"; // Lấy thông tin user (admin)

const AdminSidebar = () => {
  const { user } = useContext(UserContext);

  // Hàm xử lý đăng xuất (tạm thời, có thể hoàn thiện sau)
  const handleLogout = () => {
    // Gọi hàm logout từ UserContext hoặc authService
    console.log("Đăng xuất...");
    // Ví dụ: logout(); // Cần import hàm logout nếu dùng
    // Hoặc điều hướng về trang login
    // navigate('/login');
  };

  return (
    // Sử dụng class Tailwind tương tự Sidebar.jsx
    <div className="sticky top-0 left-0 h-screen w-64 bg-black text-gray-200 flex flex-col justify-between p-4 flex-shrink-0">
      {/* Phần trên: Logo, User, Menu */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">
            <span className="text-red-500">FITNESS</span> <br /> KouDAn
          </h1>
        </div>

        <div className="border-t border-dashed border-gray-700 my-4"></div>

        {/* User Info (Admin) */}
        <div className="bg-gray-800 rounded-lg p-4 flex items-center mb-6">
          <img
            src="https://cdn-icons-png.freepik.com/512/8793/8793855.png" // Thay avatar admin nếu muốn
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p className="font-medium">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-400">Quản trị viên</p>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-700 my-4"></div>

        {/* Admin Menu */}
        <nav className="flex flex-col gap-2">
          {/* Dashboard */}
          <NavLink
            to="/admin" // Đường dẫn gốc của admin
            end // Chỉ active khi khớp chính xác
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                isActive
                  ? "bg-red-500 text-white shadow-lg" // Style khi active
                  : "hover:bg-red-500 hover:text-white hover:bg-opacity-80" // Style khi hover
              }`
            }
          >
            <Dashboard /> Dashboard
          </NavLink>

          {/* Quản lý Người dùng */}
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                isActive
                  ? "bg-red-500 text-white shadow-lg"
                  : "hover:bg-red-500 hover:text-white hover:bg-opacity-80"
              }`
            }
          >
            <People /> Quản lý Người dùng
          </NavLink>

          {/* Quản lý Bài tập */}
          <NavLink
            to="/admin/workouts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                isActive
                  ? "bg-red-500 text-white shadow-lg"
                  : "hover:bg-red-500 hover:text-white hover:bg-opacity-80"
              }`
            }
          >
            <FitnessCenter /> Quản lý Bài tập
          </NavLink>
          {/* Quản lý Nhóm cơ */}
          <NavLink
            to="/admin/muscle-groups"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                isActive
                  ? "bg-red-500 text-white shadow-lg"
                  : "hover:bg-red-500 hover:text-white hover:bg-opacity-80"
              }`
            }
          >
            <CategoryIcon /> Quản lý Nhóm cơ
          </NavLink>


          {/* Quản lý Kế hoạch */}
          <NavLink
            to="/admin/plans"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                isActive
                  ? "bg-red-500 text-white shadow-lg"
                  : "hover:bg-red-500 hover:text-white hover:bg-opacity-80"
              }`
            }
          >
            <Assignment /> Quản lý Kế hoạch
          </NavLink>
        </nav>
      </div>

      {/* Phần dưới: Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 hover:text-white transition text-sm font-medium"
        >
          <Logout /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
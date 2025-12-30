import {
  Home,
  BarChart,
  Article,
  ContactMail,
  Logout,
  FitnessCenter,
  Timeline
} from "@mui/icons-material";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../stores/UserContext";
import { logout as authLogout } from "../../services/authService";


const Sidebar = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await authLogout();
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      logout();
      window.location.href = "/login";
    }
  };
  return (
    <div className="sticky top-0 left-0 h-screen w-64 bg-black text-gray-200 flex flex-col justify-between p-4">
      {/* Logo */}
      <div>
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">
            <span className="text-red-500">FITNESS</span> <br /> KouDAn
          </h1>
        </div>

        <div className="border-t-3 border-dashed border-gray-400 my-4"></div>

        {/* User */}
        <div className="bg-gray-800 rounded-lg p-4 flex items-center mb-6">
          <img
            src="https://cdn-icons-png.freepik.com/512/6323/6323211.png"
            alt="avatar"
            className="w-16 h-20 rounded-4xl object-cover mb-2"
          />
          <p className="font-medium ml-4">{user?.name || "User"}</p>
        </div>

        <div className="border-t-3 border-dashed border-gray-400 my-4"></div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/user/plan"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-500 hover:text-white"
              }`
            }
          >
            <Timeline fontSize="large" /> Kế hoạch tập luyện
          </NavLink>
          <NavLink
            to="/user/progress"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-500 hover:text-white"
              }`
            }
          >
            <BarChart fontSize="large" /> Tiến độ
          </NavLink>
          <NavLink
            to="/user/exercise"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-500 hover:text-white"
              }`
            }
          >
            <FitnessCenter fontSize="large" /> Bài tập
          </NavLink>
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-500 hover:text-white"
              }`
            }
          >
            <ContactMail fontSize="large" /> Profile
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
        >
          <Logout fontSize="large" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

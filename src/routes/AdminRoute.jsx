import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout"; // Đảm bảo đã import AdminLayout
import DashboardPage from "../pages/admin/Dahsboard/DashboardPage";
// Import các trang admin khác ở đây
import UserListPage from "../pages/admin/Users/UserListPage";
import WorkoutListPage from "../pages/admin/Workouts/WorkoutListPage";
import MuscleGroupListPage from "../pages/admin/MuscleGroups/MuscleGroupListPage";
import PlanListPage from "../pages/admin/Plans/PlanListPage";
function AdminRoute() {
  return (
    <Routes>
      {/* Sử dụng AdminLayout làm layout cha */}
      <Route path="/" element={<AdminLayout />}>
        {/* Trang mặc định khi vào /admin */}
        <Route index element={<DashboardPage />} />

        {/* Các trang con khác */}
        <Route path="users" element={<UserListPage />} />
        {/* <Route path="users" element={<UserListPage />} /> */}
        {/* <Route path="workouts" element={...} /> */}
        <Route path="workouts" element={<WorkoutListPage />} />
        {/* <Route path="plans" element={...} /> */}
        <Route path="muscle-groups" element={<MuscleGroupListPage />} />
        <Route path="plans" element={<PlanListPage />} />


      </Route>
    </Routes>
  );
}

export default AdminRoute;
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dahsboard/DashboardPage";


function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
      </Route>
    </Routes>
  );
}

export default AdminRoute;
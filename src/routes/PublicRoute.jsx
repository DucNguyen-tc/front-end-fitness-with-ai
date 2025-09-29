import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/public/Home/HomePage";
import LoginPage from "../pages/public/Auth/LoginPage";


function PublicRoute() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default PublicRoute;
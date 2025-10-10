import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ExerciseGrid from "../pages/user/Exercise/ExerciseGrid";
import Profile from "../pages/user/profile/Profile";


function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/exercise" element={<ExerciseGrid />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default UserRoute;
import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ExerciseGrid from "../pages/user/Exercise/ExerciseGrid";
import Profile from "../pages/user/profile/Profile";
import WorkoutList from "../pages/user/Exercise/Workout";
import WeeklyWorkoutPlan from "../pages/user/Plan/Plan";
import Progress from "../pages/user/Progress/Progress";

function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="exercise" element={<ExerciseGrid />} />
        <Route path="exercise/:muscleGroupName" element={<WorkoutList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="plan" element={<WeeklyWorkoutPlan />} />
        <Route path="progress" element={<Progress />} />
      </Route>
    </Routes>
  );
}

export default UserRoute;

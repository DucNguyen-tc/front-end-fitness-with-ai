import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ExerciseGrid from "../pages/user/Exercise/ExerciseGrid";
import Profile from "../pages/user/profile/Profile";
import WorkoutList from "../pages/user/Exercise/Workout";
import WeeklyWorkoutPlan from "../pages/user/Plan/Plan";
import Process from "../pages/user/Process/Process";
import WorkoutScreen from "../pages/user/Plan/test";

function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="exercise" element={<ExerciseGrid />} />
        <Route path="exercise/:muscleGroupName" element={<WorkoutList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="plan" element={<WeeklyWorkoutPlan />} />
        <Route path="process" element={<Process />} />
        <Route path="test" element={<WorkoutScreen />} />
      </Route>
    </Routes>
  );
}

export default UserRoute;

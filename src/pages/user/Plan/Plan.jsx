import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import WeeksList from "./WeekList";
import WeekDetails from "./WeekDetails";
import SessionDetails from "./SessionDetails";
import WorkoutPlanDetailModal from "./WorkoutPlanDetailModal";
import { getUserByAccountId } from "../../../services/userService";
import { UserContext } from "../../../stores/UserContext";
import { getPlanByUserId } from "../../../services/planService";
import WorkoutPlayer from "./WorkoutPlayer";

const WorkoutPlanDashboard = () => {
  const [plan, setPlan] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectPlayingSession, setSelectPlayingSession] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [userData, setUserData] = useState(null);
  const { user } = useContext(UserContext);

 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.sub) return;
        const data = await getUserByAccountId(user.sub);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [user?.sub]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        if (!userData?.data?._id) return;
        const response = await getPlanByUserId(userData.data._id);
        setPlan(response.data);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };
    fetchPlan();
  }, [userData]);


  return (
    <Box p={3} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {!selectedWeek && (
        <WeeksList
          weeks={plan}
          onSelectWeek={setSelectedWeek}
          WeekPlan={userData?.data}
        />
      )}

      {selectedWeek && !selectedSession && (
        <WeekDetails
          week={selectedWeek}
          onBack={() => setSelectedWeek(null)}
          onSelectSession={setSelectedSession}
        />
      )}

      {selectedSession && !selectPlayingSession && (
        <SessionDetails
          session={selectedSession}
          onBack={() => setSelectedSession(null)}
          onStartWorkout={setSelectPlayingSession}
          onSelectWorkout={setSelectedWorkout}
        />
      )}

      {selectPlayingSession && (
        <WorkoutPlayer
          workouts={selectPlayingSession}
          onExit={() => setSelectPlayingSession(null)}
          sessionId={selectedSession._id}
          planId={selectedWeek._id}
        />
      )}

      {selectedWorkout && (
        <WorkoutPlanDetailModal
          workout={selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
        />
      )}
    </Box>
  );
};

export default WorkoutPlanDashboard;

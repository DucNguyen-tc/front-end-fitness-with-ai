// src/pages/user/WorkoutList.js

import { useEffect, useState } from "react";
// THÊM: import useNavigate
import { useParams, useNavigate } from "react-router-dom";
// THÊM: import IconButton
import { Grid, Card, Typography, Box, IconButton } from "@mui/material";
// THÊM: import Icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getWorkoutByMuscleGroup } from "../../../services/workoutService";
import WorkoutDetails from "./WorkoutDetails";

export default function WorkoutList() {
  const { muscleGroupName } = useParams();
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  
  // THÊM: Khởi tạo hook navigate
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWorkouts() {
      const res = await getWorkoutByMuscleGroup(muscleGroupName);
      setWorkouts(res.data);
    }
    fetchWorkouts();
  }, [muscleGroupName]);

  const handleOpenDetails = (workoutId) => {
    setSelectedWorkoutId(workoutId);
  };

  const handleCloseDetails = () => {
    setSelectedWorkoutId(null);
  };

  return (
    <Box p={3}>
      {/* THAY ĐỔI: Tạo header mới chứa nút quay lại và tiêu đề */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton
          onClick={() => navigate(-1)} // Khi click sẽ quay lại trang trước
          sx={{ 
            color: 'white', 
            mr: 2, 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold" color="white">
          {muscleGroupName} EXERCISE
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {workouts.map((w) => (
          <Grid key={w._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              onClick={() => handleOpenDetails(w._id)}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 4,
                color: "white",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.25)",
                  backgroundColor: "#dc2d2d",
                },
              }}
            >
              <Box component="img" src={w.imageURL} alt={w.name} sx={{ width: 70, height: 70, borderRadius: 3, objectFit: "cover", marginRight: 2 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">{w.name}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Độ khó: {w.difficulty}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {selectedWorkoutId && (
        <WorkoutDetails
          workoutId={selectedWorkoutId}
          onClose={handleCloseDetails}
        />
      )}
    </Box>
  );
}
// src/pages/user/WorkoutList.js

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card, Typography, Box, IconButton, Chip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import { getWorkoutByMuscleGroup } from "../../../services/workoutService";
import WorkoutDetails from "./WorkoutDetails";

export default function WorkoutList() {
  const { muscleGroupName } = useParams();
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [groupedWorkouts, setGroupedWorkouts] = useState({});
  
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWorkouts() {
      const res = await getWorkoutByMuscleGroup(muscleGroupName);
      console.log(res.data);
      setWorkouts(res.data);
      
      // Phân loại bài tập theo độ khó
      const grouped = res.data.reduce((acc, workout) => {
        const difficulty = workout.difficulty?.toLowerCase() || 'beginner';
        if (!acc[difficulty]) {
          acc[difficulty] = [];
        }
        acc[difficulty].push(workout);
        return acc;
      }, {});
      
      setGroupedWorkouts(grouped);
    }
    fetchWorkouts();
  }, [muscleGroupName]);

  const handleOpenDetails = (workoutId) => {
    setSelectedWorkoutId(workoutId);
  };

  const handleCloseDetails = () => {
    setSelectedWorkoutId(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner': return '#4caf50'; // Xanh lá
      case 'intermediate': return '#ff9800'; // Cam
      case 'advanced': return '#f44336'; // Đỏ
      default: return '#9e9e9e'; // Xám
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner': return 'MỚI BẮT ĐẦU';
      case 'intermediate': return 'TRUNG CẤP';
      case 'advanced': return 'NÂNG CAO';
      default: return difficulty?.toUpperCase() || 'BEGINNER';
    }
  };

  const difficultyOrder = ['beginner', 'intermediate', 'advanced'];

  return (
    <Box 
      p={3} 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ 
            color: 'white', 
            mr: 2, 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FitnessCenterIcon sx={{ color: '#ff4757', fontSize: 32, mr: 2 }} />
          <Typography variant="h4" fontWeight="bold" color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {muscleGroupName?.toUpperCase()} EXERCISES
          </Typography>
        </Box>
      </Box>

      {/* Hiển thị bài tập theo từng cấp độ */}
      {difficultyOrder.map((difficulty) => (
        groupedWorkouts[difficulty]?.length > 0 && (
          <Box key={difficulty} sx={{ mb: 5 }}>
            {/* Header cho từng cấp độ */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 4,
                  height: 30,
                  backgroundColor: getDifficultyColor(difficulty),
                  borderRadius: 2,
                  mr: 2
                }}
              />
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                color="white"
                sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
              >
                {getDifficultyLabel(difficulty)}
              </Typography>
              <Chip
                label={`${groupedWorkouts[difficulty].length} bài tập`}
                sx={{
                  ml: 2,
                  backgroundColor: getDifficultyColor(difficulty),
                  color: 'white',
                  fontWeight: 'bold'
                }}
                size="small"
              />
            </Box>

            {/* Grid bài tập */}
            <Grid container spacing={3}>
              {groupedWorkouts[difficulty].map((w) => (
                <Grid key={w._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card
                    onClick={() => handleOpenDetails(w._id)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderRadius: 3,
                      color: "white",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      border: `2px solid ${getDifficultyColor(w.difficulty)}20`,
                      overflow: 'hidden',
                      backdropFilter: 'blur(10px)',
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 12px 24px ${getDifficultyColor(w.difficulty)}40`,
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        border: `2px solid ${getDifficultyColor(w.difficulty)}60`,
                      },
                    }}
                  >
                    {/* Hình ảnh */}
                    <Box 
                      sx={{ 
                        width: '100%', 
                        height: 200, 
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        component="img" 
                        src={w.imageURL} 
                        alt={w.name}
                        sx={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: "cover",
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }} 
                      />
                    </Box>
                    
                    {/* Nội dung */}
                    <Box sx={{ p: 2.5 }}>
                      <Typography 
                        variant="h6" 
                        fontWeight="bold" 
                        sx={{ 
                          mb: 1,
                          fontSize: '1.1rem',
                          lineHeight: 1.3
                        }}
                      >
                        {w.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Chip
                          label={getDifficultyLabel(w.difficulty)}
                          size="small"
                          sx={{
                            backgroundColor: getDifficultyColor(w.difficulty),
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.7rem'
                          }}
                        />
                        
                        {w.calories && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              opacity: 0.9,
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 2,
                              fontSize: '0.8rem'
                            }}
                          >
                            🔥 {w.calories} cal
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      ))}

      {/* Hiển thị thông báo nếu không có bài tập nào */}
      {workouts.length === 0 && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            flexDirection: 'column',
            color: 'white'
          }}
        >
          <FitnessCenterIcon sx={{ fontSize: 64, opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" sx={{ opacity: 0.7 }}>
            Chưa có bài tập nào cho nhóm cơ này
          </Typography>
        </Box>
      )}
      
      {selectedWorkoutId && (
        <WorkoutDetails
          workoutId={selectedWorkoutId}
          onClose={handleCloseDetails}
        />
      )}
    </Box>
  );
}
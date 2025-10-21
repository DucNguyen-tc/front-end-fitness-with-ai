// src/pages/user/WorkoutDetails.js

import { useEffect, useState } from "react";
import { Box, Typography, Grid, Dialog, DialogContent, DialogTitle, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Icon cho độ khó
import AccessTimeIcon from '@mui/icons-material/AccessTime';     // Icon cho thời gian
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'; // Icon cho calories

import { getWorkoutById } from "../../../services/workoutService";

export default function WorkoutDetails({ workoutId, onClose }) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workoutId) return;
    
    setLoading(true);
    async function fetchWorkout() {
      try {
        const res = await getWorkoutById(workoutId);
        setWorkout(res.data);
      } catch (error) {
        console.error("Failed to fetch workout details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkout();
  }, [workoutId]);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: { borderRadius: 4 }
        }
        
      }}
    >
      {/* Nút đóng */}
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.700', zIndex: 100 }}>
        <CloseIcon />
      </IconButton>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      ) : workout && (
        <>
          {/* Tiêu đề */}
          <DialogTitle variant="h5" fontWeight="bold" sx={{ textAlign: 'center', pt: 4, pb: 2, color: 'text.primary' }}>
            {workout.name}
          </DialogTitle>
          
          <DialogContent dividers sx={{ pb: 3 }}> {/* dividers tạo đường kẻ phân cách */}
            {/* Video chính */}
            <Box sx={{ width: '100%', borderRadius: 3, overflow: 'hidden', mb: 3, bgcolor: '#1A5F7A' }}>
              {workout.mediaURL ? (
                <video 
                  src={workout.mediaURL} 
                  loop 
                  autoPlay 
                  muted 
                  playsInline 
                  style={{ width: "100%", display: 'block' }} 
                />
              ) : (
                 <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Typography variant="h6">Không có video</Typography>
                 </Box>
              )}
            </Box>

            {/* Thông tin chi tiết và Hướng dẫn (chia 2 cột) */}
            <Grid container spacing={15}>
              <Grid xs={12} md={6}>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  Hướng dẫn:
                </Typography>
                <Box 
                  sx={{ 
                    bgcolor: 'grey.100', 
                    borderRadius: 2, 
                    p: 2, 
                    maxHeight: 200, 
                    overflowY: 'auto' 
                  }}
                >
                  {workout.instructions.map((step, i) => (
                    <Typography key={i} variant="body1" sx={{ mb: 0.5 }}>
                      - {step}
                    </Typography>
                  ))}
                </Box>
              </Grid>
              {/* Cột trái: Độ khó, Thời gian, Calories */}
              <Grid xs={12} md={6}>
                {/* Độ khó */}
                <Box display="flex" alignItems="center" mt={1.5}>
                  <FitnessCenterIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6">
                    <strong>Độ khó:</strong> {workout.difficulty}
                  </Typography>
                </Box>
                {/* Calories */}
                <Box display="flex" alignItems="center" mt={1.5}>
                  <LocalFireDepartmentIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6">
                    <strong>Calories:</strong> {workout.caloriesBurnedPerMinute}
                  </Typography>
                </Box>
              </Grid>

              {/* Cột phải: Hướng dẫn */}
              
            </Grid>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
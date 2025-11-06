// src/pages/user/WorkoutDetails.js

import { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  Typography, 
  Box, 
  IconButton, 
  Grid,
  Chip,
  Stack,
  Card,
  CardContent,
  LinearProgress,
  CircularProgress,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

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

  if (loading) {
    return (
      <Dialog open={true} onClose={onClose}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, width: 400 }}>
          <CircularProgress sx={{ color: '#dc2d2d' }} />
        </Box>
      </Dialog>
    );
  }

  if (!workout) {
    return null;
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner': return '#4caf50';
      case 'intermediate': return '#ff9800';
      case 'advanced': return '#dc2d2d';
      default: return '#dc2d2d';
    }
  };

  const getDifficultyValue = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner': return 33;
      case 'intermediate': return 66;
      case 'advanced': return 100;
      default: return 50;
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

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      fullWidth 
      maxWidth="lg" // Đổi từ "md" thành "lg" để tăng chiều rộng
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            background: '#1a1a1a',
            overflow: 'hidden',
            border: '1px solid #333',
            maxWidth: '1000px', // Thêm maxWidth để kiểm soát kích thước tối đa
            width: '95%', // Chiếm 95% chiều rộng màn hình
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: '#000',
          color: 'white',
          position: 'relative',
          p: 4,
          borderBottom: '2px solid #dc2d2d'
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
            bgcolor: '#333',
            '&:hover': {
              bgcolor: '#dc2d2d',
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Chip 
            label={getDifficultyLabel(workout.difficulty)}
            sx={{ 
              bgcolor: getDifficultyColor(workout.difficulty), 
              color: 'white', 
              fontWeight: 'bold',
              mb: 2 
            }} 
          />
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            sx={{ 
              color: 'white',
              mb: 1
            }}
          >
            {workout.name}
          </Typography>
          <Typography variant="h6" sx={{ color: '#ccc' }}>
            {workout.muscleGroup || 'Full Body Workout'}
          </Typography>
        </Box>
      </Box>

      <DialogContent sx={{ p: 0, background: '#1a1a1a' }}>
        {/* Video Section */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ 
            width: '100%', 
            borderRadius: 2, 
            overflow: 'hidden', 
            bgcolor: '#000',
            position: 'relative',
            mb: 3
          }}>
            {workout.mediaURL ? (
              <Box sx={{ position: 'relative' }}>
                <video 
                  src={workout.mediaURL} 
                  loop 
                  autoPlay 
                  muted 
                  playsInline 
                  style={{ 
                    width: "100%", 
                    display: 'block', 
                    maxHeight: '500px', 
                    objectFit: 'cover' 
                  }} 
                />
              </Box>
            ) : (
              <Box sx={{ 
                height: 200, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#ccc',
                flexDirection: 'column'
              }}>
                <FitnessCenterIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                <Typography variant="h6">Không có video</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ px: 3, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ 
                borderRadius: 2, 
                bgcolor: '#2a2a2a',
                border: '1px solid #333',
                color: 'white',
                height: '100%'
              }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <LocalFireDepartmentIcon sx={{ color: '#dc2d2d', fontSize: 32, mb: 1 }} />
                  <Typography variant="h5" fontWeight="bold">
                    {workout.caloriesBurnedPerMinute || '8'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    Calories/phút
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Thêm 2 card để làm đầy hàng */}
          

           <Grid size={{ xs: 12, sm: 6}}>
          <Card sx={{ 
            borderRadius: 2, 
            bgcolor: '#2a2a2a',
            border: '1px solid #333'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                  ĐỘ KHÓ
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: getDifficultyColor(workout.difficulty) }}>
                  {getDifficultyLabel(workout.difficulty)}
                </Typography>
              </Box>
              <LinearProgress 
                value={getDifficultyValue(workout.difficulty)} 
                variant="determinate" 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: '#333',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: getDifficultyColor(workout.difficulty),
                    borderRadius: 4
                  }
                }} 
              />
            </CardContent>
          </Card>
        </Grid> 
          </Grid>
        </Box>

        {/* Progress Bar for Difficulty */}
        

        {/* Content Sections - CHIA THÀNH 2 CỘT */}
        <Box sx={{ px: 3, pb: 4 }}>
          <Grid container spacing={3}>
            {/* Hướng dẫn thực hiện - Cột trái */}
            <Grid  size={{ xs: 12, sm: 6}}>
              <Card sx={{ 
                borderRadius: 2, 
                bgcolor: '#2a2a2a',
                border: '1px solid #333',
                height: '100%'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    sx={{ 
                      color: 'white', 
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <FitnessCenterIcon sx={{ mr: 2, color: '#dc2d2d' }} />
                    HƯỚNG DẪN THỰC HIỆN
                  </Typography>
                  
                  <Stack spacing={2}>
                    {workout.instructions && workout.instructions.map((step, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: '#333',
                          border: '1px solid #444',
                          display: 'flex',
                          alignItems: 'flex-start',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: '#3a3a3a',
                            transform: 'translateX(4px)'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            bgcolor: '#dc2d2d',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            mr: 2,
                            flexShrink: 0,
                            mt: 0.25
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6 }}>
                          {step}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Lưu ý quan trọng - Cột phải */}
            <Grid  size={{ xs: 12, sm: 6}}>
              <Card sx={{ 
                borderRadius: 2, 
                bgcolor: '#2a2a2a',
                border: '2px solid #dc2d2d',
                height: '100%'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    sx={{ 
                      color: 'white', 
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <WarningIcon sx={{ mr: 2, color: '#dc2d2d' }} />
                    LƯU Ý QUAN TRỌNG
                  </Typography>
                  
                  <Stack spacing={2}>
                    {[
                      "Giữ thẳng lưng trong suốt quá trình tập",
                      "Hít thở đều và sâu - hít vào khi thả lỏng, thở ra khi gắng sức",
                      "Dừng lại ngay nếu cảm thấy đau hoặc khó chịu",
                      "Uống đủ nước trong khi tập để tránh mất nước",
                      "Khởi động kỹ trước khi tập và giãn cơ sau khi tập",
                      "Tập với cường độ phù hợp với thể trạng",
                      "Nghỉ ngơi đầy đủ giữa các hiệp tập"
                    ].map((note, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          p: 1.5,
                          borderRadius: 1,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: '#333',
                          }
                        }}
                      >
                        <Box sx={{ 
                          color: '#dc2d2d', 
                          mr: 2, 
                          mt: 0.25,
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}>
                          •
                        </Box>
                        <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6 }}>
                          {note}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
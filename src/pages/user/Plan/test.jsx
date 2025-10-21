import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  LinearProgress,
  Fab,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

// Dữ liệu mẫu cho buổi tập
const workoutSession = {
  title: "Cú đá rung khi ngồi",
  currentExercise: 1,
  totalExercises: 10,
  currentPhase: 'exercise', // 'exercise' hoặc 'rest'
  exerciseTime: 30,
  restTime: 15,
  calories: 45,
  difficulty: "Trung bình",
  target: "Toàn cơ bụng",
  instructions: "Đứng để chân chạm sàn. Giữ lưng của bạn khoảng 45 độ từ sàn nhà. Duy trì vị trí ổn định. Nhớ thở khi tập luyện.",
  nextExercise: "Gập bụng cơ bản"
};

const WorkoutSessionScreen = () => {
  const [timeLeft, setTimeLeft] = useState(workoutSession.exerciseTime);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(workoutSession.currentPhase);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef(null);

  // Tính phần trăm thời gian còn lại
  const getProgressPercentage = () => {
    const totalTime = currentPhase === 'exercise' ? workoutSession.exerciseTime : workoutSession.restTime;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // Bắt đầu/Pause timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Chuyển bài tiếp theo
  const skipToNext = () => {
    if (currentPhase === 'exercise') {
      // Chuyển sang thời gian nghỉ
      setCurrentPhase('rest');
      setTimeLeft(workoutSession.restTime);
    } else {
      // Chuyển sang bài tập tiếp theo
      setCurrentPhase('exercise');
      setTimeLeft(workoutSession.exerciseTime);
      // TODO: Cập nhật bài tập tiếp theo
    }
    setIsActive(true);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(currentPhase === 'exercise' ? workoutSession.exerciseTime : workoutSession.restTime);
  };

  // Đếm ngược
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Tự động chuyển phase khi hết giờ
      skipToNext();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getPhaseColor = () => {
    return currentPhase === 'exercise' ? '#FF6B35' : '#4CAF50';
  };

  const getPhaseText = () => {
    return currentPhase === 'exercise' ? 'TẬP LUYỆN' : 'NGHỈ NGƠI';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          textAlign: 'center',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {workoutSession.title} - {workoutSession.currentExercise}/{workoutSession.totalExercises}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Chip 
            label={workoutSession.difficulty} 
            sx={{ 
              bgcolor: 'rgba(255,107,53,0.2)', 
              color: '#FF6B35',
              fontWeight: 'bold'
            }} 
          />
          <Chip 
            label={workoutSession.target} 
            sx={{ 
              bgcolor: 'rgba(76,175,80,0.2)', 
              color: '#4CAF50',
              fontWeight: 'bold'
            }} 
          />
        </Box>
      </Box>

      {/* Timer Circle */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40vh',
          position: 'relative'
        }}
      >
        {/* Progress Circle */}
        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `8px solid ${getPhaseColor()}30`,
            background: `conic-gradient(${getPhaseColor()} ${getProgressPercentage()}%, transparent 0%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: '#2d2d2d'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              fontWeight="bold" 
              sx={{ 
                color: getPhaseColor(),
                fontSize: '3rem'
              }}
            >
              {formatTime(timeLeft)}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: getPhaseColor(),
                fontWeight: 'bold'
              }}
            >
              {getPhaseText()}
            </Typography>
          </Box>
        </Box>

        {/* Phase Indicator */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            {currentPhase === 'exercise' ? '🎯 Đang tập' : '💤 Đang nghỉ'}
          </Typography>
          {currentPhase === 'rest' && (
            <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
              Bài tiếp theo: {workoutSession.nextExercise}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          p: 3
        }}
      >
        <IconButton
          onClick={resetTimer}
          sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            color: 'white',
            width: 60,
            height: 60,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          <RotateLeftIcon />
        </IconButton>

        <Fab
          onClick={toggleTimer}
          sx={{
            bgcolor: getPhaseColor(),
            color: 'white',
            width: 80,
            height: 80,
            '&:hover': {
              bgcolor: getPhaseColor(),
              opacity: 0.9
            }
          }}
        >
          {isActive ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
        </Fab>

        <IconButton
          onClick={skipToNext}
          sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            color: 'white',
            width: 60,
            height: 60,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          <SkipNextIcon />
        </IconButton>
      </Box>

      {/* Instructions */}
      <Card
        sx={{
          m: 3,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 3
        }}
      >
        <CardContent>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <FitnessCenterIcon /> Hướng dẫn
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6, opacity: 0.9 }}>
            {workoutSession.instructions}
          </Typography>
        </CardContent>
      </Card>

      {/* Stats */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          p: 3,
          background: 'rgba(0,0,0,0.3)'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <AccessTimeIcon sx={{ color: '#2196F3', mb: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            {workoutSession.exerciseTime}s
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Tập/Bài
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <AccessTimeIcon sx={{ color: '#4CAF50', mb: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            {workoutSession.restTime}s
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Nghỉ/Bài
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <LocalFireDepartmentIcon sx={{ color: '#FF6B35', mb: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            {workoutSession.calories}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Calories
          </Typography>
        </Box>
      </Box>

      {/* Bottom Controls */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <IconButton
          onClick={() => setIsMuted(!isMuted)}
          sx={{ color: 'white' }}
        >
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>

        <Typography variant="body2" sx={{ opacity: 0.7, alignSelf: 'center' }}>
          CHẾ ĐỘ XOAY NGANG
        </Typography>

        <Box sx={{ width: 40 }} /> {/* Spacer for balance */}
      </Box>
    </Box>
  );
};

export default WorkoutSessionScreen;
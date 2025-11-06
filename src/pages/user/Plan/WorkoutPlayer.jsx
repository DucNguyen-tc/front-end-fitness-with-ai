import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Modal,
  Paper,
  Card,
  CircularProgress,
  Chip,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import { updateSessionStatus } from "../../../services/planService";
import Music from "../../../assets/music.mp3";

const WorkoutPlayer = ({ workouts, onExit, sessionId, planId }) => {
  if (!workouts || workouts.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3); // 3 giây đếm ngược bắt đầu
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [isStarting, setIsStarting] = useState(true); // Trạng thái đếm ngược bắt đầu

  const currentExercise = workouts[currentIndex];
  const hasStarted = useRef(false);
  const bgmRef = useRef(null);

  // 🎵 setup nhạc nền
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.3;
      bgmRef.current.play().catch(() => {
        console.log("⚠️ Browser chặn autoplay do chưa tương tác");
      });
    }

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
    };
  }, []);

  // Reset khi đổi bài
  useEffect(() => {
    if (!currentExercise || isStarting) return;
    
    if (isResting) {
      setTimeLeft(currentExercise.restTime || 10);
    } else {
      setTimeLeft(currentExercise.workTime || 30);
    }
  }, [currentExercise, isResting, isStarting]);

  // Bộ đếm
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      if (!isStarting && !isResting) {
        setTotalWorkoutTime((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft, isStarting, isResting]);

  // Hết giờ mỗi bài
  useEffect(() => {
    if (timeLeft === 0) {
      if (isStarting) {
        // Kết thúc đếm ngược bắt đầu
        setIsStarting(false);
        setTimeLeft(currentExercise.workTime || 30);
        return;
      }

      if (!isResting) {
        // Chuyển sang nghỉ (trừ bài cuối)
        if (currentIndex < workouts.length - 1) {
          setIsResting(true);
          setTimeLeft(currentExercise.restTime || 10);
        } else {
          // ✅ Hoàn thành buổi tập (bỏ qua restTime của bài cuối)
          if (bgmRef.current) {
            bgmRef.current.pause();
            bgmRef.current.currentTime = 0;
          }
          setShowSummary(true);
        }
      } else {
        // Hết nghỉ → sang bài mới
        setIsResting(false);
        setCurrentIndex((i) => i + 1);
      }
    }
  }, [timeLeft, currentIndex, workouts.length, isResting, isStarting, currentExercise]);

  // Tính calo tiêu thụ (ước lượng)
  const caloriesBurned = Math.round((totalWorkoutTime / 60) * 8);

  const handleFinishWorkout = async () => {
    try {
      const targetDate = new Date();
      await updateSessionStatus(planId, sessionId, "COMPLETED", targetDate);
      console.log("✅ Cập nhật trạng thái session thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật session:", error);
    } finally {
      onExit();
    }
  };

  const getProgressColor = () => {
    if (isStarting) return '#ff9800'; // Orange for countdown
    if (isResting) return '#4caf50'; // Green for rest
    return '#dc2d2d'; // Red for workout
  };

  const getStatusText = () => {
    if (isStarting) return "CHUẨN BỊ BẮT ĐẦU";
    if (isResting) return "THỜI GIAN NGHỈ";
    return "ĐANG TẬP LUYỆN";
  };

  const progressValue = isStarting 
    ? ((3 - timeLeft) / 3) * 100 
    : isResting
    ? ((currentExercise?.restTime - timeLeft) / currentExercise?.restTime) * 100
    : ((currentExercise?.workTime - timeLeft) / currentExercise?.workTime) * 100;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      color: 'white',
      p: 3
    }}>
      {/* 🔊 Nhạc nền */}
      <audio ref={bgmRef} src={Music} loop preload="auto" />

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Chip 
          label={getStatusText()} 
          sx={{ 
            bgcolor: getProgressColor(), 
            color: 'white', 
            fontWeight: 'bold',
            mb: 2 
          }} 
        />
        <Typography variant="h4" fontWeight="bold" color="white">
          {isStarting ? "SẴN SÀNG?" : isResting ? "NGHỈ NGƠI" : currentExercise?.name}
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        
        {/* Video và Đồng hồ */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: 'center', width: '100%' }}>
          
          {/* Video */}
          {!isResting && !isStarting && currentExercise?.mediaURL && (
            <Card sx={{ 
              borderRadius: 3, 
              overflow: 'hidden', 
              flex: 1,
              maxWidth: 600 
            }}>
              <video
                src={currentExercise.mediaURL}
                width="100%"
                height="340"
                loop
                autoPlay
                muted
                playsInline
                style={{ display: 'block' }}
              />
            </Card>
          )}

          {/* Đồng hồ đếm ngược */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            flex: 1
          }}>
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
              <CircularProgress
                variant="determinate"
                value={progressValue}
                size={200}
                thickness={4}
                sx={{ 
                  color: getProgressColor(),
                  filter: 'drop-shadow(0 4px 12px rgba(220, 45, 45, 0.3))'
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h2" fontWeight="bold" color="white">
                  {timeLeft}s
                </Typography>
              </Box>
            </Box>

            {/* Exercise Info */}
            {!isStarting && !isResting && (
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h6" color="#ccc" gutterBottom>
                  Bài {currentIndex + 1}/{workouts.length}
                </Typography>
                <Typography variant="body1" color="#ccc">
                  Thời gian: {currentExercise?.workTime}s
                </Typography>
              </Box>
            )}

            {/* Next Exercise Preview */}
            {!isStarting && currentIndex < workouts.length - 1 && !isResting && (
              <Box sx={{ 
                bgcolor: 'rgba(255,255,255,0.05)', 
                p: 2, 
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" color="#ccc" gutterBottom>
                  Tiếp theo:
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="white">
                  {workouts[currentIndex + 1]?.name}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Control Buttons */}
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
          <Button
            variant="contained"
            color="secondary"
            startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
            onClick={() => {
              setIsPaused((prev) => {
                const next = !prev;
                if (bgmRef.current) {
                  next ? bgmRef.current.pause() : bgmRef.current.play();
                }
                return next;
              });
            }}
            sx={{ 
              minWidth: 140,
              bgcolor: isPaused ? '#4caf50' : '#ff9800',
              '&:hover': {
                bgcolor: isPaused ? '#45a049' : '#f57c00',
              }
            }}
          >
            {isPaused ? "TIẾP TỤC" : "TẠM DỪNG"}
          </Button>

          <Button
            variant="outlined"
            startIcon={<SkipPreviousIcon />}
            disabled={currentIndex === 0 || isStarting}
            onClick={() => {
              setIsResting(false);
              setIsStarting(false);
              setCurrentIndex((i) => Math.max(0, i - 1));
            }}
            sx={{ 
              borderColor: 'white', 
              color: 'white',
              '&:hover': {
                borderColor: '#dc2d2d',
                bgcolor: 'rgba(220, 45, 45, 0.1)'
              }
            }}
          >
            BÀI TRƯỚC
          </Button>

          <Button
            variant="outlined"
            startIcon={<SkipNextIcon />}
            disabled={currentIndex === workouts.length - 1 || isStarting}
            onClick={() => {
              setIsResting(false);
              setIsStarting(false);
              setCurrentIndex((i) => i + 1);
            }}
            sx={{ 
              borderColor: 'white', 
              color: 'white',
              '&:hover': {
                borderColor: '#dc2d2d',
                bgcolor: 'rgba(220, 45, 45, 0.1)'
              }
            }}
          >
            TIẾP THEO
          </Button>
        </Stack>

        {/* Stats */}
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <AccessTimeIcon sx={{ color: '#dc2d2d', mb: 1 }} />
            <Typography variant="body2" color="#ccc">Tổng thời gian</Typography>
            <Typography variant="h6" fontWeight="bold" color="white">
              {Math.floor(totalWorkoutTime / 60)}:{String(totalWorkoutTime % 60).padStart(2, '0')}
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <LocalFireDepartmentIcon sx={{ color: '#dc2d2d', mb: 1 }} />
            <Typography variant="body2" color="#ccc">Calories</Typography>
            <Typography variant="h6" fontWeight="bold" color="white">
              {caloriesBurned} kcal
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <FitnessCenterIcon sx={{ color: '#dc2d2d', mb: 1 }} />
            <Typography variant="body2" color="#ccc">Bài tập</Typography>
            <Typography variant="h6" fontWeight="bold" color="white">
              {currentIndex + 1}/{workouts.length}
            </Typography>
          </Box>
        </Box>

        {/* Exit Button */}
        <Button 
          onClick={onExit} 
          color="error" 
          variant="outlined"
          startIcon={<ExitToAppIcon />}
          sx={{ 
            mt: 2,
            borderColor: '#dc2d2d',
            color: '#dc2d2d',
            '&:hover': {
              bgcolor: 'rgba(220, 45, 45, 0.1)',
              borderColor: '#ff6b6b'
            }
          }}
        >
          THOÁT BUỔI TẬP
        </Button>
      </Box>

      {/* 🎉 Modal chúc mừng */}
      <Modal open={showSummary} onClose={() => setShowSummary(false)}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            width: 420,
            textAlign: 'center',
            mx: 'auto',
            mt: '15%',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            color: 'white',
            border: '2px solid #dc2d2d'
          }}
        >
          <CelebrationIcon sx={{ fontSize: 60, color: '#dc2d2d', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" mb={3} color="#dc2d2d">
            🎉 CHÚC MỪNG!
          </Typography>
          <Typography variant="h6" mb={2}>
            Bạn đã hoàn thành buổi tập
          </Typography>
          
          <Stack spacing={2} mb={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">⏱️ Thời gian tập:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {Math.floor(totalWorkoutTime / 60)}:{String(totalWorkoutTime % 60).padStart(2, '0')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">🔥 Calories:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {caloriesBurned} kcal
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">💪 Bài tập:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {workouts.length} bài
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFinishWorkout}
            sx={{
              bgcolor: '#dc2d2d',
              '&:hover': {
                bgcolor: '#ff6b6b'
              }
            }}
          >
            XÁC NHẬN HOÀN THÀNH
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
};

export default WorkoutPlayer;
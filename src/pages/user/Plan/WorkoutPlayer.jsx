import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Modal,
  Paper,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { updateSessionStatus } from "../../../services/planService";
import Music from "../../../assets/music.mp3";

const WorkoutPlayer = ({ workouts, onExit, sessionId, planId }) => {
  if (!workouts || workouts.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(workouts[0]?.workTime || 30);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);

  const currentExercise = workouts[currentIndex];
  const hasStarted = useRef(false);
  const bgmRef = useRef(null);

  // 🎵 setup nhạc nền
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.4;
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
    if (!currentExercise) return;
    setIsResting(false);
    setTimeLeft(currentExercise.workTime || 30);
  }, [currentExercise]);

  // Bộ đếm
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setTotalWorkoutTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft]);

  // Hết giờ mỗi bài
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      return;
    }

    if (timeLeft === 0) {
      if (!isResting) {
        // Chuyển sang nghỉ
        setIsResting(true);
        setTimeLeft(currentExercise.restTime || 10);
      } else {
        // Hết nghỉ → sang bài mới hoặc kết thúc
        if (currentIndex < workouts.length - 1) {
          setIsResting(false);
          setCurrentIndex((i) => i + 1);
        } else {
          // ✅ Hoàn thành buổi tập
          if (bgmRef.current) {
            bgmRef.current.pause();
            bgmRef.current.currentTime = 0;
          }
          setShowSummary(true);
        }
      }
    }
  }, [timeLeft]);

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
      onExit(); // thoát về màn session list
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {/* 🔊 Nhạc nền */}
      <audio ref={bgmRef} src={Music} loop preload="auto" />

      <Typography variant="h4" fontWeight="bold" mb={2} color="primary">
        {isResting ? "Thời gian nghỉ" : currentExercise?.name}
      </Typography>

      {!isResting && currentExercise?.mediaURL && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <video
            src={currentExercise.mediaURL}
            width="600"
            height="340"
            loop
            autoPlay
            muted
            playsInline
            style={{ borderRadius: "16px" }}
          />
        </Box>
      )}

      <Typography variant="h3" fontWeight="bold" mb={2}>
        {timeLeft}s
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setIsPaused((prev) => {
              const next = !prev;
              if (bgmRef.current) {
                next ? bgmRef.current.pause() : bgmRef.current.play();
              }
              return next;
            });
          }}
        >
          {isPaused ? "Tiếp tục" : "Tạm dừng"}
        </Button>

        <Button
          variant="outlined"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        >
          Bài trước
        </Button>

        <Button
          variant="outlined"
          disabled={currentIndex === workouts.length - 1}
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          Tiếp theo
        </Button>
      </Stack>

      <Button onClick={onExit} color="error" variant="text" sx={{ mt: 4 }}>
        Thoát buổi tập
      </Button>

      {/* 🎉 Modal chúc mừng */}
      <Modal open={showSummary} onClose={() => setShowSummary(false)}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            width: 420,
            textAlign: "center",
            mx: "auto",
            mt: "15%",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          <CelebrationIcon color="warning" sx={{ fontSize: 50, mb: 1 }} />
          <Typography variant="h5" fontWeight="bold" mb={1}>
            🎉 Chúc mừng bạn đã hoàn thành buổi tập!
          </Typography>
          <Typography variant="body1" mb={2}>
            ⏱️ Thời gian tổng cộng:{" "}
            <strong>{Math.floor(totalWorkoutTime / 60)} phút</strong>{" "}
            {totalWorkoutTime % 60} giây
          </Typography>
          <Typography variant="body1" mb={3}>
            🔥 Lượng calo tiêu thụ ước tính:{" "}
            <strong>{caloriesBurned} kcal</strong>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFinishWorkout}
          >
            Xác nhận hoàn thành
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
};

export default WorkoutPlayer;

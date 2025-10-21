import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Music from "../../../assets/music.mp3";

const WorkoutPlayer = ({ workouts, onExit }) => {
  if (!workouts || workouts.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(workouts[0]?.workTime || 30);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentExercise = workouts[currentIndex];
  const hasStarted = useRef(false);
  const bgmRef = useRef(null); // 🔊 thêm ref nhạc nền

  // 🎵 Khi component mount → load nhạc
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.4; // chỉnh nhỏ thôi cho đỡ ồn
    }
  }, []);

  // 🎶 Khi bắt đầu buổi tập (vào component) → bật nhạc, khi thoát → dừng
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.play().catch(() => {
        console.log("User chưa tương tác -> browser chặn autoplay 😅");
      });
    }

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
    };
  }, []);

  // Khi đổi bài tập → set lại thời gian
  useEffect(() => {
    if (!currentExercise) return;
    setIsResting(false);
    setTimeLeft(currentExercise.workTime || 30);
  }, [currentExercise]);

  // Bộ đếm thời gian
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft]);

  // Xử lý khi hết giờ
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      return;
    }

    if (timeLeft === 0) {
      if (!isResting) {
        setIsResting(true);
        setTimeLeft(currentExercise.restTime || 10);
      } else {
        if (currentIndex < workouts.length - 1) {
          setIsResting(false);
          setCurrentIndex((i) => i + 1);
        } else {
          alert("Hoàn thành buổi tập! 💪");
          if (bgmRef.current) {
            bgmRef.current.pause();
            bgmRef.current.currentTime = 0;
          }
          onExit();
        }
      }
    }
  }, [timeLeft]);

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {/* 🔊 Thêm nhạc nền vào đây */}
      <audio ref={bgmRef} src={Music} loop preload="auto" />

      <Typography variant="h4" fontWeight="bold" mb={2} color="primary">
        {isResting ? "Thời gian nghỉ" : currentExercise?.name}
      </Typography>

      {!isResting && currentExercise?.mediaURL && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
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
            setIsPaused(!isPaused);
            if (bgmRef.current) {
              if (isPaused) bgmRef.current.play();
              else bgmRef.current.pause();
            }
          }}
        >
          {isPaused ? "Tiếp tục" : "Tạm dừng"}
        </Button>

        <Button
          variant="outlined"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
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
    </Box>
  );
};

export default WorkoutPlayer;

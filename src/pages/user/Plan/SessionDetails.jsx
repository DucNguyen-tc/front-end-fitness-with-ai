import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getWorkoutById } from "../../../services/workoutService";

const SessionDetails = ({
  session,
  onBack,
  onStartWorkout,
  onSelectWorkout,
}) => {
  const [workoutDetails, setWorkoutDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("session", session);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const promises = session.exercises.map((ex) =>
          getWorkoutById(ex.workoutId)
        );
        const results = await Promise.all(promises);
        const workouts = results.map((res) => res.data);

        const mergedData = session.exercises.map((ex, i) => ({
          ...workouts[i],
          ...ex,
        }));

        setWorkoutDetails(mergedData);
      } catch (error) {
        console.error("Lỗi lấy chi tiết bài tập:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkoutDetails();
  }, [session]);

  return (
    <Box sx={{ p: 2 }}>
      {/* Header với nút back và tiêu đề */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        {/* Nhóm bên trái: nút back + tiêu đề */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={onBack}
            sx={{
              mr: 2,
              bgcolor: "#dc2d2d",
              color: "white",
              "&:hover": {
                bgcolor: "#c62828",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="white"
            sx={{
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Buổi tập thứ {session.sessionNumber}
          </Typography>
        </Box>

        {/* Nút bên phải */}
        <Button
          variant="contained"
          size="large"
          sx={{ 
            borderRadius: 2, 
            fontWeight: "bold",
            bgcolor: "#dc2d2d",
            '&:hover': {
              bgcolor: "#c62828",
            },
            '&:disabled': {
              bgcolor: '#666',
              color: '#999'
            }
          }}
          disabled={loading || workoutDetails.length === 0}
          onClick={() => onStartWorkout(workoutDetails)}
        >
          {loading ? "Đang tải dữ liệu..." : "Bắt đầu tập"}
        </Button>
      </Box>

      {/* Grid chứa các exercise card */}
      <Grid container spacing={3}>
        {workoutDetails.map((exercise) => (
          <Grid
             size={{ xs: 12, sm: 6, md: 4}}
            key={exercise.workoutId}
            sx={{ display: "flex" }}
          >
            <Card
              onClick={() => onSelectWorkout(exercise)}
              sx={{
                flex: 1,
                height: 550,
                cursor: "pointer",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
                border: "2px solid #333",
                transition: "all 0.3s ease-in-out",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(220, 45, 45, 0.3)",
                  border: "2px solid #dc2d2d",
                  background: "linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)",
                },
              }}
            >
              {/* Play button overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
                }}
              >
                <Chip
                  icon={<PlayArrowIcon />}
                  label="Xem chi tiết"
                  size="small"
                  sx={{
                    bgcolor: "rgba(220, 45, 45, 0.9)",
                    color: "white",
                    fontWeight: "bold",
                    backdropFilter: "blur(10px)",
                  }}
                />
              </Box>

              {/* Ảnh với overlay gradient */}
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: 320,
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  image={exercise.imageURL}
                  alt={exercise.name}
                />
                {/* Gradient overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "linear-gradient(to top, rgba(26,26,26,0.9) 0%, transparent 100%)",
                  }}
                />
              </Box>

              <CardContent
                sx={{
                  p: 3,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Tên bài tập */}
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  fontWeight="bold"
                  sx={{
                    mb: 2,
                    color: "white",
                    minHeight: "48px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {exercise.name}
                </Typography>

                {/* Thông tin thời gian và calories */}
                <Stack spacing={2}>
                  {/* Thời gian */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "rgba(220, 45, 45, 0.1)",
                      border: "1px solid rgba(220, 45, 45, 0.3)",
                    }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ color: "#dc2d2d" }} />
                    <Typography variant="body2" fontWeight="medium" sx={{ color: "#ccc" }}>
                      Thời gian: <strong style={{ color: "white", marginLeft: 4 }}>{exercise.workTime} giây</strong>
                    </Typography>
                  </Stack>

                  {/* Calories */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "rgba(255, 152, 0, 0.1)",
                      border: "1px solid rgba(255, 152, 0, 0.3)",
                    }}
                  >
                    <LocalFireDepartmentIcon fontSize="small" sx={{ color: "#ff9800" }} />
                    <Typography variant="body2" fontWeight="medium" sx={{ color: "#ccc" }}>
                      Calories:{" "}
                      <strong style={{ color: "white", marginLeft: 4 }}>
                        {Math.round(
                          (exercise.caloriesBurnedPerMinute *
                            exercise.workTime) /
                            60
                        )}{" "}
                        cal
                      </strong>
                    </Typography>
                  </Stack>
                </Stack>

                {/* Footer với số hiệp và lặp lại (nếu có) */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pt: 2, borderTop: "1px solid #333" }}>
                  <Typography variant="caption" sx={{ color: "#ccc" }}>
                    {exercise.sets ? `${exercise.sets} hiệp` : "1 hiệp"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#ccc" }}>
                    {exercise.reps ? `${exercise.reps} lần` : "Tối đa"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SessionDetails;
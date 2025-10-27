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
        setLoading(false); // ✅ báo React render lại sau khi merge xong
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
          justifyContent: "space-between", // 👈 thêm dòng này
          mb: 4,
        }}
      >
        {/* Nhóm bên trái: nút back + tiêu đề */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={onBack}
            sx={{
              mr: 2,
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
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
            color="primary"
            sx={{
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Buổi tập thứ {session.sessionNumber}
          </Typography>
        </Box>

        {/* Nút bên phải */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 2, fontWeight: "bold" }}
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
            item
            xs={12}
            sm={6}
            md={4}
            key={exercise.workoutId}
            sx={{ display: "flex" }}
          >
            <Card
              onClick={() => onSelectWorkout(exercise)}
              sx={{
                flex: 1,
                height: 500,
                width: 280,
                cursor: "pointer",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease-in-out",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                  background:
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                },
              }}
            >
              {/* Ảnh với kích thước cố định và không bị bóp méo */}
              <CardMedia
                component="img"
                sx={{
                  height: 270, // Chiều cao cố định
                  width: "100%", // Chiều rộng 100%
                  objectFit: "cover", // Giữ tỷ lệ ảnh, cắt phần thừa nếu cần
                  objectPosition: "center", // Căn giữa ảnh
                }}
                image={exercise.imageURL}
                alt={exercise.name}
              />

              <CardContent
                sx={{
                  p: 3,
                  position: "relative",
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
                    pr: exercise.id ? 6 : 0,
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
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                    }}
                  >
                    <AccessTimeIcon fontSize="small" color="primary" />
                    <Typography variant="body2" fontWeight="medium">
                      Thời gian: <strong>{exercise.workTime} giây</strong>
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
                      bgcolor: "rgba(255, 87, 34, 0.08)",
                    }}
                  >
                    <LocalFireDepartmentIcon fontSize="small" color="error" />
                    <Typography variant="body2" fontWeight="medium">
                      Calories:{" "}
                      <strong>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SessionDetails;

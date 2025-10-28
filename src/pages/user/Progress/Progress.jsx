import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert,
  Stack,
  ToggleButton,
  IconButton,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import { UserContext } from "../../../stores/UserContext";
import { getUserByAccountId } from "../../../services/userService";
import { getPlanByUserId } from "../../../services/planService";

const Progress = () => {
  const [difficulty, setDifficulty] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [plan, setPlan] = useState([]);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [offset, setOffset] = useState(0); // số tuần dịch chuyển


  // ================================
  // FETCH USER
  // ================================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.sub) return;
        const data = await getUserByAccountId(user.sub);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [user?.sub]);

  // ================================
  // FETCH PLAN
  // ================================
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        if (!userData?.data?._id) return;
        const response = await getPlanByUserId(userData.data._id);
        setPlan(response.data || []);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };
    fetchPlan();
  }, [userData?.data?._id]);

  // ================================
  // CÂN NẶNG GIẢ LẬP
  // ================================
  const weightData = [
    { week: "Tuần 1", weight: 66 },
    { week: "Tuần 2", weight: 65.3 },
    { week: "Tuần 3", weight: 65 },
    { week: "Tuần 4", weight: 64.5 },
  ];

  // ================================
  // CALORIES TRONG TUẦN
  // ================================
// ================================
  // CALORIES TRONG TUẦN
  // ================================
  const allSessions = plan.flatMap((p) => p.sessions || []);
  const today = new Date();
  
  // TÍNH TOÁN THỨ 2
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1 + offset * 7);
  // --- FIX: Chuẩn hóa về 00:00:00 (đầu ngày) ---
  monday.setHours(0, 0, 0, 0);

  // TÍNH TOÁN CHỦ NHẬT
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  // --- FIX: Chuẩn hóa về 23:59:59 (cuối ngày) ---
  sunday.setHours(23, 59, 59, 999);

  // Tạo mảng 7 ngày (thứ 2 -> CN)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  // Lọc session trong tuần hiện tại
  const weeklySessions = allSessions.filter((s) => {
    // Thêm kiểm tra s.targetDate để code an toàn hơn
    if (!s.targetDate) {
      return false;
    }
    
    const d = new Date(s.targetDate);
    // console.log("date", d); // Giờ bạn có thể log lại để xem
    // console.log("status", s.status); // (Bạn log nhầm "monday" thành "status")

    // Phép so sánh giờ đã chính xác
    return d >= monday && d <= sunday && s.status === "COMPLETED";
  });

  // Ghép calories theo ngày (nếu có)
  const calorieMap = {};
  weeklySessions.forEach((s) => {
    const key = new Date(s.targetDate).toLocaleDateString("vi-VN");
    calorieMap[key] = (calorieMap[key] || 0) + (s.caloriesBurned || 0);
  });

  // Tạo dữ liệu 7 ngày
  const calorieData = weekDays.map((d) => ({
    day: d.toLocaleDateString("vi-VN", { weekday: "short" }), // "Th 2", "Th 3"...
    calo: calorieMap[d.toLocaleDateString("vi-VN")] || 0,
  }));

  console.log("calorieData", calorieData);
  console.log("allSessions", allSessions);
  console.log("weeklySessions", weeklySessions);

  const getPeriodLabel = () => {
    return `Từ ${monday.toLocaleDateString("vi-VN")} → ${sunday.toLocaleDateString("vi-VN")}`;
  };

  const handleSubmit = () => {
    if (!difficulty) return;
    setOpenSnackbar(true);
  };

  // ================================
  // RENDER
  // ================================
  return (
    <Box p={3} sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        📊 Bảng điều khiển tiến độ
      </Typography>

      <Grid container spacing={3}>
        {/* CỘT TRÁI */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* --- Theo dõi cân nặng --- */}
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      📈 Theo dõi cân nặng
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Xu hướng giảm ổn định
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="secondary.main"
                    >
                      64.5 kg
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hiện tại
                    </Typography>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[63, 67]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#9c27b0"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* --- Calories --- */}
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      🔥 Thống kê Calories (tuần)
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton onClick={() => setOffset((prev) => prev - 1)}>
                      <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {getPeriodLabel()}
                    </Typography>
                    <IconButton onClick={() => setOffset((prev) => prev + 1)}>
                      <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>

                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={calorieData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calo" fill="#1976d2" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* CỘT PHẢI */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Chỉ số khác
                </Typography>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center">
                    <FitnessCenterIcon color="success" sx={{ mr: 1.5 }} />
                    <Typography>
                      Mỡ cơ thể: <strong>18.2%</strong>
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <MonitorWeightIcon color="warning" sx={{ mr: 1.5 }} />
                    <Typography>
                      Buổi đã tập: <strong>4/5 buổi</strong>
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4, boxShadow: 3, p: 1 }}>
              <CardContent>
                <Typography variant="h6" mb={2} fontWeight="600">
                  🧠 Đánh giá tuần này
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Phản hồi của bạn giúp AI điều chỉnh kế hoạch cho tuần tới phù hợp hơn.
                </Typography>
                <Stack direction="row" spacing={1}>
                  {["easy", "medium", "hard"].map((level) => (
                    <ToggleButton
                      key={level}
                      value={level}
                      selected={difficulty === level}
                      onChange={() => setDifficulty(level)}
                      fullWidth
                    >
                      {level === "easy"
                        ? "Dễ"
                        : level === "medium"
                        ? "Vừa sức"
                        : "Khó"}
                    </ToggleButton>
                  ))}
                </Stack>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!difficulty}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Gửi đánh giá
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", borderRadius: 2, boxShadow: 6 }}
        >
          🤖 Cảm ơn bạn! Kế hoạch tuần sau sẽ được điều chỉnh.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Progress;

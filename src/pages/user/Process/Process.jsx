import React, { useState } from "react";
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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Icons
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

const Process = () => {
  const [difficulty, setDifficulty] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Dữ liệu mẫu (giữ nguyên)
  const weightData = [
    { week: "Tuần 1", weight: 66 },
    { week: "Tuần 2", weight: 65.3 },
    { week: "Tuần 3", weight: 65 },
    { week: "Tuần 4", weight: 64.5 },
  ];
  const calorieData = [
    { day: "T2", calo: 420 }, { day: "T3", calo: 500 }, { day: "T4", calo: 0 },
    { day: "T5", calo: 460 }, { day: "T6", calo: 550 }, { day: "T7", calo: 580 },
    { day: "CN", calo: 300 },
  ];

  const handleSubmit = () => {
    if (!difficulty) return;
    setOpenSnackbar(true);
  };

  return (
    <Box p={3} sx={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        📊 Bảng điều khiển tiến độ
      </Typography>
      
      {/* Bố cục Dashboard 2 cột */}
      <Grid container spacing={3}>
        {/* === Cột chính bên trái (70% chiều rộng) === */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* --- Panel Cân nặng --- */}
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="h6" fontWeight="600">📈 Theo dõi cân nặng</Typography>
                    <Typography variant="body2" color="text.secondary">Xu hướng giảm ổn định</Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="h4" fontWeight="bold" color="secondary.main">64.5 kg</Typography>
                    <Typography variant="body2" color="text.secondary">Hiện tại</Typography>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[63, 67]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#9c27b0" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }}/>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* --- Panel Calories --- */}
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="h6" fontWeight="600">🔥 Thống kê Calories</Typography>
                    <Typography variant="body2" color="text.secondary">Lượng calo tiêu hao trong tuần</Typography>
                  </Box>
                   <Box textAlign="right">
                    <Typography variant="h4" fontWeight="bold" color="primary.main">560 kcal</Typography>
                    <Typography variant="body2" color="text.secondary">Hôm nay</Typography>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={calorieData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip cursor={{fill: 'rgba(25, 118, 210, 0.1)'}}/>
                    <Bar dataKey="calo" fill="#1976d2" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* === Cột phụ bên phải (30% chiều rộng) === */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* --- Panel Chỉ số khác --- */}
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>Chỉ số khác</Typography>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center">
                    <FitnessCenterIcon color="success" sx={{ mr: 1.5 }}/>
                    <Typography>Mỡ cơ thể: <strong>18.2%</strong></Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <MonitorWeightIcon color="warning" sx={{ mr: 1.5 }}/>
                    <Typography>Buổi đã tập: <strong>4/5 buổi</strong></Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* --- Panel Đánh giá --- */}
            <Card sx={{ borderRadius: 4, boxShadow: 3, p: 1 }}>
              <CardContent>
                <Typography variant="h6" mb={2} fontWeight="600">🧠 Đánh giá tuần này</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Phản hồi của bạn giúp AI điều chỉnh kế hoạch cho tuần tới phù hợp hơn.
                </Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={difficulty}
                  exclusive
                  onChange={(e, newVal) => setDifficulty(newVal)}
                  fullWidth
                >
                  <ToggleButton value="easy">Dễ</ToggleButton>
                  <ToggleButton value="medium">Vừa sức</ToggleButton>
                  <ToggleButton value="hard">Khó</ToggleButton>
                </ToggleButtonGroup>
                <Button variant="contained" onClick={handleSubmit} disabled={!difficulty} sx={{ mt: 2 }} fullWidth>
                  Gửi đánh giá
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      
      {/* --- Snackbar thông báo --- */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" sx={{ width: "100%", borderRadius: 2, boxShadow: 6 }}>
          🤖 Cảm ơn bạn! Kế hoạch tuần sau sẽ được điều chỉnh.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Process;
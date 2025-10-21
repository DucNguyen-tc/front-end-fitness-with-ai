// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// const Process = () => {
//   const [difficulty, setDifficulty] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   // Fake data
//   const summary = {
//     caloriesToday: 560,
//     weightCurrent: 64.5,
//     bodyFat: 18.2,
//     sessionsCompleted: 4,
//   };

//   const weightData = [
//     { week: "Tuần 1", weight: 66 },
//     { week: "Tuần 2", weight: 65.3 },
//     { week: "Tuần 3", weight: 65 },
//     { week: "Tuần 4", weight: 64.5 },
//   ];

//   const calorieData = [
//     { day: "T2", calo: 420 },
//     { day: "T3", calo: 500 },
//     { day: "T4", calo: 0 }, // nghỉ
//     { day: "T5", calo: 460 },
//     { day: "T6", calo: 550 },
//     { day: "T7", calo: 580 },
//     { day: "CN", calo: 300 },
//   ];

//   const handleSubmit = () => {
//     if (!difficulty) return;
//     setOpenSnackbar(true);
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom fontWeight="bold">
//         📊 Tiến độ tập luyện
//       </Typography>

//       {/* --- Phần thống kê tổng quan --- */}
//       <Grid container spacing={2} mb={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ bgcolor: "#f3f4f6", borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h6">🔥 Calo hôm nay</Typography>
//               <Typography variant="h4" fontWeight="bold" color="primary">
//                 {summary.caloriesToday} kcal
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ bgcolor: "#f3f4f6", borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h6">⚖️ Cân nặng</Typography>
//               <Typography variant="h4" fontWeight="bold" color="secondary">
//                 {summary.weightCurrent} kg
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ bgcolor: "#f3f4f6", borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h6">💪 Mỡ cơ thể</Typography>
//               <Typography variant="h4" fontWeight="bold" color="success.main">
//                 {summary.bodyFat}%
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ bgcolor: "#f3f4f6", borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h6">🏋️ Buổi đã tập</Typography>
//               <Typography variant="h4" fontWeight="bold" color="warning.main">
//                 {summary.sessionsCompleted}/5
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* --- Biểu đồ thay đổi cân nặng --- */}
//       <Box mb={4}>
//         <Typography variant="h6" mb={1}>
//           📈 Cân nặng theo tuần
//         </Typography>
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={weightData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="week" />
//             <YAxis domain={[63, 67]} />
//             <Tooltip />
//             <Line type="monotone" dataKey="weight" stroke="#1976d2" strokeWidth={3} />
//           </LineChart>
//         </ResponsiveContainer>
//       </Box>

//       {/* --- Biểu đồ calo tiêu hao --- */}
//       <Box mb={4}>
//         <Typography variant="h6" mb={1}>
//           🔥 Calo tiêu hao mỗi ngày
//         </Typography>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={calorieData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="calo" fill="#ff9800" radius={[6, 6, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </Box>

//       {/* --- Phần đánh giá --- */}
//       <Card sx={{ borderRadius: 2, p: 2, maxWidth: 500 }}>
//         <Typography variant="h6" mb={1}>
//           🧠 Đánh giá mức độ tuần vừa qua
//         </Typography>
//         <RadioGroup
//           value={difficulty}
//           onChange={(e) => setDifficulty(e.target.value)}
//           row
//         >
//           <FormControlLabel value="easy" control={<Radio />} label="Dễ" />
//           <FormControlLabel value="medium" control={<Radio />} label="Trung bình" />
//           <FormControlLabel value="hard" control={<Radio />} label="Khó" />
//         </RadioGroup>
//         <Button
//           variant="contained"
//           onClick={handleSubmit}
//           disabled={!difficulty}
//           sx={{ mt: 1 }}
//         >
//           Gửi đánh giá
//         </Button>
//       </Card>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={4000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           🤖 AI sẽ điều chỉnh kế hoạch của bạn cho tuần sau!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Process;


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














// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Button,
//   Snackbar,
//   Alert,
//   Paper,
//   Chip,
//   LinearProgress,
// } from "@mui/material";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Legend,
// } from "recharts";
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// const Process = () => {
//   const [difficulty, setDifficulty] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const summary = {
//     caloriesToday: 560,
//     calorieGoal: 600,
//     weightCurrent: 64.5,
//     weightStart: 66,
//     weightGoal: 62,
//     bodyFat: 18.2,
//     bodyFatStart: 20.5,
//     sessionsCompleted: 4,
//     sessionsTotal: 5,
//   };

//   const weightData = [
//     { week: "Tuần 1", weight: 66, target: 65.5 },
//     { week: "Tuần 2", weight: 65.3, target: 65 },
//     { week: "Tuần 3", weight: 65, target: 64.5 },
//     { week: "Tuần 4", weight: 64.5, target: 64 },
//   ];

//   const calorieData = [
//     { day: "T2", calo: 420, goal: 600 },
//     { day: "T3", calo: 500, goal: 600 },
//     { day: "T4", calo: 0, goal: 0 },
//     { day: "T5", calo: 460, goal: 600 },
//     { day: "T6", calo: 550, goal: 600 },
//     { day: "T7", calo: 580, goal: 600 },
//     { day: "CN", calo: 300, goal: 400 },
//   ];

//   const handleSubmit = () => {
//     if (!difficulty) return;
//     setOpenSnackbar(true);
//     setTimeout(() => setDifficulty(""), 4000);
//   };

//   const calorieProgress = (summary.caloriesToday / summary.calorieGoal) * 100;
//   const sessionProgress = (summary.sessionsCompleted / summary.sessionsTotal) * 100;
//   const weightLoss = summary.weightStart - summary.weightCurrent;
//   const bodyFatLoss = summary.bodyFatStart - summary.bodyFat;

//   return (
//     <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", p: { xs: 2, md: 4 } }}>
//       {/* Header */}
//       <Box mb={4}>
//         <Typography variant="h4" fontWeight="700" color="#1a1a1a" gutterBottom>
//           Tiến độ tập luyện
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Theo dõi quá trình và đạt được mục tiêu của bạn
//         </Typography>
//       </Box>

//       {/* Main Stats Grid */}
//       <Grid container spacing={3} mb={4}>
//         {/* Calorie Card */}
//         <Grid item xs={12} md={6} lg={3}>
//           <Card
//             elevation={0}
//             sx={{
//               bgcolor: "white",
//               borderRadius: 3,
//               border: "1px solid #e0e0e0",
//               height: "100%",
//             }}
//           >
//             <CardContent>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="body2" color="text.secondary" fontWeight="500">
//                   Calo hôm nay
//                 </Typography>
//                 <Box
//                   sx={{
//                     bgcolor: "#fff3e0",
//                     p: 0.8,
//                     borderRadius: 2,
//                     display: "flex",
//                   }}
//                 >
//                   <span style={{ fontSize: 20 }}>🔥</span>
//                 </Box>
//               </Box>
//               <Typography variant="h4" fontWeight="700" color="#ff9800" mb={1}>
//                 {summary.caloriesToday}
//                 <Typography component="span" variant="h6" color="text.secondary">
//                   /{summary.calorieGoal} kcal
//                 </Typography>
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={calorieProgress}
//                 sx={{
//                   height: 8,
//                   borderRadius: 4,
//                   bgcolor: "#fff3e0",
//                   "& .MuiLinearProgress-bar": {
//                     bgcolor: "#ff9800",
//                     borderRadius: 4,
//                   },
//                 }}
//               />
//               <Typography variant="caption" color="text.secondary" mt={0.5}>
//                 {calorieProgress.toFixed(0)}% mục tiêu
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Weight Card */}
//         <Grid item xs={12} md={6} lg={3}>
//           <Card
//             elevation={0}
//             sx={{
//               bgcolor: "white",
//               borderRadius: 3,
//               border: "1px solid #e0e0e0",
//               height: "100%",
//             }}
//           >
//             <CardContent>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="body2" color="text.secondary" fontWeight="500">
//                   Cân nặng hiện tại
//                 </Typography>
//                 <Box
//                   sx={{
//                     bgcolor: "#e3f2fd",
//                     p: 0.8,
//                     borderRadius: 2,
//                     display: "flex",
//                   }}
//                 >
//                   <span style={{ fontSize: 20 }}>⚖️</span>
//                 </Box>
//               </Box>
//               <Box display="flex" alignItems="baseline" gap={1} mb={1}>
//                 <Typography variant="h4" fontWeight="700" color="#1976d2">
//                   {summary.weightCurrent} kg
//                 </Typography>
//                 <Chip
//                   icon={<TrendingDownIcon sx={{ fontSize: 16 }} />}
//                   label={`-${weightLoss.toFixed(1)} kg`}
//                   size="small"
//                   sx={{
//                     bgcolor: "#e8f5e9",
//                     color: "#2e7d32",
//                     fontWeight: "600",
//                     height: 24,
//                   }}
//                 />
//               </Box>
//               <Typography variant="caption" color="text.secondary">
//                 Mục tiêu: {summary.weightGoal} kg • Còn {(summary.weightCurrent - summary.weightGoal).toFixed(1)} kg
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Body Fat Card */}
//         <Grid item xs={12} md={6} lg={3}>
//           <Card
//             elevation={0}
//             sx={{
//               bgcolor: "white",
//               borderRadius: 3,
//               border: "1px solid #e0e0e0",
//               height: "100%",
//             }}
//           >
//             <CardContent>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="body2" color="text.secondary" fontWeight="500">
//                   Tỷ lệ mỡ cơ thể
//                 </Typography>
//                 <Box
//                   sx={{
//                     bgcolor: "#f3e5f5",
//                     p: 0.8,
//                     borderRadius: 2,
//                     display: "flex",
//                   }}
//                 >
//                   <span style={{ fontSize: 20 }}>💪</span>
//                 </Box>
//               </Box>
//               <Box display="flex" alignItems="baseline" gap={1} mb={1}>
//                 <Typography variant="h4" fontWeight="700" color="#9c27b0">
//                   {summary.bodyFat}%
//                 </Typography>
//                 <Chip
//                   icon={<TrendingDownIcon sx={{ fontSize: 16 }} />}
//                   label={`-${bodyFatLoss.toFixed(1)}%`}
//                   size="small"
//                   sx={{
//                     bgcolor: "#e8f5e9",
//                     color: "#2e7d32",
//                     fontWeight: "600",
//                     height: 24,
//                   }}
//                 />
//               </Box>
//               <Typography variant="caption" color="text.secondary">
//                 Cải thiện đáng kể so với ban đầu
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Sessions Card */}
//         <Grid item xs={12} md={6} lg={3}>
//           <Card
//             elevation={0}
//             sx={{
//               bgcolor: "white",
//               borderRadius: 3,
//               border: "1px solid #e0e0e0",
//               height: "100%",
//             }}
//           >
//             <CardContent>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="body2" color="text.secondary" fontWeight="500">
//                   Buổi tập tuần này
//                 </Typography>
//                 <Box
//                   sx={{
//                     bgcolor: "#fff3e0",
//                     p: 0.8,
//                     borderRadius: 2,
//                     display: "flex",
//                   }}
//                 >
//                   <span style={{ fontSize: 20 }}>🏋️</span>
//                 </Box>
//               </Box>
//               <Typography variant="h4" fontWeight="700" color="#f57c00" mb={1}>
//                 {summary.sessionsCompleted}
//                 <Typography component="span" variant="h6" color="text.secondary">
//                   /{summary.sessionsTotal}
//                 </Typography>
//               </Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={sessionProgress}
//                 sx={{
//                   height: 8,
//                   borderRadius: 4,
//                   bgcolor: "#fff3e0",
//                   "& .MuiLinearProgress-bar": {
//                     bgcolor: "#f57c00",
//                     borderRadius: 4,
//                   },
//                 }}
//               />
//               <Typography variant="caption" color="text.secondary" mt={0.5}>
//                 {sessionProgress.toFixed(0)}% hoàn thành
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Charts Section */}
//       <Grid container spacing={3} mb={4}>
//         {/* Weight Chart */}
//         <Grid item xs={12} lg={6}>
//           <Card
//             elevation={0}
//             sx={{
//               bgcolor: "white",
//               borderRadius: 3,
//               border: "1px solid #e0e0e0",
//               p: 3,
//             }}
//           >
//             <Typography variant="h6" fontWeight="600" mb={3}>
//               📈 Biểu đồ cân nặng
//             </Typography>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={weightData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis
//                   dataKey="week"
//                   tick={{ fill: "#666", fontSize: 12 }}
//                   axisLine={{ stroke: "#e0e0e0" }}
//                 />
//                 <YAxis
//                   domain={[63, 67]}
//                   tick={{ fill: "#666", fontSize: 12 }}
//                   axisLine={{ stroke: "#e0e0e0" }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     borderRadius: 8,
//                     border: "1px solid #e0e0e0",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                   }}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="weight"
//                   name="Cân nặng"
//                   stroke="#1976d2"
//                   strokeWidth={3}
//                   dot={{ fill: "#1976d2", r: 5 }}
//                   activeDot={{ r: 7 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="target"
//                   name="Mục tiêu"
//                   stroke="#ff9800"
//                   strokeWidth={2}
//                   strokeDasharray="5 5"
//                   dot={{ fill: "#ff9800", r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Card>
//         </Grid>

//         {/* Calorie Chart */}
//         <Grid item xs={12} lg={6}>
//           <Card
//             elevation={0}
//             sx={{
//               bgcolor: "white",
//               borderRadius: 3,
//               border: "1px solid #e0e0e0",
//               p: 3,
//             }}
//           >
//             <Typography variant="h6" fontWeight="600" mb={3}>
//               🔥 Calo tiêu hao trong tuần
//             </Typography>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={calorieData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis
//                   dataKey="day"
//                   tick={{ fill: "#666", fontSize: 12 }}
//                   axisLine={{ stroke: "#e0e0e0" }}
//                 />
//                 <YAxis
//                   tick={{ fill: "#666", fontSize: 12 }}
//                   axisLine={{ stroke: "#e0e0e0" }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     borderRadius: 8,
//                     border: "1px solid #e0e0e0",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                   }}
//                 />
//                 <Legend />
//                 <Bar dataKey="goal" name="Mục tiêu" fill="#e0e0e0" radius={[8, 8, 0, 0]} />
//                 <Bar dataKey="calo" name="Thực tế" fill="#ff9800" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Feedback Section */}
//       <Card
//         elevation={0}
//         sx={{
//           bgcolor: "white",
//           borderRadius: 3,
//           border: "1px solid #e0e0e0",
//           p: 3,
//           maxWidth: 800,
//           mx: "auto",
//         }}
//       >
//         <Box display="flex" alignItems="center" gap={1.5} mb={3}>
//           <Box
//             sx={{
//               bgcolor: "#e3f2fd",
//               p: 1,
//               borderRadius: 2,
//               display: "flex",
//             }}
//           >
//             <span style={{ fontSize: 24 }}>🧠</span>
//           </Box>
//           <Box>
//             <Typography variant="h6" fontWeight="600">
//               Đánh giá mức độ tập luyện
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               AI sẽ tự động điều chỉnh kế hoạch dựa trên phản hồi của bạn
//             </Typography>
//           </Box>
//         </Box>

//         <RadioGroup
//           value={difficulty}
//           onChange={(e) => setDifficulty(e.target.value)}
//           sx={{ mb: 2 }}
//         >
//           <Box display="flex" gap={2} flexWrap="wrap">
//             <Paper
//               elevation={0}
//               sx={{
//                 flex: 1,
//                 minWidth: 150,
//                 p: 2,
//                 border: difficulty === "easy" ? "2px solid #4caf50" : "1px solid #e0e0e0",
//                 borderRadius: 2,
//                 cursor: "pointer",
//                 transition: "all 0.2s",
//                 "&:hover": {
//                   bgcolor: "#f5f5f5",
//                   transform: "translateY(-2px)",
//                 },
//               }}
//               onClick={() => setDifficulty("easy")}
//             >
//               <FormControlLabel
//                 value="easy"
//                 control={<Radio />}
//                 label={
//                   <Box>
//                     <Typography variant="body1" fontWeight="600">
//                       😊 Dễ
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       Tăng cường độ
//                     </Typography>
//                   </Box>
//                 }
//                 sx={{ m: 0 }}
//               />
//             </Paper>

//             <Paper
//               elevation={0}
//               sx={{
//                 flex: 1,
//                 minWidth: 150,
//                 p: 2,
//                 border: difficulty === "medium" ? "2px solid #ff9800" : "1px solid #e0e0e0",
//                 borderRadius: 2,
//                 cursor: "pointer",
//                 transition: "all 0.2s",
//                 "&:hover": {
//                   bgcolor: "#f5f5f5",
//                   transform: "translateY(-2px)",
//                 },
//               }}
//               onClick={() => setDifficulty("medium")}
//             >
//               <FormControlLabel
//                 value="medium"
//                 control={<Radio />}
//                 label={
//                   <Box>
//                     <Typography variant="body1" fontWeight="600">
//                       😐 Vừa phải
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       Giữ nguyên
//                     </Typography>
//                   </Box>
//                 }
//                 sx={{ m: 0 }}
//               />
//             </Paper>

//             <Paper
//               elevation={0}
//               sx={{
//                 flex: 1,
//                 minWidth: 150,
//                 p: 2,
//                 border: difficulty === "hard" ? "2px solid #f44336" : "1px solid #e0e0e0",
//                 borderRadius: 2,
//                 cursor: "pointer",
//                 transition: "all 0.2s",
//                 "&:hover": {
//                   bgcolor: "#f5f5f5",
//                   transform: "translateY(-2px)",
//                 },
//               }}
//               onClick={() => setDifficulty("hard")}
//             >
//               <FormControlLabel
//                 value="hard"
//                 control={<Radio />}
//                 label={
//                   <Box>
//                     <Typography variant="body1" fontWeight="600">
//                       😓 Khó
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       Giảm cường độ
//                     </Typography>
//                   </Box>
//                 }
//                 sx={{ m: 0 }}
//               />
//             </Paper>
//           </Box>
//         </RadioGroup>

//         <Button
//           variant="contained"
//           onClick={handleSubmit}
//           disabled={!difficulty}
//           fullWidth
//           sx={{
//             py: 1.5,
//             borderRadius: 2,
//             textTransform: "none",
//             fontSize: 16,
//             fontWeight: "600",
//             boxShadow: "none",
//             "&:hover": {
//               boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
//             },
//           }}
//         >
//           Gửi đánh giá
//         </Button>
//       </Card>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={4000}
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity="success"
//           sx={{
//             width: "100%",
//             borderRadius: 2,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//           }}
//         >
//           🤖 AI đang điều chỉnh kế hoạch tập luyện cho tuần sau!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Process;
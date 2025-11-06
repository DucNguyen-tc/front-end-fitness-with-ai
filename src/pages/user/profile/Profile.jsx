// import { useState, useContext, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   InputAdornment,
//   ToggleButtonGroup,
//   ToggleButton,
//   Snackbar,
//   Container,
//   CircularProgress,
// } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";
// import {
//   Person,
//   MonitorWeight,
//   Height,
//   FitnessCenter,
//   Adjust,
//   Speed,
// } from "@mui/icons-material";
// import Male from "@mui/icons-material/Male";
// import Female from "@mui/icons-material/Female";
// import { createUser, getUserByAccountId } from "../../../services/userService";
// import { createPlanByAI } from "../../../services/planService";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../../stores/UserContext";

// // === Dữ liệu cho các lựa chọn ===
// const activityLevels = [
//   { value: 0, label: "Ít vận động" },
//   { value: 1, label: "Vận động nhẹ" },
//   { value: 2, label: "Vận động cơ bản" },
//   { value: 3, label: "Vận động nhiều" },
// ];

// const fitnessLevels = [
//   { value: 0, label: "Mới bắt đầu" },
//   { value: 1, label: "Trung bình" },
//   { value: 2, label: "Nâng cao" },
// ];

// const timeFrames = [
//   { value: 8, label: "8 tuần" },
//   { value: 10, label: "10 tuần" },
//   { value: 12, label: "12 tuần" },
// ];

// // === Mức mỡ cơ thể (theo enum bên backend) ===
// const bodyFatLevels = [
//   "Essential fat (10-13%)",
//   "Athletic (14-20%)",
//   "Fitness (21-24%)",
//   "Average (25-31%)",
//   "Obese (32% and higher)",
// ];

// // === Mô tả ý nghĩa từng mức mỡ ===
// const bodyFatDescriptions = {
//   "Essential fat (10-13%)":
//     "Mức mỡ thiết yếu để duy trì hoạt động sinh lý và hormone.",
//   "Athletic (14-20%)":
//     "Thể trạng săn chắc, cơ rõ nét. Thường thấy ở vận động viên hoặc người tập luyện cường độ cao.",
//   "Fitness (21-24%)":
//     "Thể trạng tốt, dáng đẹp, thường gặp ở người tập luyện thể thao đều đặn.",
//   "Average (25-31%)":
//     "Mức trung bình phổ biến ở người trưởng thành ít vận động, cơ thể chưa săn chắc.",
//   "Obese (32% and higher)":
//     "Mức mỡ cao, dễ dẫn đến béo phì và các vấn đề về tim mạch hoặc chuyển hóa.",
// };

// export default function Profile() {
//   const [form, setForm] = useState({
//     gender: "Nam",
//     age: "",
//     height: "",
//     weight: "",
//     bmi: "",
//     bodyFatPercentageBefore: "",
//     activityLevel: 0,
//     fitnessLevel: 0,
//     bodyFatPercentageAfter: "",
//     weightGoal: "",
//     timeFrame: 8,
//   });

//   const [error, setError] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [loading, setLoading] = useState(false);
//   const { user } = useContext(UserContext);
//   const [isExistingProfile, setIsExistingProfile] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const userProfile = await getUserByAccountId(user.sub); // gọi API
//         console.log("Thông tin user từ backend:", userProfile);

//         if (userProfile.data.profile) {
//           setForm({
//             gender: userProfile.data.profile.gender,
//             age: userProfile.data.profile.age?.toString(),
//             height: userProfile.data.profile.height?.toString(),
//             weight: userProfile.data.profile.weight?.toString(),
//             bmi: userProfile.data.profile.bmi?.toString(),
//             bodyFatPercentageBefore:
//               userProfile.data.profile.bodyFatPercentageBefore,
//             activityLevel:
//               activityLevels.find(
//                 (l) => l.label === userProfile.data.profile.activityLevel
//               )?.value ?? 0,
//             fitnessLevel:
//               fitnessLevels.find(
//                 (l) => l.label === userProfile.data.profile.fitnessLevel
//               )?.value ?? 0,
//             bodyFatPercentageAfter:
//               userProfile.data.goals.bodyFatPercentageAfter || "",
//             weightGoal: userProfile.data.goals.weightGoal?.toString() || "",
//             timeFrame: userProfile.data.goals.timeFrame || 8,
//           });
//           setIsExistingProfile(true); // ✅ user đã có profile
//         }
//       } catch (err) {
//         console.warn("User chưa có profile hoặc lỗi khi lấy dữ liệu:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.sub) fetchProfile();
//   }, [user]);
//   const isDisabled = isExistingProfile;

//   // === Hàm kiểm tra form ===
//   const validateForm = () => {
//     if (!form.age || form.age < 15 || form.age > 80)
//       return "Vui lòng nhập tuổi hợp lệ.";
//     if (!form.height || form.height < 130 || form.height > 220)
//       return "Vui lòng nhập chiều cao hợp lệ.";
//     if (!form.weight || form.weight < 30 || form.weight > 200)
//       return "Vui lòng nhập cân nặng hợp lệ.";
//     if (!form.bodyFatPercentageBefore)
//       return "Vui lòng chọn mức mỡ cơ thể hiện tại.";
//     if (!form.bodyFatPercentageAfter)
//       return "Vui lòng chọn mức mỡ cơ thể mục tiêu.";
//     if (!form.weightGoal || form.weightGoal <= 0)
//       return "Vui lòng nhập mục tiêu cân nặng.";
//     if (Number(form.weightGoal) > Number(form.weight)) {
//       return "Mục tiêu cân nặng phải nhỏ hơn cân nặng hiện tại!";
//     }

//     // ✅ Kiểm tra nếu người dùng chọn bodyFatAfter >= bodyFatBefore
//     const beforeIndex = bodyFatLevels.indexOf(form.bodyFatPercentageBefore);
//     const afterIndex = bodyFatLevels.indexOf(form.bodyFatPercentageAfter);
//     if (afterIndex >= beforeIndex) {
//       return "Mức mỡ cơ thể mục tiêu phải thấp hơn mức hiện tại!";
//     }

//     return null;
//   };

//   // === Xử lý khi nhập dữ liệu ===
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => {
//       const updated = { ...prev, [name]: value };
//       if (name === "height" || name === "weight") {
//         const heightM = parseFloat(updated.height) / 100;
//         const weightKg = parseFloat(updated.weight);
//         if (heightM > 0 && weightKg > 0) {
//           updated.bmi = (weightKg / (heightM * heightM)).toFixed(1);
//         } else {
//           updated.bmi = "";
//         }
//       }
//       return updated;
//     });
//   };

//   const handleGenderChange = (event, newGender) => {
//     if (newGender !== null) {
//       setForm((prev) => ({ ...prev, gender: newGender }));
//     }
//   };

//   const handleSubmit = async () => {
//     const validationError = validateForm();
//     if (validationError) {
//       setSnackbarSeverity("error");
//       setError(validationError);
//       setOpenSnackbar(true);
//       return;
//     }

//     try {
//       setLoading(true);

//       setSnackbarSeverity("success");
//       setError("Huấn luyện viên AI đang tạo lộ trình riêng cho bạn...");

//       await new Promise((resolve) => setTimeout(resolve, 5000));

//       const payload = {
//         accountId: user.sub,
//         profile: {
//           gender: form.gender,
//           age: Number(form.age),
//           height: Number(form.height),
//           weight: Number(form.weight),
//           bmi: Number(form.bmi),
//           bodyFatPercentageBefore: form.bodyFatPercentageBefore,
//           activityLevel: activityLevels.find(
//             (l) => l.value === form.activityLevel
//           )?.label,
//           fitnessLevel: fitnessLevels.find((l) => l.value === form.fitnessLevel)
//             ?.label,
//         },
//         goals: {
//           bodyFatPercentageAfter: form.bodyFatPercentageAfter,
//           weightGoal: Number(form.weightGoal),
//           timeFrame: Number(form.timeFrame),
//         },
//       };

//       // gọi API backend
//       const response = await createUser(payload);
//       const plan = await createPlanByAI(response.data._id);

//       console.log("Lộ trình tạo ra:", plan);

//       // hiển thị thông báo thành công
//       setError(
//         "🎯 Lộ trình của bạn đã sẵn sàng! Hãy bắt đầu tuần đầu tiên nào!"
//       );
//       setSnackbarSeverity("success");
//       setOpenSnackbar(true);

//       setTimeout(() => {
//         navigate("/user/plan");
//       }, 2000);
//     } catch (err) {
//       console.error("Lỗi khi tạo người dùng:", err);
//       setSnackbarSeverity("error");
//       setError("Đã có lỗi xảy ra khi tạo hồ sơ. Vui lòng thử lại!");
//       setOpenSnackbar(true);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Box className="bg-slate-100 min-h-screen py-10">
//       <Container maxWidth="md">
//         <Typography
//           variant="h4"
//           component="h1"
//           className="text-center font-bold text-gray-800 mb-8"
//         >
//           Hồ Sơ Sức Khỏe Của Bạn 🏃
//         </Typography>

//         {/* --- Card 1: Thông tin cơ bản --- */}
//         <Card className="shadow-lg rounded-2xl mb-6">
//           <CardContent className="p-6">
//             <Typography
//               variant="h6"
//               className="font-semibold text-gray-700 pb-6"
//             >
//               Thông tin cơ bản
//             </Typography>
//             <Grid container spacing={3} alignItems="flex-end">
//               <Grid item xs={12} sm={6}>
//                 <Typography gutterBottom className="font-medium text-gray-600">
//                   Giới tính
//                 </Typography>
//                 <ToggleButtonGroup
//                   color="primary"
//                   value={form.gender}
//                   exclusive
//                   onChange={handleGenderChange}
//                   disabled={isDisabled}
//                   fullWidth
//                 >
//                   <ToggleButton value="Nam">
//                     <Male className="mr-2" /> Nam
//                   </ToggleButton>
//                   <ToggleButton value="Nữ">
//                     <Female className="mr-2" /> Nữ
//                   </ToggleButton>
//                 </ToggleButtonGroup>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Tuổi"
//                   name="age"
//                   type="number"
//                   value={form.age}
//                   onChange={handleChange}
//                   disabled={isDisabled}
//                   helperText="Tuổi từ 15 đến 80"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Person />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Chiều cao (cm)"
//                   name="height"
//                   type="number"
//                   value={form.height}
//                   onChange={handleChange}
//                   disabled={isDisabled}
//                   helperText="Chiều cao từ 130 đến 220"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Height />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Cân nặng (kg)"
//                   name="weight"
//                   type="number"
//                   value={form.weight}
//                   onChange={handleChange}
//                   disabled={isDisabled}
//                   helperText="Cân nặng từ 30 đến 200"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <MonitorWeight />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="BMI"
//                   name="bmi"
//                   value={form.bmi}
//                   helperText="Tự động tính khi nhập chiều cao và cân nặng"
//                   disabled={isDisabled}
//                   InputProps={{
//                     readOnly: true,
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Speed />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* --- Card 2: Mức mỡ và hoạt động --- */}
//         <Card className="shadow-lg rounded-2xl mb-6">
//           <CardContent className="p-6">
//             <Typography
//               variant="h6"
//               className="font-semibold text-gray-700 pb-6"
//             >
//               Chỉ số & Mức độ
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Mức mỡ cơ thể (hiện tại)"
//                   name="bodyFatPercentageBefore"
//                   value={form.bodyFatPercentageBefore}
//                   disabled={isDisabled}
//                   onChange={handleChange}
//                   helperText="Hãy chọn mức mỡ hiện tại của bạn"
//                 >
//                   {bodyFatLevels.map((level) => (
//                     <MenuItem key={level} value={level}>
//                       {level}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//                 {form.bodyFatPercentageBefore && (
//                   <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
//                     {bodyFatDescriptions[form.bodyFatPercentageBefore]}
//                   </Typography>
//                 )}
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Mức độ hoạt động"
//                   name="activityLevel"
//                   value={form.activityLevel}
//                   disabled={isDisabled}
//                   onChange={handleChange}
//                   helperText="Chọn mức độ vận động hàng ngày"
//                 >
//                   {activityLevels.map((level) => (
//                     <MenuItem key={level.value} value={level.value}>
//                       {level.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Mức độ thể chất"
//                   name="fitnessLevel"
//                   value={form.fitnessLevel}
//                   disabled={isDisabled}
//                   onChange={handleChange}
//                   helperText="Chọn trình độ tập luyện hiện tại"
//                 >
//                   {fitnessLevels.map((level) => (
//                     <MenuItem key={level.value} value={level.value}>
//                       {level.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* --- Card 3: Mục tiêu --- */}
//         <Card className="shadow-lg rounded-2xl">
//           <CardContent className="p-6">
//             <Typography
//               variant="h6"
//               className="font-semibold text-gray-700 pb-6"
//             >
//               Mục tiêu của bạn
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Mức mỡ cơ thể (mục tiêu)"
//                   name="bodyFatPercentageAfter"
//                   value={form.bodyFatPercentageAfter}
//                   disabled={isDisabled}
//                   onChange={handleChange}
//                   helperText="Hãy chọn mức mỡ bạn muốn đạt được"
//                 >
//                   {bodyFatLevels.map((level) => (
//                     <MenuItem key={level} value={level}>
//                       {level}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//                 {form.bodyFatPercentageAfter && (
//                   <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
//                     {bodyFatDescriptions[form.bodyFatPercentageAfter]}
//                   </Typography>
//                 )}
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Mục tiêu cân nặng (kg)"
//                   name="weightGoal"
//                   type="number"
//                   value={form.weightGoal}
//                   disabled={isDisabled}
//                   onChange={handleChange}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <FitnessCenter />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   select
//                   label="Thời gian (tuần)"
//                   name="timeFrame"
//                   value={form.timeFrame}
//                   disabled={isDisabled}
//                   onChange={handleChange}
//                   helperText="Chọn thời gian hoàn thành mục tiêu"
//                 >
//                   {timeFrames.map((t) => (
//                     <MenuItem key={t.value} value={t.value}>
//                       {t.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* --- Nút lưu --- */}
//         <Box textAlign="center" mt={4}>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={handleSubmit}
//             disabled={loading || isDisabled}
//             className={`rounded-lg font-bold text-lg px-8 py-3 transition-all duration-300 ${
//               isDisabled
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {isDisabled ? (
//               "Đã tạo hồ sơ"
//             ) : loading ? (
//               <Box display="flex" alignItems="center" gap={2}>
//                 <CircularProgress size={24} color="inherit" />
//                 <Typography fontSize={16} fontWeight="bold">
//                   Huấn luyện viên AI đang tạo lộ trình riêng cho bạn...
//                 </Typography>
//               </Box>
//             ) : (
//               "Lưu thông tin"
//             )}
//           </Button>
//         </Box>

//         {/* Snackbar thông báo */}
//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={4000}
//           onClose={() => setOpenSnackbar(false)}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <MuiAlert
//             onClose={() => setOpenSnackbar(false)}
//             severity={snackbarSeverity}
//             variant="filled"
//           >
//             {error}
//           </MuiAlert>
//         </Snackbar>
//       </Container>
//     </Box>
//   );
// }


// import { useState, useContext, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   ToggleButtonGroup,
//   ToggleButton,
//   Snackbar,
//   Container,
//   CircularProgress,
//   LinearProgress,
//   Fade,
//   Zoom,
// } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";
// import {
//   Person,
//   MonitorWeight,
//   Height,
//   FitnessCenter,
//   Speed,
// } from "@mui/icons-material";
// import Male from "@mui/icons-material/Male";
// import Female from "@mui/icons-material/Female";
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import { createUser, getUserByAccountId } from "../../../services/userService";
// import { createPlanByAI } from "../../../services/planService";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../../stores/UserContext";

// // === Dữ liệu cho các lựa chọn ===
// const activityLevels = [
//   { value: 0, label: "Ít vận động" },
//   { value: 1, label: "Vận động nhẹ" },
//   { value: 2, label: "Vận động cơ bản" },
//   { value: 3, label: "Vận động nhiều" },
// ];

// const fitnessLevels = [
//   { value: 0, label: "Mới bắt đầu" },
//   { value: 1, label: "Trung bình" },
//   { value: 2, label: "Nâng cao" },
// ];

// const timeFrames = [
//   { value: 8, label: "8 tuần" },
//   { value: 10, label: "10 tuần" },
//   { value: 12, label: "12 tuần" },
// ];

// // === Mức mỡ cơ thể ===
// const bodyFatLevels = [
//   "Essential fat (10-13%)",
//   "Athletic (14-20%)",
//   "Fitness (21-24%)",
//   "Average (25-31%)",
//   "Obese (32% and higher)",
// ];

// const bodyFatDescriptions = {
//   "Essential fat (10-13%)": "Mức mỡ thiết yếu để duy trì hoạt động sinh lý và hormone.",
//   "Athletic (14-20%)": "Thể trạng săn chắc, cơ rõ nét. Thường thấy ở vận động viên hoặc người tập luyện cường độ cao.",
//   "Fitness (21-24%)": "Thể trạng tốt, dáng đẹp, thường gặp ở người tập luyện thể thao đều đặn.",
//   "Average (25-31%)": "Mức trung bình phổ biến ở người trưởng thành ít vận động, cơ thể chưa săn chắc.",
//   "Obese (32% and higher)": "Mức mỡ cao, dễ dẫn đến béo phì và các vấn đề về tim mạch hoặc chuyển hóa.",
// };

// export default function Profile() {
//   const [form, setForm] = useState({
//     gender: "Nam",
//     age: "",
//     height: "",
//     weight: "",
//     bmi: "",
//     bodyFatPercentageBefore: "",
//     activityLevel: 0,
//     fitnessLevel: 0,
//     bodyFatPercentageAfter: "",
//     weightGoal: "",
//     timeFrame: 8,
//   });

//   const [error, setError] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [loading, setLoading] = useState(false);
//   const [aiProgress, setAiProgress] = useState(0);
//   const [aiStep, setAiStep] = useState("");
//   const [showAiAnimation, setShowAiAnimation] = useState(false);
//   const { user } = useContext(UserContext);
//   const [isExistingProfile, setIsExistingProfile] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const userProfile = await getUserByAccountId(user.sub);

//         if (userProfile.data.profile) {
//           setForm({
//             gender: userProfile.data.profile.gender,
//             age: userProfile.data.profile.age?.toString(),
//             height: userProfile.data.profile.height?.toString(),
//             weight: userProfile.data.profile.weight?.toString(),
//             bmi: userProfile.data.profile.bmi?.toString(),
//             bodyFatPercentageBefore: userProfile.data.profile.bodyFatPercentageBefore,
//             activityLevel: activityLevels.find((l) => l.label === userProfile.data.profile.activityLevel)?.value ?? 0,
//             fitnessLevel: fitnessLevels.find((l) => l.label === userProfile.data.profile.fitnessLevel)?.value ?? 0,
//             bodyFatPercentageAfter: userProfile.data.goals.bodyFatPercentageAfter || "",
//             weightGoal: userProfile.data.goals.weightGoal?.toString() || "",
//             timeFrame: userProfile.data.goals.timeFrame || 8,
//           });
//           setIsExistingProfile(true);
//         }
//       } catch (err) {
//         console.warn("User chưa có profile hoặc lỗi khi lấy dữ liệu:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.sub) fetchProfile();
//   }, [user]);

//   const isDisabled = isExistingProfile;

//   const validateForm = () => {
//     if (!form.age || form.age < 15 || form.age > 80) return "Vui lòng nhập tuổi hợp lệ.";
//     if (!form.height || form.height < 130 || form.height > 220) return "Vui lòng nhập chiều cao hợp lệ.";
//     if (!form.weight || form.weight < 30 || form.weight > 200) return "Vui lòng nhập cân nặng hợp lệ.";
//     if (!form.bodyFatPercentageBefore) return "Vui lòng chọn mức mỡ cơ thể hiện tại.";
//     if (!form.bodyFatPercentageAfter) return "Vui lòng chọn mức mỡ cơ thể mục tiêu.";
//     if (!form.weightGoal || form.weightGoal <= 0) return "Vui lòng nhập mục tiêu cân nặng.";
//     if (Number(form.weightGoal) > Number(form.weight)) return "Mục tiêu cân nặng phải nhỏ hơn cân nặng hiện tại!";

//     const beforeIndex = bodyFatLevels.indexOf(form.bodyFatPercentageBefore);
//     const afterIndex = bodyFatLevels.indexOf(form.bodyFatPercentageAfter);
//     if (afterIndex >= beforeIndex) return "Mức mỡ cơ thể mục tiêu phải thấp hơn mức hiện tại!";

//     return null;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => {
//       const updated = { ...prev, [name]: value };
//       if (name === "height" || name === "weight") {
//         const heightM = parseFloat(updated.height) / 100;
//         const weightKg = parseFloat(updated.weight);
//         if (heightM > 0 && weightKg > 0) {
//           updated.bmi = (weightKg / (heightM * heightM)).toFixed(1);
//         } else {
//           updated.bmi = "";
//         }
//       }
//       return updated;
//     });
//   };

//   const handleGenderChange = (event, newGender) => {
//     if (newGender !== null) {
//       setForm((prev) => ({ ...prev, gender: newGender }));
//     }
//   };

//   const simulateAiProgress = () => {
//     const steps = [
//       { progress: 20, text: "📊 Phân tích dữ liệu sức khỏe..." },
//       { progress: 40, text: "🧠 AI đang tính toán calo và dinh dưỡng..." },
//       { progress: 60, text: "💪 Thiết kế bài tập cá nhân hóa..." },
//       { progress: 80, text: "📅 Lên lịch tập luyện tối ưu..." },
//       { progress: 95, text: "🎯 Hoàn thiện lộ trình..." },
//     ];

//     steps.forEach((step, index) => {
//       setTimeout(() => {
//         setAiProgress(step.progress);
//         setAiStep(step.text);
//       }, (index + 1) * 1000);
//     });
//   };

//   const handleSubmit = async () => {
//     const validationError = validateForm();
//     if (validationError) {
//       setSnackbarSeverity("error");
//       setError(validationError);
//       setOpenSnackbar(true);
//       return;
//     }

//     try {
//       setLoading(true);
//       setShowAiAnimation(true);
//       setAiProgress(0);
//       setAiStep("🚀 Bắt đầu tạo lộ trình AI...");

//       simulateAiProgress();

//       await new Promise((resolve) => setTimeout(resolve, 6000));

//       const payload = {
//         accountId: user.sub,
//         profile: {
//           gender: form.gender,
//           age: Number(form.age),
//           height: Number(form.height),
//           weight: Number(form.weight),
//           bmi: Number(form.bmi),
//           bodyFatPercentageBefore: form.bodyFatPercentageBefore,
//           activityLevel: activityLevels.find((l) => l.value === form.activityLevel)?.label,
//           fitnessLevel: fitnessLevels.find((l) => l.value === form.fitnessLevel)?.label,
//         },
//         goals: {
//           bodyFatPercentageAfter: form.bodyFatPercentageAfter,
//           weightGoal: Number(form.weightGoal),
//           timeFrame: Number(form.timeFrame),
//         },
//       };

//       const response = await createUser(payload);
//       const plan = await createPlanByAI(response.data._id);

//       setAiProgress(100);
//       setAiStep("✅ Lộ trình đã sẵn sàng!");

//       setTimeout(() => {
//         setError("🎯 Lộ trình của bạn đã sẵn sàng! Hãy bắt đầu tuần đầu tiên nào!");
//         setSnackbarSeverity("success");
//         setOpenSnackbar(true);
//         setShowAiAnimation(false);

//         setTimeout(() => {
//           navigate("/user/plan");
//         }, 2000);
//       }, 1000);

//     } catch (err) {
//       console.error("Lỗi khi tạo người dùng:", err);
//       setSnackbarSeverity("error");
//       setError("Đã có lỗi xảy ra khi tạo hồ sơ. Vui lòng thử lại!");
//       setOpenSnackbar(true);
//       setShowAiAnimation(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
//       color: 'white',
//       py: 4
//     }}>
//       <Container maxWidth="md">
//         {/* Header */}
//         <Fade in timeout={1000}>
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography
//               variant="h3"
//               fontWeight="bold"
//               sx={{
//                 background: 'linear-gradient(45deg, #ffffff, #dc2d2d)',
//                 backgroundClip: 'text',
//                 WebkitBackgroundClip: 'text',
//                 color: 'transparent',
//                 mb: 2
//               }}
//             >
//               🏃 Hồ Sơ Sức Khỏe Của Bạn
//             </Typography>
//             <Typography variant="h6" sx={{ color: '#ccc' }}>
//               Khám phá lộ trình tập luyện được AI thiết kế riêng cho bạn
//             </Typography>
//           </Box>
//         </Fade>

//         {/* AI Loading Animation */}
//         {showAiAnimation && (
//           <Fade in timeout={500}>
//             <Card sx={{
//               borderRadius: 3,
//               mb: 4,
//               background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
//               border: '2px solid #dc2d2d',
//               boxShadow: '0 8px 32px rgba(220, 45, 45, 0.3)'
//             }}>
//               <CardContent sx={{ p: 4, textAlign: 'center' }}>
//                 <AutoAwesomeIcon sx={{ fontSize: 60, color: '#dc2d2d', mb: 2 }} />
//                 <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
//                   🧠 AI Đang Tạo Lộ Trình
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: '#ccc', mb: 3 }}>
//                   {aiStep}
//                 </Typography>
                
//                 <Box sx={{ position: 'relative', mb: 2 }}>
//                   <LinearProgress 
//                     variant="determinate" 
//                     value={aiProgress}
//                     sx={{
//                       height: 12,
//                       borderRadius: 6,
//                       bgcolor: '#333',
//                       '& .MuiLinearProgress-bar': {
//                         background: 'linear-gradient(45deg, #dc2d2d, #ff6b6b)',
//                         borderRadius: 6,
//                       }
//                     }}
//                   />
//                   <Typography 
//                     variant="body2" 
//                     sx={{ 
//                       position: 'absolute', 
//                       top: '50%', 
//                       left: '50%', 
//                       transform: 'translate(-50%, -50%)',
//                       color: 'white',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     {aiProgress}%
//                   </Typography>
//                 </Box>

//                 <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
//                   <Box sx={{ 
//                     animation: 'pulse 1.5s infinite',
//                     '@keyframes pulse': {
//                       '0%, 100%': { opacity: 1 },
//                       '50%': { opacity: 0.5 },
//                     }
//                   }}>
//                     <PsychologyIcon sx={{ color: '#dc2d2d' }} />
//                   </Box>
//                   <Box sx={{ 
//                     animation: 'pulse 1.5s infinite 0.3s',
//                     '@keyframes pulse': {
//                       '0%, 100%': { opacity: 1 },
//                       '50%': { opacity: 0.5 },
//                     }
//                   }}>
//                     <TrendingUpIcon sx={{ color: '#4caf50' }} />
//                   </Box>
//                   <Box sx={{ 
//                     animation: 'pulse 1.5s infinite 0.6s',
//                     '@keyframes pulse': {
//                       '0%, 100%': { opacity: 1 },
//                       '50%': { opacity: 0.5 },
//                     }
//                   }}>
//                     <AutoAwesomeIcon sx={{ color: '#ff9800' }} />
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Fade>
//         )}

//         {/* Card 1: Thông tin cơ bản */}
//         <Zoom in timeout={800}>
//           <Card sx={{ 
//             borderRadius: 3, 
//             mb: 4,
//             background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
//             border: '2px solid #333',
//           }}>
//             <CardContent sx={{ p: 4 }}>
//               <Typography variant="h5" sx={{ color: 'white', pb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Person sx={{ color: '#dc2d2d' }} />
//                 Thông tin cơ bản
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid size={{xs: 12, sm: 6}}>
//                   <Typography sx={{ color: '#ccc', mb: 1 }}>Giới tính</Typography>
//                   <ToggleButtonGroup
//                     value={form.gender}
//                     exclusive
//                     onChange={handleGenderChange}
//                     disabled={isDisabled}
//                     fullWidth
//                     sx={{
//                       '& .MuiToggleButton-root': {
//                         color: '#ccc',
//                         borderColor: '#444',
//                         '&.Mui-selected': {
//                           bgcolor: '#dc2d2d',
//                           color: 'white',
//                         },
//                       }
//                     }}
//                   >
//                     <ToggleButton value="Nam">
//                       <Male sx={{ mr: 1 }} /> Nam
//                     </ToggleButton>
//                     <ToggleButton value="Nữ">
//                       <Female sx={{ mr: 1 }} /> Nữ
//                     </ToggleButton>
//                   </ToggleButtonGroup>
//                 </Grid>

//                 <Grid size={{xs: 12, sm: 6}}>
//                   <TextField
//                     fullWidth
//                     label="Tuổi"
//                     name="age"
//                     type="number"
//                     value={form.age}
//                     onChange={handleChange}
//                     disabled={isDisabled}
//                     helperText="Tuổi từ 15 đến 80"
//                     slotProps={{
//                       input: {
//                         startAdornment: <Person sx={{ color: '#dc2d2d', mr: 1 }} />,
//                       },
//                       htmlInput: {
//                         sx: { color: 'white' }
//                       }
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                         '&:hover fieldset': { borderColor: '#dc2d2d' },
//                       }
//                     }}
//                   />
//                 </Grid>

//                 <Grid size={{xs: 12, sm: 4}}>
//                   <TextField
//                     fullWidth
//                     label="Chiều cao (cm)"
//                     name="height"
//                     type="number"
//                     value={form.height}
//                     onChange={handleChange}
//                     disabled={isDisabled}
//                     helperText="Chiều cao từ 130 đến 220"
//                     slotProps={{
//                       input: {
//                         startAdornment: <Height sx={{ color: '#dc2d2d', mr: 1 }} />,
//                       }
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                       }
//                     }}
//                   />
//                 </Grid>

//                 <Grid size={{xs: 12, sm: 4}}>
//                   <TextField
//                     fullWidth
//                     label="Cân nặng (kg)"
//                     name="weight"
//                     type="number"
//                     value={form.weight}
//                     onChange={handleChange}
//                     disabled={isDisabled}
//                     helperText="Cân nặng từ 30 đến 200"
//                     slotProps={{
//                       input: {
//                         startAdornment: <MonitorWeight sx={{ color: '#dc2d2d', mr: 1 }} />,
//                       }
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                       }
//                     }}
//                   />
//                 </Grid>

//                 <Grid size={{xs: 12, sm: 4}}>
//                   <TextField
//                     fullWidth
//                     label="BMI"
//                     value={form.bmi}
//                     helperText="Tự động tính khi nhập chiều cao và cân nặng"
//                     disabled
//                     slotProps={{
//                       input: {
//                         startAdornment: <Speed sx={{ color: '#dc2d2d', mr: 1 }} />,
//                       }
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                       }
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Zoom>

//         {/* Card 2: Mức mỡ và hoạt động */}
//         <Zoom in timeout={800} style={{ transitionDelay: '200ms' }}>
//           <Card sx={{ 
//             borderRadius: 3, 
//             mb: 4,
//             background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
//             border: '2px solid #333',
//           }}>
//             <CardContent sx={{ p: 4 }}>
//               <Typography variant="h5" sx={{ color: 'white', pb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <FitnessCenter sx={{ color: '#dc2d2d' }} />
//                 Chỉ số & Mức độ
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid size={{xs: 12}}>
//                   <TextField
//                     select
//                     fullWidth
//                     label="Mức mỡ cơ thể (hiện tại)"
//                     name="bodyFatPercentageBefore"
//                     value={form.bodyFatPercentageBefore}
//                     disabled={isDisabled}
//                     onChange={handleChange}
//                     helperText="Hãy chọn mức mỡ hiện tại của bạn"
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                       }
//                     }}
//                   >
//                     {bodyFatLevels.map((level) => (
//                       <MenuItem key={level} value={level} sx={{ color: 'white' }}>
//                         {level}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                   {form.bodyFatPercentageBefore && (
//                     <Typography variant="body2" sx={{ mt: 1, color: '#dc2d2d' }}>
//                       {bodyFatDescriptions[form.bodyFatPercentageBefore]}
//                     </Typography>
//                   )}
//                 </Grid>

//                 <Grid size={{xs: 12, sm: 6}}>
//                   <TextField
//                     select
//                     fullWidth
//                     label="Mức độ hoạt động"
//                     name="activityLevel"
//                     value={form.activityLevel}
//                     disabled={isDisabled}
//                     onChange={handleChange}
//                     helperText="Chọn mức độ vận động hàng ngày"
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                       }
//                     }}
//                   >
//                     {activityLevels.map((level) => (
//                       <MenuItem key={level.value} value={level.value} sx={{ color: 'white' }}>
//                         {level.label}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

//                 <Grid size={{xs: 12, sm: 6}}>
//                   <TextField
//                     select
//                     fullWidth
//                     label="Mức độ thể chất"
//                     name="fitnessLevel"
//                     value={form.fitnessLevel}
//                     disabled={isDisabled}
//                     onChange={handleChange}
//                     helperText="Chọn trình độ tập luyện hiện tại"
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                       }
//                     }}
//                   >
//                     {fitnessLevels.map((level) => (
//                       <MenuItem key={level.value} value={level.value} sx={{ color: 'white' }}>
//                         {level.label}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Zoom>

//         {/* Card 3: Mục tiêu */}
//         <Zoom in timeout={800} style={{ transitionDelay: '400ms' }}>
//           <Card sx={{ 
//             borderRadius: 3,
//             background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
//             border: '2px solid #333',
//           }}>
//             <CardContent sx={{ p: 4 }}>
//               <Typography variant="h5" sx={{ color: 'white', pb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <TrendingUpIcon sx={{ color: '#dc2d2d' }} />
//                 Mục tiêu của bạn
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid size={{xs: 12}}>
//                   <TextField
//                     select
//                     fullWidth
//                     label="Mức mỡ cơ thể (mục tiêu)"
//                     name="bodyFatPercentageAfter"
//                     value={form.bodyFatPercentageAfter}
//                     disabled={isDisabled}
//                     onChange={handleChange}
//                     helperText="Hãy chọn mức mỡ bạn muốn đạt được"
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                       }
//                     }}
//                   >
//                     {bodyFatLevels.map((level) => (
//                       <MenuItem key={level} value={level} sx={{ color: 'white' }}>
//                         {level}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                   {form.bodyFatPercentageAfter && (
//                     <Typography variant="body2" sx={{ mt: 1, color: '#dc2d2d' }}>
//                       {bodyFatDescriptions[form.bodyFatPercentageAfter]}
//                     </Typography>
//                   )}
//                 </Grid>

//                 <Grid size={{xs: 12, sm: 6}}>
//                   <TextField
//                     fullWidth
//                     label="Mục tiêu cân nặng (kg)"
//                     name="weightGoal"
//                     type="number"
//                     value={form.weightGoal}
//                     disabled={isDisabled}
//                     onChange={handleChange}
//                     slotProps={{
//                       input: {
//                         startAdornment: <FitnessCenter sx={{ color: '#dc2d2d', mr: 1 }} />,
//                       }
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                       }
//                     }}
//                   />
//                 </Grid>

//                 <Grid size={{xs: 12, sm: 6}}>
//                   <TextField
//                     fullWidth
//                     select
//                     label="Thời gian (tuần)"
//                     name="timeFrame"
//                     value={form.timeFrame}
//                     disabled={isDisabled}
//                     onChange={handleChange}
//                     helperText="Chọn thời gian hoàn thành mục tiêu"
//                     sx={{
//                       '& .MuiInputLabel-root': { color: '#ccc' },
//                       '& .MuiFormHelperText-root': { color: '#888' },
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': { borderColor: '#444' },
//                       }
//                     }}
//                   >
//                     {timeFrames.map((t) => (
//                       <MenuItem key={t.value} value={t.value} sx={{ color: 'white' }}>
//                         {t.label}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Zoom>

//         {/* Nút lưu */}
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={handleSubmit}
//             disabled={loading || isDisabled}
//             sx={{
//               borderRadius: 3,
//               fontWeight: 'bold',
//               fontSize: '1.1rem',
//               px: 6,
//               py: 1.5,
//               bgcolor: isDisabled ? '#666' : '#dc2d2d',
//               '&:hover': {
//                 bgcolor: isDisabled ? '#666' : '#c62828',
//                 transform: isDisabled ? 'none' : 'translateY(-2px)',
//               },
//               transition: 'all 0.3s ease',
//               minWidth: 300
//             }}
//           >
//             {isDisabled ? (
//               "✅ Đã tạo hồ sơ"
//             ) : loading ? (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <CircularProgress size={24} color="inherit" />
//                 <Typography fontSize={16} fontWeight="bold">
//                   Đang xử lý...
//                 </Typography>
//               </Box>
//             ) : (
//               "🚀 Tạo Lộ Trình AI"
//             )}
//           </Button>
//         </Box>

//         {/* Snackbar */}
//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={4000}
//           onClose={() => setOpenSnackbar(false)}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <MuiAlert
//             onClose={() => setOpenSnackbar(false)}
//             severity={snackbarSeverity}
//             variant="filled"
//             sx={{
//               bgcolor: snackbarSeverity === 'success' ? '#4caf50' : '#dc2d2d',
//               borderRadius: 2
//             }}
//           >
//             {error}
//           </MuiAlert>
//         </Snackbar>
//       </Container>
//     </Box>
//   );
// }

import { useState, useContext, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  ToggleButtonGroup,
  ToggleButton,
  Snackbar,
  Container,
  CircularProgress,
  LinearProgress,
  Fade,
  Zoom,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  Person,
  MonitorWeight,
  Height,
  FitnessCenter,
  Speed,
} from "@mui/icons-material";
import Male from "@mui/icons-material/Male";
import Female from "@mui/icons-material/Female";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { createUser, getUserByAccountId } from "../../../services/userService";
import { createPlanByAI } from "../../../services/planService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../stores/UserContext";

// === Dữ liệu cho các lựa chọn ===
const activityLevels = [
  { value: 0, label: "Ít vận động" },
  { value: 1, label: "Vận động nhẹ" },
  { value: 2, label: "Vận động cơ bản" },
  { value: 3, label: "Vận động nhiều" },
];

const fitnessLevels = [
  { value: 0, label: "Mới bắt đầu" },
  { value: 1, label: "Trung bình" },
  { value: 2, label: "Nâng cao" },
];

const timeFrames = [
  { value: 8, label: "8 tuần" },
  { value: 10, label: "10 tuần" },
  { value: 12, label: "12 tuần" },
];

// === Mức mỡ cơ thể ===
const bodyFatLevels = [
  "Essential fat (10-13%)",
  "Athletic (14-20%)",
  "Fitness (21-24%)",
  "Average (25-31%)",
  "Obese (32% and higher)",
];

const bodyFatDescriptions = {
  "Essential fat (10-13%)": "Mức mỡ thiết yếu để duy trì hoạt động sinh lý và hormone.",
  "Athletic (14-20%)": "Thể trạng săn chắc, cơ rõ nét. Thường thấy ở vận động viên hoặc người tập luyện cường độ cao.",
  "Fitness (21-24%)": "Thể trạng tốt, dáng đẹp, thường gặp ở người tập luyện thể thao đều đặn.",
  "Average (25-31%)": "Mức trung bình phổ biến ở người trưởng thành ít vận động, cơ thể chưa săn chắc.",
  "Obese (32% and higher)": "Mức mỡ cao, dễ dẫn đến béo phì và các vấn đề về tim mạch hoặc chuyển hóa.",
};

export default function Profile() {
  const [form, setForm] = useState({
    gender: "Nam",
    age: "",
    height: "",
    weight: "",
    bmi: "",
    bodyFatPercentageBefore: "",
    activityLevel: 0,
    fitnessLevel: 0,
    bodyFatPercentageAfter: "",
    weightGoal: "",
    timeFrame: 8,
  });

  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiStep, setAiStep] = useState("");
  const [showAiAnimation, setShowAiAnimation] = useState(false);
  const { user } = useContext(UserContext);
  const [isExistingProfile, setIsExistingProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await getUserByAccountId(user.sub);

        if (userProfile.data.profile) {
          setForm({
            gender: userProfile.data.profile.gender,
            age: userProfile.data.profile.age?.toString(),
            height: userProfile.data.profile.height?.toString(),
            weight: userProfile.data.profile.weight?.toString(),
            bmi: userProfile.data.profile.bmi?.toString(),
            bodyFatPercentageBefore: userProfile.data.profile.bodyFatPercentageBefore,
            activityLevel: activityLevels.find((l) => l.label === userProfile.data.profile.activityLevel)?.value ?? 0,
            fitnessLevel: fitnessLevels.find((l) => l.label === userProfile.data.profile.fitnessLevel)?.value ?? 0,
            bodyFatPercentageAfter: userProfile.data.goals.bodyFatPercentageAfter || "",
            weightGoal: userProfile.data.goals.weightGoal?.toString() || "",
            timeFrame: userProfile.data.goals.timeFrame || 8,
          });
          setIsExistingProfile(true);
        }
      } catch (err) {
        console.warn("User chưa có profile hoặc lỗi khi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.sub) fetchProfile();
  }, [user]);

  const isDisabled = isExistingProfile;

  const validateForm = () => {
    if (!form.age || form.age < 15 || form.age > 80) return "Vui lòng nhập tuổi hợp lệ.";
    if (!form.height || form.height < 130 || form.height > 220) return "Vui lòng nhập chiều cao hợp lệ.";
    if (!form.weight || form.weight < 30 || form.weight > 200) return "Vui lòng nhập cân nặng hợp lệ.";
    if (!form.bodyFatPercentageBefore) return "Vui lòng chọn mức mỡ cơ thể hiện tại.";
    if (!form.bodyFatPercentageAfter) return "Vui lòng chọn mức mỡ cơ thể mục tiêu.";
    if (!form.weightGoal || form.weightGoal <= 0) return "Vui lòng nhập mục tiêu cân nặng.";
    if (Number(form.weightGoal) > Number(form.weight)) return "Mục tiêu cân nặng phải nhỏ hơn cân nặng hiện tại!";

    const beforeIndex = bodyFatLevels.indexOf(form.bodyFatPercentageBefore);
    const afterIndex = bodyFatLevels.indexOf(form.bodyFatPercentageAfter);
    if (afterIndex >= beforeIndex) return "Mức mỡ cơ thể mục tiêu phải thấp hơn mức hiện tại!";

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "height" || name === "weight") {
        const heightM = parseFloat(updated.height) / 100;
        const weightKg = parseFloat(updated.weight);
        if (heightM > 0 && weightKg > 0) {
          updated.bmi = (weightKg / (heightM * heightM)).toFixed(1);
        } else {
          updated.bmi = "";
        }
      }
      return updated;
    });
  };

  const handleGenderChange = (event, newGender) => {
    if (newGender !== null) {
      setForm((prev) => ({ ...prev, gender: newGender }));
    }
  };

  const simulateAiProgress = () => {
    const steps = [
      { progress: 20, text: "📊 Phân tích dữ liệu sức khỏe..." },
      { progress: 40, text: "🧠 AI đang tính toán calo và dinh dưỡng..." },
      { progress: 60, text: "💪 Thiết kế bài tập cá nhân hóa..." },
      { progress: 80, text: "📅 Lên lịch tập luyện tối ưu..." },
      { progress: 95, text: "🎯 Hoàn thiện lộ trình..." },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAiProgress(step.progress);
        setAiStep(step.text);
      }, (index + 1) * 1000);
    });
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setSnackbarSeverity("error");
      setError(validationError);
      setOpenSnackbar(true);
      return;
    }

    try {
      setLoading(true);
      setShowAiAnimation(true);
      setAiProgress(0);
      setAiStep("🚀 Bắt đầu tạo lộ trình AI...");

      simulateAiProgress();

      await new Promise((resolve) => setTimeout(resolve, 6000));

      const payload = {
        accountId: user.sub,
        profile: {
          gender: form.gender,
          age: Number(form.age),
          height: Number(form.height),
          weight: Number(form.weight),
          bmi: Number(form.bmi),
          bodyFatPercentageBefore: form.bodyFatPercentageBefore,
          activityLevel: activityLevels.find((l) => l.value === form.activityLevel)?.label,
          fitnessLevel: fitnessLevels.find((l) => l.value === form.fitnessLevel)?.label,
        },
        goals: {
          bodyFatPercentageAfter: form.bodyFatPercentageAfter,
          weightGoal: Number(form.weightGoal),
          timeFrame: Number(form.timeFrame),
        },
      };

      const response = await createUser(payload);
      const plan = await createPlanByAI(response.data._id);

      setAiProgress(100);
      setAiStep("✅ Lộ trình đã sẵn sàng!");

      setTimeout(() => {
        setError("🎯 Lộ trình của bạn đã sẵn sàng! Hãy bắt đầu tuần đầu tiên nào!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setShowAiAnimation(false);

        setTimeout(() => {
          navigate("/user/plan");
        }, 2000);
      }, 1000);

    } catch (err) {
      console.error("Lỗi khi tạo người dùng:", err);
      setSnackbarSeverity("error");
      setError("Đã có lỗi xảy ra khi tạo hồ sơ. Vui lòng thử lại!");
      setOpenSnackbar(true);
      setShowAiAnimation(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      color: 'white',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #ffffff, #dc2d2d)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 2
              }}
            >
              🏃 Hồ Sơ Sức Khỏe Của Bạn
            </Typography>
            <Typography variant="h6" sx={{ color: '#ccc' }}>
              Khám phá lộ trình tập luyện được AI thiết kế riêng cho bạn
            </Typography>
          </Box>
        </Fade>

        {/* AI Loading Animation */}
        {showAiAnimation && (
          <Fade in timeout={500}>
            <Card sx={{
              borderRadius: 3,
              mb: 4,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              border: '2px solid #dc2d2d',
              boxShadow: '0 8px 32px rgba(220, 45, 45, 0.3)'
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <AutoAwesomeIcon sx={{ fontSize: 60, color: '#dc2d2d', mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                  🧠 AI Đang Tạo Lộ Trình
                </Typography>
                <Typography variant="body1" sx={{ color: '#ccc', mb: 3 }}>
                  {aiStep}
                </Typography>
                
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={aiProgress}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      bgcolor: '#333',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(45deg, #dc2d2d, #ff6b6b)',
                        borderRadius: 6,
                      }
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {aiProgress}%
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                  <Box sx={{ 
                    animation: 'pulse 1.5s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    }
                  }}>
                    <PsychologyIcon sx={{ color: '#dc2d2d' }} />
                  </Box>
                  <Box sx={{ 
                    animation: 'pulse 1.5s infinite 0.3s',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    }
                  }}>
                    <TrendingUpIcon sx={{ color: '#4caf50' }} />
                  </Box>
                  <Box sx={{ 
                    animation: 'pulse 1.5s infinite 0.6s',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    }
                  }}>
                    <AutoAwesomeIcon sx={{ color: '#ff9800' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        )}

        {/* Bố cục chính - 3 cột ngang */}
        <Grid container spacing={3}>
          {/* Cột 1: Thông tin cơ bản */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Zoom in timeout={800}>
              <Card sx={{ 
                borderRadius: 3, 
                height: '100%',
                background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                border: '2px solid #333',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ color: 'white', pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person sx={{ color: '#dc2d2d' }} />
                    Thông tin cơ bản
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ color: '#ccc', mb: 1 }}>Giới tính</Typography>
                    <ToggleButtonGroup
                      value={form.gender}
                      exclusive
                      onChange={handleGenderChange}
                      disabled={isDisabled}
                      fullWidth
                      sx={{
                        '& .MuiToggleButton-root': {
                          color: '#ccc',
                          borderColor: '#444',
                          '&.Mui-selected': {
                            bgcolor: '#dc2d2d',
                            color: 'white',
                          },
                        }
                      }}
                    >
                      <ToggleButton value="Nam">
                        <Male sx={{ mr: 1 }} /> Nam
                      </ToggleButton>
                      <ToggleButton value="Nữ">
                        <Female sx={{ mr: 1 }} /> Nữ
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>

                  <TextField
                    fullWidth
                    label="Tuổi"
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    disabled={isDisabled}
                    helperText="Tuổi từ 15 đến 80"
                    sx={{
    mb: 2,
    '& .MuiInputLabel-root': { color: '#ccc' },
    '& .MuiFormHelperText-root': { color: '#888' },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#444' },
      '&:hover fieldset': { borderColor: '#dc2d2d' },
      '&.Mui-disabled': {
        '& fieldset': { borderColor: '#ccc' },
        '& input': { 
          color: '#ffffff !important',
          '-webkit-text-fill-color': '#ffffff !important'
        }
      },
    }
  }}
                  />

                  <TextField
                    fullWidth
                    label="Chiều cao (cm)"
                    name="height"
                    type="number"
                    value={form.height}
                    onChange={handleChange}
                    disabled={isDisabled}
                    helperText="Chiều cao từ 130 đến 220"
                    sx={{
                      mb: 2,
  '& .MuiInputLabel-root': { color: '#ccc' },
  '& .MuiFormHelperText-root': { color: '#888' },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: '#444' },
    '&.Mui-disabled': {
      '& fieldset': { borderColor: '#ccc' },
      '& input': { 
        color: '#ffffff !important', // Chữ trắng khi disabled
        '-webkit-text-fill-color': '#ffffff !important' // Quan trọng cho Chrome
      }
    },
  },
  '& .MuiSelect-icon': {
    color: '#ccc',
  }
}}
                  />

                  <TextField
                    fullWidth
                    label="Cân nặng (kg)"
                    name="weight"
                    type="number"
                    value={form.weight}
                    onChange={handleChange}
                    disabled={isDisabled}
                    helperText="Cân nặng từ 30 đến 200"
                    sx={{
                      mb: 2,
  '& .MuiInputLabel-root': { color: '#ccc' },
  '& .MuiFormHelperText-root': { color: '#888' },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: '#444' },
    '&.Mui-disabled': {
      '& fieldset': { borderColor: '#ccc' },
      '& input': { 
        color: '#ffffff !important', // Chữ trắng khi disabled
        '-webkit-text-fill-color': '#ffffff !important' // Quan trọng cho Chrome
      }
    },
  },
  '& .MuiSelect-icon': {
    color: '#ccc',
  }
}}
                  />

                 <TextField
  fullWidth
  label="BMI"
  value={form.bmi}
  helperText="Tự động tính khi nhập chiều cao và cân nặng"
  disabled
  sx={{
  '& .MuiInputLabel-root': { color: '#ccc' },
  '& .MuiFormHelperText-root': { color: '#888' },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: '#444' },
    '&.Mui-disabled': {
      '& fieldset': { borderColor: '#ccc' },
      '& input': { 
        color: '#ffffff !important', // Chữ trắng khi disabled
        '-webkit-text-fill-color': '#ffffff !important' // Quan trọng cho Chrome
      }
    },
  },
  '& .MuiSelect-icon': {
    color: '#ccc',
  }
}}
/>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          {/* Cột 2: Chỉ số & Mức độ */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Zoom in timeout={800} style={{ transitionDelay: '200ms' }}>
              <Card sx={{ 
                borderRadius: 3, 
                height: '100%',
                background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                border: '2px solid #333',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ color: 'white', pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FitnessCenter sx={{ color: '#dc2d2d' }} />
                    Chỉ số & Mức độ
                  </Typography>
                  
                  <TextField
                    select
                    fullWidth
                    label="Mức mỡ cơ thể (hiện tại)"
                    name="bodyFatPercentageBefore"
                    value={form.bodyFatPercentageBefore}
                    disabled={isDisabled}
                    onChange={handleChange}
                    helperText="Hãy chọn mức mỡ hiện tại của bạn"
                    
                    sx={{
    mb: 2,
    '& .MuiInputLabel-root': { color: '#ccc' },
    '& .MuiFormHelperText-root': { color: '#888' },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#444' },
      '&.Mui-disabled': {
        '& fieldset': { borderColor: '#555' },
        '& .MuiSelect-select': { 
          color: '#ffffff !important',
          '-webkit-text-fill-color': '#ffffff !important'
        }
      },
    },
    '& .MuiSelect-icon': {
      color: '#ccc',
    }
  }}
                  >
                    {bodyFatLevels.map((level) => (
  <MenuItem 
    key={level} 
    value={level} 
    sx={{ 
      color: 'black',
      '&:hover': {
        bgcolor: '#dc2d2d',
      },
      '&.Mui-selected': {
        bgcolor: '#dc2d2d',
        '&:hover': {
          bgcolor: '#c62828',
        }
      }
    }}
  >
    {level}
  </MenuItem>
))}
                  </TextField>
                  {form.bodyFatPercentageBefore && (
                    <Typography variant="body2" sx={{ mb: 2, color: '#dc2d2d', fontStyle: 'italic' }}>
                      {bodyFatDescriptions[form.bodyFatPercentageBefore]}
                    </Typography>
                  )}

                  <TextField
                    select
                    fullWidth
                    label="Mức độ hoạt động"
                    name="activityLevel"
                    value={form.activityLevel}
                    disabled={isDisabled}
                    onChange={handleChange}
                    helperText="Chọn mức độ vận động hàng ngày"
                    sx={{
    mb: 2,
    '& .MuiInputLabel-root': { color: '#ccc' },
    '& .MuiFormHelperText-root': { color: '#888' },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#444' },
      '&.Mui-disabled': {
        '& fieldset': { borderColor: '#555' },
        '& .MuiSelect-select': { 
          color: '#ffffff !important',
          '-webkit-text-fill-color': '#ffffff !important'
        }
      },
    },
    '& .MuiSelect-icon': {
      color: '#ccc',
    }
  }}
                  >
                    {activityLevels.map((level) => (
                      <MenuItem key={level.value} value={level.value} sx={{ 
      color: 'black',
      '&:hover': {
        bgcolor: '#dc2d2d',
      },
      '&.Mui-selected': {
        bgcolor: '#dc2d2d',
        '&:hover': {
          bgcolor: '#c62828',
        }
      }
    }}>
                        {level.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    fullWidth
                    label="Mức độ thể chất"
                    name="fitnessLevel"
                    value={form.fitnessLevel}
                    disabled={isDisabled}
                    onChange={handleChange}
                    helperText="Chọn trình độ tập luyện hiện tại"
                    sx={{
    mb: 2,
    '& .MuiInputLabel-root': { color: '#ccc' },
    '& .MuiFormHelperText-root': { color: '#888' },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#444' },
      '&.Mui-disabled': {
        '& fieldset': { borderColor: '#555' },
        '& .MuiSelect-select': { 
          color: '#ffffff !important',
          '-webkit-text-fill-color': '#ffffff !important'
        }
      },
    },
    '& .MuiSelect-icon': {
      color: '#ccc',
    }
  }}
                  >
                    {fitnessLevels.map((level) => (
                      <MenuItem key={level.value} value={level.value} sx={{ 
      color: 'black',
      '&:hover': {
        bgcolor: '#dc2d2d',
      },
      '&.Mui-selected': {
        bgcolor: '#dc2d2d',
        '&:hover': {
          bgcolor: '#c62828',
        }
      }
    }}>
                        {level.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          {/* Cột 3: Mục tiêu */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Zoom in timeout={800} style={{ transitionDelay: '400ms' }}>
              <Card sx={{ 
                borderRadius: 3,
                height: '100%',
                background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                border: '2px solid #333',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ color: 'white', pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUpIcon sx={{ color: '#dc2d2d' }} />
                    Mục tiêu của bạn
                  </Typography>
                  
                  <TextField
                    select
                    fullWidth
                    label="Mức mỡ cơ thể (mục tiêu)"
                    name="bodyFatPercentageAfter"
                    value={form.bodyFatPercentageAfter}
                    disabled={isDisabled}
                    onChange={handleChange}
                    helperText="Hãy chọn mức mỡ bạn muốn đạt được"
                    sx={{
    mb: 2,
    '& .MuiInputLabel-root': { color: '#ccc' },
    '& .MuiFormHelperText-root': { color: '#888' },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#444' },
      '&.Mui-disabled': {
        '& fieldset': { borderColor: '#555' },
        '& .MuiSelect-select': { 
          color: '#ffffff !important',
          '-webkit-text-fill-color': '#ffffff !important'
        }
      },
    },
    '& .MuiSelect-icon': {
      color: '#ccc',
    }
  }}
                  >
                    {bodyFatLevels.map((level) => (
                      <MenuItem key={level} value={level} sx={{ 
      color: 'black',
      '&:hover': {
        bgcolor: '#dc2d2d',
      },
      '&.Mui-selected': {
        bgcolor: '#dc2d2d',
        '&:hover': {
          bgcolor: '#c62828',
        }
      }
    }}>
                        {level}
                      </MenuItem>
                    ))}
                  </TextField>
                  {form.bodyFatPercentageAfter && (
                    <Typography variant="body2" sx={{ mb: 2, color: '#dc2d2d', fontStyle: 'italic' }}>
                      {bodyFatDescriptions[form.bodyFatPercentageAfter]}
                    </Typography>
                  )}

                  <TextField
                    fullWidth
                    label="Mục tiêu cân nặng (kg)"
                    name="weightGoal"
                    type="number"
                    value={form.weightGoal}
                    disabled={isDisabled}
                    onChange={handleChange}
                    sx={{
    mb: 2,
    '& .MuiInputLabel-root': { color: '#ccc' },
    '& .MuiFormHelperText-root': { color: '#888' },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#444' },
      '&.Mui-disabled': {
        '& fieldset': { borderColor: '#555' },
        '& input': { 
          color: '#ffffff !important',
          '-webkit-text-fill-color': '#ffffff !important'
        }
      },
    }
  }}
                  />

                  <TextField
                    fullWidth
                    select
                    label="Thời gian (tuần)"
                    name="timeFrame"
                    value={form.timeFrame}
                    disabled={isDisabled}
                    onChange={handleChange}
                    helperText="Chọn thời gian hoàn thành mục tiêu"
                    sx={{
    mb: 2,
    '& .MuiInputLabel-root': { color: '#ccc' },
    '& .MuiFormHelperText-root': { color: '#888' },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: '#444' },
      '&.Mui-disabled': {
        '& fieldset': { borderColor: '#555' },
        '& .MuiSelect-select': { 
          color: '#ffffff !important',
          '-webkit-text-fill-color': '#ffffff !important'
        }
      },
    },
    '& .MuiSelect-icon': {
      color: '#ccc',
    }
  }}
                  >
                    {timeFrames.map((t) => (
                      <MenuItem key={t.value} value={t.value} sx={{ 
      color: 'black',
      '&:hover': {
        bgcolor: '#dc2d2d',
      },
      '&.Mui-selected': {
        bgcolor: '#dc2d2d',
        '&:hover': {
          bgcolor: '#c62828',
        }
      }
    }}>
                        {t.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        </Grid>

        {/* Nút lưu */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading || isDisabled}
            sx={{
              borderRadius: 3,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              px: 6,
              py: 1.5,
              bgcolor: isDisabled ? '#666' : '#dc2d2d',
              '&:hover': {
                bgcolor: isDisabled ? '#666' : '#c62828',
                transform: isDisabled ? 'none' : 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
              minWidth: 300
            }}
          >
            {isDisabled ? (
              "✅ Đã tạo hồ sơ"
            ) : loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={24} color="inherit" />
                <Typography fontSize={16} fontWeight="bold">
                  Đang xử lý...
                </Typography>
              </Box>
            ) : (
              "🚀 Tạo Lộ Trình AI"
            )}
          </Button>
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            variant="filled"
            sx={{
              bgcolor: snackbarSeverity === 'success' ? '#4caf50' : '#dc2d2d',
              borderRadius: 2
            }}
          >
            {error}
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  );
}
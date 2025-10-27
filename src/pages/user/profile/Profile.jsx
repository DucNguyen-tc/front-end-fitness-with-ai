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
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Snackbar,
  Container,
  CircularProgress,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  Person,
  MonitorWeight,
  Height,
  FitnessCenter,
  Adjust,
  Speed,
} from "@mui/icons-material";
import Male from "@mui/icons-material/Male";
import Female from "@mui/icons-material/Female";
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

// === Mức mỡ cơ thể (theo enum bên backend) ===
const bodyFatLevels = [
  "Essential fat (10-13%)",
  "Athletic (14-20%)",
  "Fitness (21-24%)",
  "Average (25-31%)",
  "Obese (32% and higher)",
];

// === Mô tả ý nghĩa từng mức mỡ ===
const bodyFatDescriptions = {
  "Essential fat (10-13%)":
    "Mức mỡ thiết yếu để duy trì hoạt động sinh lý và hormone.",
  "Athletic (14-20%)":
    "Thể trạng săn chắc, cơ rõ nét. Thường thấy ở vận động viên hoặc người tập luyện cường độ cao.",
  "Fitness (21-24%)":
    "Thể trạng tốt, dáng đẹp, thường gặp ở người tập luyện thể thao đều đặn.",
  "Average (25-31%)":
    "Mức trung bình phổ biến ở người trưởng thành ít vận động, cơ thể chưa săn chắc.",
  "Obese (32% and higher)":
    "Mức mỡ cao, dễ dẫn đến béo phì và các vấn đề về tim mạch hoặc chuyển hóa.",
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
  const { user } = useContext(UserContext);
  const [isExistingProfile, setIsExistingProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await getUserByAccountId(user.sub); // gọi API
        console.log("Thông tin user từ backend:", userProfile);

        if (userProfile.data.profile) {
          setForm({
            gender: userProfile.data.profile.gender,
            age: userProfile.data.profile.age?.toString(),
            height: userProfile.data.profile.height?.toString(),
            weight: userProfile.data.profile.weight?.toString(),
            bmi: userProfile.data.profile.bmi?.toString(),
            bodyFatPercentageBefore:
              userProfile.data.profile.bodyFatPercentageBefore,
            activityLevel:
              activityLevels.find(
                (l) => l.label === userProfile.data.profile.activityLevel
              )?.value ?? 0,
            fitnessLevel:
              fitnessLevels.find(
                (l) => l.label === userProfile.data.profile.fitnessLevel
              )?.value ?? 0,
            bodyFatPercentageAfter:
              userProfile.data.goals.bodyFatPercentageAfter || "",
            weightGoal: userProfile.data.goals.weightGoal?.toString() || "",
            timeFrame: userProfile.data.goals.timeFrame || 8,
          });
          setIsExistingProfile(true); // ✅ user đã có profile
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

  // === Hàm kiểm tra form ===
  const validateForm = () => {
    if (!form.age || form.age < 15 || form.age > 80)
      return "Vui lòng nhập tuổi hợp lệ.";
    if (!form.height || form.height < 130 || form.height > 220)
      return "Vui lòng nhập chiều cao hợp lệ.";
    if (!form.weight || form.weight < 30 || form.weight > 200)
      return "Vui lòng nhập cân nặng hợp lệ.";
    if (!form.bodyFatPercentageBefore)
      return "Vui lòng chọn mức mỡ cơ thể hiện tại.";
    if (!form.bodyFatPercentageAfter)
      return "Vui lòng chọn mức mỡ cơ thể mục tiêu.";
    if (!form.weightGoal || form.weightGoal <= 0)
      return "Vui lòng nhập mục tiêu cân nặng.";
    if (Number(form.weightGoal) > Number(form.weight)) {
      return "Mục tiêu cân nặng phải nhỏ hơn cân nặng hiện tại!";
    }

    // ✅ Kiểm tra nếu người dùng chọn bodyFatAfter >= bodyFatBefore
    const beforeIndex = bodyFatLevels.indexOf(form.bodyFatPercentageBefore);
    const afterIndex = bodyFatLevels.indexOf(form.bodyFatPercentageAfter);
    if (afterIndex >= beforeIndex) {
      return "Mức mỡ cơ thể mục tiêu phải thấp hơn mức hiện tại!";
    }

    return null;
  };

  // === Xử lý khi nhập dữ liệu ===
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

      setSnackbarSeverity("success");
      setError("Huấn luyện viên AI đang tạo lộ trình riêng cho bạn...");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const payload = {
        accountId: user.sub,
        profile: {
          gender: form.gender,
          age: Number(form.age),
          height: Number(form.height),
          weight: Number(form.weight),
          bmi: Number(form.bmi),
          bodyFatPercentageBefore: form.bodyFatPercentageBefore,
          activityLevel: activityLevels.find(
            (l) => l.value === form.activityLevel
          )?.label,
          fitnessLevel: fitnessLevels.find((l) => l.value === form.fitnessLevel)
            ?.label,
        },
        goals: {
          bodyFatPercentageAfter: form.bodyFatPercentageAfter,
          weightGoal: Number(form.weightGoal),
          timeFrame: Number(form.timeFrame),
        },
      };

      // gọi API backend
      const response = await createUser(payload);
      const plan = await createPlanByAI(response.data._id);

      console.log("Lộ trình tạo ra:", plan);

      // hiển thị thông báo thành công
      setError(
        "🎯 Lộ trình của bạn đã sẵn sàng! Hãy bắt đầu tuần đầu tiên nào!"
      );
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/user/plan");
      }, 2000);
    } catch (err) {
      console.error("Lỗi khi tạo người dùng:", err);
      setSnackbarSeverity("error");
      setError("Đã có lỗi xảy ra khi tạo hồ sơ. Vui lòng thử lại!");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box className="bg-slate-100 min-h-screen py-10">
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h1"
          className="text-center font-bold text-gray-800 mb-8"
        >
          Hồ Sơ Sức Khỏe Của Bạn 🏃
        </Typography>

        {/* --- Card 1: Thông tin cơ bản --- */}
        <Card className="shadow-lg rounded-2xl mb-6">
          <CardContent className="p-6">
            <Typography
              variant="h6"
              className="font-semibold text-gray-700 pb-6"
            >
              Thông tin cơ bản
            </Typography>
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom className="font-medium text-gray-600">
                  Giới tính
                </Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={form.gender}
                  exclusive
                  onChange={handleGenderChange}
                  disabled={isDisabled}
                  fullWidth
                >
                  <ToggleButton value="Nam">
                    <Male className="mr-2" /> Nam
                  </ToggleButton>
                  <ToggleButton value="Nữ">
                    <Female className="mr-2" /> Nữ
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tuổi"
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  disabled={isDisabled}
                  helperText="Tuổi từ 15 đến 80"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Chiều cao (cm)"
                  name="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                  disabled={isDisabled}
                  helperText="Chiều cao từ 130 đến 220"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Height />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Cân nặng (kg)"
                  name="weight"
                  type="number"
                  value={form.weight}
                  onChange={handleChange}
                  disabled={isDisabled}
                  helperText="Cân nặng từ 30 đến 200"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MonitorWeight />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="BMI"
                  name="bmi"
                  value={form.bmi}
                  helperText="Tự động tính khi nhập chiều cao và cân nặng"
                  disabled={isDisabled}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Speed />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* --- Card 2: Mức mỡ và hoạt động --- */}
        <Card className="shadow-lg rounded-2xl mb-6">
          <CardContent className="p-6">
            <Typography
              variant="h6"
              className="font-semibold text-gray-700 pb-6"
            >
              Chỉ số & Mức độ
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Mức mỡ cơ thể (hiện tại)"
                  name="bodyFatPercentageBefore"
                  value={form.bodyFatPercentageBefore}
                  disabled={isDisabled}
                  onChange={handleChange}
                  helperText="Hãy chọn mức mỡ hiện tại của bạn"
                >
                  {bodyFatLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
                {form.bodyFatPercentageBefore && (
                  <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
                    {bodyFatDescriptions[form.bodyFatPercentageBefore]}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Mức độ hoạt động"
                  name="activityLevel"
                  value={form.activityLevel}
                  disabled={isDisabled}
                  onChange={handleChange}
                  helperText="Chọn mức độ vận động hàng ngày"
                >
                  {activityLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Mức độ thể chất"
                  name="fitnessLevel"
                  value={form.fitnessLevel}
                  disabled={isDisabled}
                  onChange={handleChange}
                  helperText="Chọn trình độ tập luyện hiện tại"
                >
                  {fitnessLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* --- Card 3: Mục tiêu --- */}
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <Typography
              variant="h6"
              className="font-semibold text-gray-700 pb-6"
            >
              Mục tiêu của bạn
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Mức mỡ cơ thể (mục tiêu)"
                  name="bodyFatPercentageAfter"
                  value={form.bodyFatPercentageAfter}
                  disabled={isDisabled}
                  onChange={handleChange}
                  helperText="Hãy chọn mức mỡ bạn muốn đạt được"
                >
                  {bodyFatLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
                {form.bodyFatPercentageAfter && (
                  <Typography variant="body2" sx={{ mt: 1, color: "red" }}>
                    {bodyFatDescriptions[form.bodyFatPercentageAfter]}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mục tiêu cân nặng (kg)"
                  name="weightGoal"
                  type="number"
                  value={form.weightGoal}
                  disabled={isDisabled}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FitnessCenter />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Thời gian (tuần)"
                  name="timeFrame"
                  value={form.timeFrame}
                  disabled={isDisabled}
                  onChange={handleChange}
                  helperText="Chọn thời gian hoàn thành mục tiêu"
                >
                  {timeFrames.map((t) => (
                    <MenuItem key={t.value} value={t.value}>
                      {t.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* --- Nút lưu --- */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading || isDisabled}
            className={`rounded-lg font-bold text-lg px-8 py-3 transition-all duration-300 ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isDisabled ? (
              "Đã tạo hồ sơ"
            ) : loading ? (
              <Box display="flex" alignItems="center" gap={2}>
                <CircularProgress size={24} color="inherit" />
                <Typography fontSize={16} fontWeight="bold">
                  Huấn luyện viên AI đang tạo lộ trình riêng cho bạn...
                </Typography>
              </Box>
            ) : (
              "Lưu thông tin"
            )}
          </Button>
        </Box>

        {/* Snackbar thông báo */}
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
          >
            {error}
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  );
}

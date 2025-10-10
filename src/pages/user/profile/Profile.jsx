import { useState } from "react";
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
  Slider,
  Container,
} from "@mui/material";
import {
  Person,
  MonitorWeight,
  Height,
  FitnessCenter,
  Event,
  Adjust,
  TrendingUp,
  Speed,
} from "@mui/icons-material";
import Male from "@mui/icons-material/Male";
import Female from "@mui/icons-material/Female";

// Dữ liệu cho các lựa chọn
const activityLevels = [
  { value: 0, label: "Ít vận động" },
  { value: 1, label: "Năng động" },
];

const fitnessLevels = [
  { value: 0, label: "Mới bắt đầu" },
  { value: 1, label: "Trung bình" },
  { value: 2, label: "Nâng cao" },
];

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
    timeFrame: "",
  });

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

  const handleSliderChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const submissionData = {
      ...form,
      activityLevel: activityLevels.find((l) => l.value === form.activityLevel)
        ?.label,
      fitnessLevel: fitnessLevels.find((l) => l.value === form.fitnessLevel)
        ?.label,
    };
    console.log("Dữ liệu gửi đi:", submissionData);
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
            {/* THAY ĐỔI Ở ĐÂY: Thêm alignItems="flex-end" */}
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
                  fullWidth
                >
                  <ToggleButton value="Nam">
                    <Male className="mr-2" />
                    Nam
                  </ToggleButton>
                  <ToggleButton value="Nữ">
                    <Female className="mr-2" />
                    Nữ
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
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    },
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
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Height />
                        </InputAdornment>
                      ),
                    },
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
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MonitorWeight />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="BMI"
                  name="bmi"
                  value={form.bmi}
                  slotProps={{
                    input: {
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Speed />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl mb-6">
          <CardContent className="p-6">
            <Typography
              variant="h6"
              className="font-semibold text-gray-700 mb-4"
            >
              Chỉ số & Mức độ
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Mức mỡ cơ thể (hiện tại)"
                  name="bodyFatPercentageBefore"
                  value={form.bodyFatPercentageBefore}
                  onChange={handleChange}
                  // SỬA LỖI: Chuyển từ InputProps sang slotProps
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Adjust />
                        </InputAdornment>
                      ),
                    },
                  }}
                >
                  <MenuItem value="Fitness (21-24%)">Fitness (21–24%)</MenuItem>
                  <MenuItem value="Average (25-31%)">Average (25–31%)</MenuItem>
                  <MenuItem value="Obese (>32%)">Obese (&gt;32%)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom className="font-medium text-gray-600">
                  Mức độ hoạt động
                </Typography>
                <Slider
                  value={form.activityLevel}
                  onChange={(e, val) =>
                    handleSliderChange("activityLevel", val)
                  }
                  step={1}
                  marks={activityLevels}
                  min={0}
                  max={activityLevels.length - 1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) =>
                    activityLevels.find((l) => l.value === value)?.label
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom className="font-medium text-gray-600">
                  Mức độ thể chất
                </Typography>
                <Slider
                  value={form.fitnessLevel}
                  onChange={(e, val) => handleSliderChange("fitnessLevel", val)}
                  step={1}
                  marks={fitnessLevels}
                  min={0}
                  max={fitnessLevels.length - 1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) =>
                    fitnessLevels.find((l) => l.value === value)?.label
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <Typography
              variant="h6"
              className="font-semibold text-gray-700 mb-4"
            >
              Mục tiêu của bạn
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Mục tiêu mỡ cơ thể"
                  name="bodyFatPercentageAfter"
                  value={form.bodyFatPercentageAfter}
                  onChange={handleChange}
                  // SỬA LỖI: Chuyển từ InputProps sang slotProps
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <TrendingUp />
                        </InputAdornment>
                      ),
                    },
                  }}
                >
                  <MenuItem value="Essential fat (10-13%)">
                    Essential fat (10–13%)
                  </MenuItem>
                  <MenuItem value="Athletes (14-20%)">
                    Athletes (14–20%)
                  </MenuItem>
                  <MenuItem value="Fitness (21-24%)">Fitness (21–24%)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mục tiêu cân nặng (kg)"
                  name="weightGoal"
                  type="number"
                  value={form.weightGoal}
                  onChange={handleChange}
                  // SỬA LỖI: Chuyển từ InputProps sang slotProps
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <FitnessCenter />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Thời gian (tuần)"
                  name="timeFrame"
                  type="number"
                  value={form.timeFrame}
                  onChange={handleChange}
                  // SỬA LỖI: Chuyển từ InputProps sang slotProps
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Event />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg px-8 py-3 transition-all duration-300"
          >
            Lưu thông tin
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

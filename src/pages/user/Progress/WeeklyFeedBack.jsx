import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Fade,
  Zoom,
} from "@mui/material";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PsychologyIcon from '@mui/icons-material/Psychology';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { updateProgress } from "../../../services/planService";

const WeeklyFeedback = ({ week, onSubmitted }) => {
  const [difficulty, setDifficulty] = useState("");
  const [weight, setWeight] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!difficulty || !weight) return;

    console.log(
      "difficulty:",
      difficulty,
      "weight:",
      weight,
      "week:",
      week?._id
    );

    const payload = {
      difficultRating: difficulty,
      endOfWeekWeight: parseFloat(weight),
      submittedAt: new Date().toISOString(),
    };

    try {
      await updateProgress(week._id, payload);
      onSubmitted?.();

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      setDifficulty("");
      setWeight("");
    } catch (error) {
      console.error("❌ Lỗi cập nhật tiến độ:", error);
    }
  };

  const getDifficultyIcon = (level) => {
    switch (level) {
      case "EASY": return <SentimentSatisfiedAltIcon />;
      case "MEDIUM": return <SentimentNeutralIcon />;
      case "HARD": return <SentimentVeryDissatisfiedIcon />;
      default: return <PsychologyIcon />;
    }
  };

  const getDifficultyLabel = (level) => {
    switch (level) {
      case "EASY": return "Dễ dàng";
      case "MEDIUM": return "Vừa sức";
      case "HARD": return "Khó khăn";
      default: return "";
    }
  };

  return (
    <Zoom in timeout={800}>
      <Card
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
          border: '2px solid #333',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          height: '100%',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h5" 
              fontWeight="600" 
              sx={{ 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1
              }}
            >
              <PsychologyIcon sx={{ color: '#dc2d2d' }} />
              Đánh Giá Tuần {week?.currentWeek || ""}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', lineHeight: 1.6 }}>
              Giúp AI hiểu cảm nhận và tiến độ của bạn để điều chỉnh kế hoạch tuần
              tới phù hợp hơn 💪
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Mức độ khó */}
              <Box>
                <Typography 
                  fontWeight="500" 
                  mb={2}
                  sx={{ color: 'white' }}
                >
                  Mức độ cảm nhận của bạn:
                </Typography>
                <ToggleButtonGroup
                  value={difficulty}
                  exclusive
                  onChange={(e, val) => val && setDifficulty(val)}
                  fullWidth
                  sx={{ 
                    gap: 1,
                    '& .MuiToggleButton-root': {
                      color: '#ccc',
                      borderColor: '#444',
                      borderRadius: 2,
                      py: 1.5,
                      '&.Mui-selected': {
                        bgcolor: '#dc2d2d',
                        color: 'white',
                        borderColor: '#dc2d2d',
                        '&:hover': {
                          bgcolor: '#c62828',
                        }
                      },
                      '&:hover': {
                        bgcolor: 'rgba(220, 45, 45, 0.1)',
                        borderColor: '#dc2d2d',
                      }
                    }
                  }}
                >
                  {["EASY", "MEDIUM", "HARD"].map((level) => (
                    <ToggleButton 
                      key={level} 
                      value={level}
                      sx={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                      }}
                    >
                      {getDifficultyIcon(level)}
                      <Typography variant="body2" fontWeight="500">
                        {getDifficultyLabel(level)}
                      </Typography>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Divider sx={{ borderColor: '#444' }} />

              {/* Nhập cân nặng */}
              <Box>
                <Typography 
                  fontWeight="500" 
                  mb={2}
                  sx={{ color: 'white' }}
                >
                  Cân nặng cuối tuần:
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <MonitorWeightIcon sx={{ color: '#dc2d2d', fontSize: 32 }} />
                  <TextField
                    label="Cân nặng hiện tại (kg)"
                    type="number"
                    fullWidth
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    inputProps={{ 
                      min: 0, 
                      step: "0.1",
                      style: { color: 'white' }
                    }}
                    sx={{
                      '& .MuiInputLabel-root': { color: '#ccc' },
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: '#444' },
                        '&:hover fieldset': { borderColor: '#dc2d2d' },
                        '&.Mui-focused fieldset': { borderColor: '#dc2d2d' },
                      }
                    }}
                  />
                </Box>
              </Box>

              {/* Nút submit */}
              <Fade in timeout={1000}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!difficulty || !weight}
                  startIcon={<FitnessCenterIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: "bold",
                    py: 1.5,
                    fontSize: '1rem',
                    bgcolor: '#dc2d2d',
                    '&:hover': {
                      bgcolor: '#c62828',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(220, 45, 45, 0.3)',
                    },
                    '&:disabled': {
                      bgcolor: '#666',
                      color: '#999',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  🚀 Gửi Đánh Giá Tuần
                </Button>
              </Fade>

              {/* Success Alert */}
              {success && (
                <Fade in timeout={500}>
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mt: 1,
                      borderRadius: 2,
                      bgcolor: 'rgba(76, 175, 80, 0.1)',
                      color: '#4caf50',
                      border: '1px solid #4caf50',
                      '& .MuiAlert-icon': {
                        color: '#4caf50',
                      }
                    }}
                  >
                    <Typography fontWeight="500">
                      🎉 Đã gửi đánh giá thành công!
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#81c784', mt: 0.5 }}>
                      AI đang phân tích và điều chỉnh kế hoạch tuần tới...
                    </Typography>
                  </Alert>
                </Fade>
              )}
            </Stack>
          </form>

          {/* Footer Note */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(220, 45, 45, 0.05)', borderRadius: 2 }}>
            <Typography variant="caption" sx={{ color: '#ccc', textAlign: 'center', display: 'block' }}>
              💡 Đánh giá chính xác giúp AI tạo lộ trình phù hợp nhất với thể trạng của bạn
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default WeeklyFeedback;
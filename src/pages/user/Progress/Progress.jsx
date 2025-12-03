import React, { useEffect, useState, useContext } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Snackbar, 
  Alert,
  Fade,
  Backdrop,
  Zoom
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../stores/UserContext";
import { getUserByAccountId } from "../../../services/userService";
import { getPlanByUserId } from "../../../services/planService";

import WeightChart from "./WeightChart";
import CalorieChart from "./CalorieChart";
import WeeklyFeedback from "./WeeklyFeedBack";

const Progress = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [plan, setPlan] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const navigate = useNavigate(); // ✅ Dùng để chuyển trang

  // Lấy thông tin user
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.sub) return;
      const data = await getUserByAccountId(user.sub);
      setUserData(data);
    };
    fetchUser();
  }, [user?.sub]);

  // Lấy plan theo user
  useEffect(() => {
    const fetchPlan = async () => {
      if (!userData?.data?._id) return;
      const response = await getPlanByUserId(userData.data._id);
      setPlan(response.data || []);
    };
    fetchPlan();
  }, [userData?.data?._id]);

  // Tìm tuần vừa hoàn thành nhưng chưa có đánh giá AI
  const weekToEvaluate = plan?.find(
    (w) =>
      w.status === "COMPLETED" &&
      (w.aiDecision === null || w.aiDecision === undefined)
  );

  // Hiệu ứng AI xử lý
  const simulateAIProcessing = () => {
    setShowAIModal(true);
    setAiProgress(0);

    const steps = [
      { progress: 25 },
      { progress: 50 },
      { progress: 75 },
      { progress: 95 },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAiProgress(step.progress);
      }, (index + 1) * 800);
    });

    setTimeout(() => {
      setShowAIModal(false);
      setOpenSnackbar(true);

      // ✅ Sau khi hiện thông báo, tự chuyển đến trang kế hoạch
      setTimeout(() => {
        navigate("/user/plan");
      }, 2000);
    }, 4000);
  };

  const handleFeedbackSubmitted = () => {
    simulateAIProcessing();
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      color: 'white',
      p: 3
    }}>
      {/* Header */}
      <Fade in timeout={1000}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #ffffff, #dc2d2d)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 1
            }}
          >
            📊 Bảng Điều Khiển Tiến Độ
          </Typography>
          <Typography variant="h6" sx={{ color: '#ccc' }}>
            Theo dõi hành trình tập luyện và sức khỏe của bạn
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Biểu đồ cân nặng */}
        <Grid size={{ xs: 12 }}>
          <WeightChart userData={userData} plan={plan} />
        </Grid>

        {/* Biểu đồ calo */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CalorieChart plan={plan} />
        </Grid>

        {/* Khối đánh giá tuần */}
        {weekToEvaluate ? (
          <Grid size={{ xs: 12, md: 6 }}>
            <WeeklyFeedback
              week={weekToEvaluate}
              onSubmitted={handleFeedbackSubmitted}
            />
          </Grid>
        ) : (
          <Grid size={{ xs: 12, md: 6 }}>
            <Zoom in timeout={800}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  p: 4,
                  background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                  borderRadius: 3,
                  border: '2px solid #333',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="600" 
                  mb={2}
                  sx={{ color: 'white' }}
                >
                  🕒 Hiện chưa có tuần nào cần đánh giá
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ color: '#ccc', textAlign: 'center' }}
                >
                  Hãy hoàn tất các buổi tập để mở đánh giá và tổng kết tuần tiếp theo.
                </Typography>
              </Box>
            </Zoom>
          </Grid>
        )}
      </Grid>

      {/* Modal AI Processing */}
      <Backdrop
        open={showAIModal}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
        }}
      >
        <Fade in={showAIModal}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: 4,
              p: 6,
              border: '2px solid #dc2d2d',
              boxShadow: '0 20px 60px rgba(220, 45, 45, 0.3)',
              maxWidth: 400,
              width: '90%',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                mb: 3,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -10,
                  left: -10,
                  right: -10,
                  bottom: -10,
                  background: 'linear-gradient(45deg, #dc2d2d, #ff6b6b)',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
                    '50%': { opacity: 0.8, transform: 'scale(1.1)' },
                  }
                }
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                  }
                }}
              >
                🤖
              </Typography>
            </Box>

            <Typography variant="h5" fontWeight="bold" sx={{ color: 'white', mb: 2 }}>
              AI Đang Phân Tích
            </Typography>

            <Typography variant="body1" sx={{ color: '#ccc', mb: 4 }}>
              {aiProgress < 25 && "🧠 AI đang phân tích kết quả tập luyện..."}
              {aiProgress >= 25 && aiProgress < 50 && "📊 Đánh giá chỉ số sức khỏe..."}
              {aiProgress >= 50 && aiProgress < 75 && "🎯 Tối ưu hóa lộ trình..."}
              {aiProgress >= 75 && "✨ Hoàn thiện kế hoạch tuần mới..."}
            </Typography>

            <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
              <Box
                sx={{
                  width: '100%',
                  height: 12,
                  backgroundColor: '#333',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: `${aiProgress}%`,
                    height: '100%',
                    background: 'linear-gradient(45deg, #dc2d2d, #ff6b6b)',
                    borderRadius: 6,
                    transition: 'width 0.8s ease',
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                }}
              >
                {aiProgress}%
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              {[0, 1, 2].map((dot) => (
                <Box
                  key={dot}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#dc2d2d',
                    animation: `bounce 1.4s infinite ${dot * 0.16}s`,
                    '@keyframes bounce': {
                      '0%, 80%, 100%': {
                        transform: 'scale(0.8)',
                        opacity: 0.5,
                      },
                      '40%': {
                        transform: 'scale(1)',
                        opacity: 1,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Fade>
      </Backdrop>

      {/* Snackbar thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            borderRadius: 3,
            bgcolor: '#4caf50',
            fontWeight: 'bold',
            '& .MuiAlert-icon': {
              fontSize: '1.5rem',
            }
          }}
        >
          🎉 Kế hoạch tuần sau đã được điều chỉnh! Hãy kiểm tra lộ trình mới.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Progress;

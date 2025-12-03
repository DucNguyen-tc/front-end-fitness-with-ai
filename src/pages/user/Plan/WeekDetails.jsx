import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const WeekDetails = ({ week, onBack, onSelectSession }) => {
  console.log(week);
  return (
    <Box sx={{ p: 2 }}>
      {/* Header với nút back và tiêu đề */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
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
          Tuần {week.currentWeek}
        </Typography>
      </Box>

      {/* Grid chứa các session card */}
      <Grid container spacing={3}>
        {week.sessions.map((session, index) => {
          // Nếu không phải buổi đầu tiên → kiểm tra buổi trước
          const previousSession = index > 0 ? week.sessions[index - 1] : null;
          const isLocked =
            previousSession && previousSession.status !== "COMPLETED";
          
          const isCompleted = session.status === "COMPLETED";

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4}} key={session.sessionNumber}>
              <Card
                onClick={() => {
                  if (!isLocked) onSelectSession(session);
                }}
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  background: isCompleted 
                    ? "linear-gradient(135deg, #1a2e1a 0%, #2a3e2a 100%)"
                    : isLocked
                    ? "linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%)"
                    : "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
                  border: isCompleted 
                    ? "2px solid #4caf50"
                    : isLocked
                    ? "2px solid #666"
                    : "2px solid #333",
                  transition: "all 0.3s ease-in-out",
                  cursor: isLocked ? "not-allowed" : "pointer",
                  opacity: isLocked ? 0.7 : 1,
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": !isLocked && {
                    transform: "translateY(-8px)",
                    boxShadow: isCompleted 
                      ? "0 12px 24px rgba(76, 175, 80, 0.3)"
                      : "0 12px 24px rgba(220, 45, 45, 0.3)",
                    border: isCompleted 
                      ? "2px solid #66bb6a"
                      : "2px solid #dc2d2d",
                  },
                }}
              >
                {/* Completed ribbon */}
                {isCompleted && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: -30,
                      background: "#4caf50",
                      color: "white",
                      padding: "4px 40px",
                      transform: "rotate(45deg)",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
                    }}
                  >
                    HOÀN THÀNH
                  </Box>
                )}

                <CardContent sx={{ p: 3, position: "relative" }}>
                  {/* Badge số session */}
                  

                  {/* Tiêu đề session */}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mb: 2,
                      pr: 6,
                      minHeight: "64px",
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    {isLocked
                      ? `Buổi ${session.sessionNumber} (Đang khóa)`
                      : isCompleted
                      ? `Buổi ${session.sessionNumber} (Đã hoàn thành)`
                      : `Buổi tập thứ ${session.sessionNumber}`}
                  </Typography>

                  {/* Tổng thời gian */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      mb: 2,
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "rgba(220, 45, 45, 0.1)",
                      border: "1px solid rgba(220, 45, 45, 0.3)",
                    }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ color: "#dc2d2d" }} />
                    <Typography variant="body2" fontWeight="medium" sx={{ color: "#ccc" }}>
                      Tổng thời gian:
                      <strong style={{ color: "white", marginLeft: 4 }}>
                        {Math.floor(session.estimatedDuration / 60)} phút{" "}
                        {session.estimatedDuration % 60} giây
                      </strong>
                    </Typography>
                  </Stack>

                  {/* Số bài tập */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      mb: 3,
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: isCompleted 
                        ? "rgba(76, 175, 80, 0.1)" 
                        : "rgba(255, 255, 255, 0.05)",
                      border: isCompleted 
                        ? "1px solid rgba(76, 175, 80, 0.3)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <FitnessCenterIcon fontSize="small" sx={{ color: isCompleted ? "#4caf50" : "#dc2d2d" }} />
                    <Typography variant="body2" fontWeight="medium" sx={{ color: "#ccc" }}>
                      Số bài tập: <strong style={{ color: "white", marginLeft: 4 }}>{session.exercises.length}</strong>
                    </Typography>
                  </Stack>

                  {/* Status indicator */}
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Chip
                      label={
                        isCompleted ? "ĐÃ HOÀN THÀNH" : 
                        isLocked ? "ĐANG KHÓA" : "SẴN SÀNG"
                      }
                      size="small"
                      sx={{
                        bgcolor: isCompleted ? "#4caf50" : isLocked ? "#666" : "#dc2d2d",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WeekDetails;
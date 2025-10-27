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
          Tuần {week.currentWeek}
        </Typography>
      </Box>

      {/* Grid chứa các session card */}
      <Grid container spacing={3}>
  {week.sessions.map((session, index) => {
    // Nếu không phải buổi đầu tiên → kiểm tra buổi trước
    const previousSession = index > 0 ? week.sessions[index - 1] : null;
    const isLocked =
      previousSession && previousSession.status !== "COMPLETE";

    return (
      <Grid item xs={12} sm={6} md={4} key={session.sessionNumber}>
        <Card
          onClick={() => {
            if (!isLocked) onSelectSession(session);
          }}
          sx={{
            height: "100%",
            width: "105%",
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background: isLocked
              ? "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            border: "1px solid #e0e0e0",
            transition: "all 0.3s ease-in-out",
            cursor: isLocked ? "not-allowed" : "pointer",
            opacity: isLocked ? 0.6 : 1,
            "&:hover": !isLocked && {
              transform: "translateY(-8px)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
              background:
                "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            },
          }}
        >
          <CardContent sx={{ p: 3, position: "relative" }}>
            {/* Badge số session */}
            <Chip
              label={isLocked ? "🔒" : "🏋️‍♂️"}
              color={isLocked ? "default" : "primary"}
              size="large"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                fontWeight: "bold",
              }}
            />

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
              }}
            >
              {isLocked
                ? `Buổi ${session.sessionNumber} (Chưa mở)`
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
                bgcolor: "rgba(25, 118, 210, 0.08)",
              }}
            >
              <AccessTimeIcon fontSize="small" color="primary" />
              <Typography variant="body2" fontWeight="medium">
                Tổng thời gian:
                <strong>
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
                bgcolor: "rgba(76, 175, 80, 0.08)",
              }}
            >
              <FitnessCenterIcon fontSize="small" color="success" />
              <Typography variant="body2" fontWeight="medium">
                Số bài tập: <strong>{session.exercises.length}</strong>
              </Typography>
            </Stack>
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

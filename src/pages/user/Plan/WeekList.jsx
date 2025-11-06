import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Chip,
  LinearProgress,
} from "@mui/material";
import { CalendarMonth, CheckCircle, DoneAll } from "@mui/icons-material";

const WeeksList = ({ weeks, onSelectWeek }) => {
  const allCompleted =
    weeks.length > 0 && weeks.every((w) => w.status === "COMPLETED");

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        color="white"
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <CalendarMonth fontSize="large" />
        Kế hoạch {weeks.length} tuần
      </Typography>

      <Grid container spacing={3}>
        {weeks.map((week) => {
          const isCompleted = week.status === "COMPLETED";

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={week.currentWeek}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  background: isCompleted
                    ? "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)"
                    : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => onSelectWeek(week)}
                  sx={{ height: "100%" }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
                      border: isCompleted
                        ? "2px solid #4caf50"
                        : "2px solid #333",
                      borderRadius: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#dc2d2d",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(220, 45, 45, 0.2)",
                      },
                    }}
                  >
                    <Chip
                      label={`Tuần ${week.currentWeek}`}
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        fontSize: "1rem",
                        px: 1,
                        bgcolor: isCompleted ? "#4caf50" : "#dc2d2d",
                        color: "white",
                        "&:hover": {
                          bgcolor: isCompleted ? "#45a049" : "#c62828",
                        },
                      }}
                    />

                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: isCompleted
                          ? "#4caf50"
                          : "linear-gradient(135deg, #dc2d2d 0%, #c62828 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                        color: "white",
                        border: isCompleted
                          ? "2px solid #4caf50"
                          : "2px solid #dc2d2d",
                        boxShadow: "0 4px 12px rgba(220, 45, 45, 0.3)",
                      }}
                    >
                      {isCompleted ? (
                        <DoneAll fontSize="large" />
                      ) : (
                        <CheckCircle fontSize="large" />
                      )}
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="white"
                      gutterBottom
                    >
                      Tuần {week.currentWeek}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: isCompleted ? "#4caf50" : "#ccc",
                        fontWeight: isCompleted ? "bold" : "normal",
                      }}
                    >
                      {week.description ||
                        (isCompleted
                          ? "Hoàn thành xuất sắc! 🎉"
                          : "Nhấn để xem chi tiết")}
                    </Typography>

                    {/* Progress indicator */}
                    {!isCompleted && (
                      <Box sx={{ mt: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={week.progress || 0}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "#333",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#dc2d2d",
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    )}

                    {/* Completed badge */}
                    {isCompleted && (
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          label="ĐÃ HOÀN THÀNH"
                          size="small"
                          sx={{
                            bgcolor: "#4caf50",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.7rem",
                          }}
                        />
                      </Box>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WeeksList;

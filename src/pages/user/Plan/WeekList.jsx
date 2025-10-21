import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActionArea,
  Box,
  Chip
} from "@mui/material";
import { CalendarMonth, CheckCircle } from "@mui/icons-material";


const WeeksList = ({ weeks, onSelectWeek, WeekPlan }) => {

  return (
    <Box sx={{ p: 2 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        fontWeight="bold" 
        color="primary"
        sx={{ 
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <CalendarMonth fontSize="large" />
        Kế hoạch {WeekPlan?.goals.timeFrame} tuần
      </Typography>
      
      <Grid container spacing={3}>
        {weeks.map((weekData) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={weekData.currentWeek}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                }
              }}
            >
              <CardActionArea 
                onClick={() => onSelectWeek(weekData)}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  {/* Badge số tuần */}
                  <Chip 
                    label={`Tuần ${weekData.currentWeek}`}
                    color="primary"
                    variant="filled"
                    sx={{ 
                      mb: 2,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      px: 1
                    }}
                  />
                  
                  {/* Icon trung tâm */}
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: 'white'
                    }}
                  >
                    <CheckCircle fontSize="large" />
                  </Box>
                  
                  {/* Tiêu đề */}
                  <Typography 
                    variant="h6" 
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                  >
                    Tuần {weekData.currentWeek}
                  </Typography>
                  
                  {/* Mô tả (có thể thêm sau) */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {weekData.description || 'Nhấn để xem chi tiết'}
                  </Typography>
                  
                  {/* Trạng thái tiến độ (tuỳ chọn) */}
                  {weekData.progress && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Tiến độ: {weekData.progress}%
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeeksList;
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  Typography, 
  Box, 
  IconButton, 
  Grid,
  Chip,
  Stack,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const WorkoutPlanDetailModal = ({ workout, onClose }) => {
  if (!workout) {
    return null;
  }

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      fullWidth 
      maxWidth="lg"
      slotProps={{
  paper: {
    sx: {
      borderRadius: 4,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      overflow: 'hidden',
    },
  },
}}

    >
      {/* Header với background gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          p: 4,
          pb: 6
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.3)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, sm: 6}}>
            <Chip 
              label="BÀI TẬP CHI TIẾT" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                fontWeight: 'bold',
                mb: 2 
              }} 
            />
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{ 
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                mb: 2
              }}
            >
              {workout.name}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {workout.category || 'Full Body Workout'}
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ width: '100%', borderRadius: 3, overflow: 'hidden', mb: 3, bgcolor: '#1A5F7A' }}>
              {workout.mediaURL ? (
                <video 
                  src={workout.mediaURL} 
                  loop 
                  autoPlay 
                  muted 
                  playsInline 
                  style={{ width: "100%", display: 'block' }} 
                />
              ) : (
                 <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Typography variant="h6">Không có video</Typography>
                 </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <DialogContent sx={{ p: 0, mt: 3 }}>
        {/* Stats Cards - Thêm Độ khó vào hàng */}
        <Box sx={{ px: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
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
                    <AccessTimeIcon fontSize="large" />
                  </Box>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {workout.workTime}s
                  </Typography>
                  <Typography color="text.secondary" fontWeight="medium">
                    Thời gian tập
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: 'white'
                    }}
                  >
                    <SelfImprovementIcon fontSize="large" />
                  </Box>
                  <Typography variant="h4" fontWeight="bold" color="secondary">
                    {workout.restTime}s
                  </Typography>
                  <Typography color="text.secondary" fontWeight="medium">
                    Thời gian nghỉ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: 'white'
                    }}
                  >
                    <LocalFireDepartmentIcon fontSize="large" />
                  </Box>
                  <Typography variant="h4" fontWeight="bold" color="error">
                    {workout.caloriesBurnedPerMinute}
                  </Typography>
                  <Typography color="text.secondary" fontWeight="medium">
                    Calories đốt cháy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'warning.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: 'white'
                    }}
                  >
                    <TrendingUpIcon fontSize="large" />
                  </Box>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {workout.difficulty}
                  </Typography>
                  <Typography color="text.secondary" fontWeight="medium">
                    Độ khó
                  </Typography>
                  <LinearProgress 
                    value={workout.difficulty ? workout.difficulty * 20 : 60} 
                    variant="determinate" 
                    sx={{ 
                      mt: 1,
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: 'grey.300',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'warning.main'
                      }
                    }} 
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Content Sections - Hướng dẫn và Lưu ý ngang hàng */}
        <Box sx={{ px: 4, pb: 4 }}>
          <Grid container spacing={4}>
            {/* Hướng dẫn thực hiện */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <FitnessCenterIcon sx={{ mr: 2, color: 'primary.main' }} />
                    Hướng dẫn thực hiện
                  </Typography>
                  
                  <Stack spacing={3}>
                    {workout.instructions.map((step, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          bgcolor: 'grey.50',
                          border: '1px solid',
                          borderColor: 'grey.200',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'primary.50',
                            borderColor: 'primary.100',
                            transform: 'translateX(4px)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              mr: 2,
                              flexShrink: 0,
                              mt: 0.5
                            }}
                          >
                            {index + 1}
                          </Box>
                          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                            {step}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Lưu ý quan trọng */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, border: '2px solid', borderColor: 'warning.light', height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <WarningIcon sx={{ mr: 2, color: 'warning.main' }} />
                    Lưu ý quan trọng
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                    Hãy tuân thủ các nguyên tắc sau:
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box sx={{ color: 'warning.main', mr: 2, mt: 0.5 }}>•</Box>
                      <Typography variant="body1">
                        <strong>Giữ thẳng lưng</strong> trong suốt quá trình tập
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box sx={{ color: 'warning.main', mr: 2, mt: 0.5 }}>•</Box>
                      <Typography variant="body1">
                        <strong>Hít thở đều và sâu</strong> - hít vào khi thả lỏng, thở ra khi gắng sức
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box sx={{ color: 'warning.main', mr: 2, mt: 0.5 }}>•</Box>
                      <Typography variant="body1">
                        <strong>Dừng lại ngay</strong> nếu cảm thấy đau hoặc khó chịu
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box sx={{ color: 'warning.main', mr: 2, mt: 0.5 }}>•</Box>
                      <Typography variant="body1">
                        <strong>Uống đủ nước</strong> trong khi tập để tránh mất nước
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box sx={{ color: 'warning.main', mr: 2, mt: 0.5 }}>•</Box>
                      <Typography variant="body1">
                        <strong>Khởi động kỹ</strong> trước khi tập và giãn cơ sau khi tập
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutPlanDetailModal;
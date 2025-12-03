// src/pages/admin/Workouts/WorkoutDetailsModal.jsx

import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Typography, Box, Grid, Chip, Avatar
} from '@mui/material';

function WorkoutDetailsModal({ open, onClose, workout }) {
  if (!workout) return null;

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'BEGINNER') return 'success';
    if (difficulty === 'INTERMEDIATE') return 'warning';
    if (difficulty === 'ADVANCED') return 'error';
    return 'default';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{workout.name}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Cột trái: Ảnh, Video */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Hình ảnh</Typography>
            <Avatar
              variant="rounded"
              src={workout.imageURL}
              alt={workout.name}
              sx={{ width: '100%', height: 'auto', maxHeight: 300, mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>Video</Typography>
            <Box sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
              <video
                src={workout.mediaURL}
                controls
                style={{ width: "100%", display: 'block' }}
              />
            </Box>
          </Grid>
          {/* Cột phải: Thông tin */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Thông tin</Typography>
            <Box mb={2}>
              <Typography><strong>Nhóm cơ:</strong> {workout.muscleGroups?.join(', ') || 'N/A'}</Typography>
            </Box>
            <Box mb={2}>
              <Typography><strong>Calo/phút:</strong> {workout.caloriesBurnedPerMinute}</Typography>
            </Box>
            <Box mb={2}>
              <Typography component="div"><strong>Độ khó:</strong>
                <Chip
                  label={workout.difficulty}
                  color={getDifficultyColor(workout.difficulty)}
                  size="small"
                  sx={{ fontWeight: 'bold', ml: 1 }}
                />
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Hướng dẫn</Typography>
            <Box
              sx={{
                bgcolor: 'grey.100',
                borderRadius: 2,
                p: 2,
                maxHeight: 300,
                overflowY: 'auto'
              }}
            >
              {(workout.instructions || []).map((step, i) => (
                <Typography key={i} variant="body1" sx={{ mb: 1 }}>
                  <strong>Bước {i + 1}:</strong> {step}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default WorkoutDetailsModal;
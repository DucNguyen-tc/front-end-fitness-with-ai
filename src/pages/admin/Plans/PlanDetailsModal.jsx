// src/pages/admin/Plans/PlanDetailsModal.jsx

import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Typography, Box, Grid, Chip, CircularProgress, Accordion,
  AccordionSummary, AccordionDetails, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import apiClient from '../../../services/apiClient';

function PlanDetailsModal({ open, onClose, plan }) {
  const [workoutMap, setWorkoutMap] = useState(new Map());
  const [loading, setLoading] = useState(false);

  // 1. Fetch tất cả workout để tạo map tra cứu tên
  useEffect(() => {
    if (open) {
      const fetchWorkoutNames = async () => {
        setLoading(true);
        try {
          const response = await apiClient.get('/workout');
          const workouts = response.data.data || [];
          // Tạo Map: <workoutId, workoutName>
          const newMap = new Map(workouts.map(w => [w._id, w.name]));
          setWorkoutMap(newMap);
        } catch (err) {
          console.error("Lỗi fetch workout map:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchWorkoutNames();
    }
  }, [open]); // Chạy mỗi khi modal mở

  if (!plan) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        Chi tiết Kế hoạch (Tuần {plan.currentWeek})
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Đang tải tên bài tập...</Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>Các buổi tập (Sessions)</Typography>
            {plan.sessions.length === 0 ? (
              <Typography>Không có buổi tập nào trong kế hoạch này.</Typography>
            ) : (
              // Hiển thị mỗi session là 1 Accordion (có thể bung ra)
              plan.sessions.map((session, index) => (
                <Accordion key={session._id || index} defaultExpanded={index === 0}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold', mr: 2 }}>
                      Buổi {session.sessionNumber}
                    </Typography>
                    <Chip
                      icon={session.status === 'COMPLETED' ? <CheckCircleIcon /> : <PendingIcon />}
                      label={session.status}
                      color={session.status === 'COMPLETED' ? 'success' : 'default'}
                      size="small"
                      variant="outlined"
                    />
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: 'grey.50' }}>
                    {/* Hiển thị chi tiết các bài tập trong session */}
                    <Grid container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={6}><Typography variant="body2" color="text.secondary">Tên bài tập</Typography></Grid>
                        <Grid item xs={2} align="center"><Typography variant="body2" color="text.secondary">Thứ tự</Typography></Grid>
                        <Grid item xs={2} align="center"><Typography variant="body2" color="text.secondary">Tập (s)</Typography></Grid>
                        <Grid item xs={2} align="center"><Typography variant="body2" color="text.secondary">Nghỉ (s)</Typography></Grid>
                    </Grid>

                    {session.exercises.map((ex, exIndex) => (
                      <Paper key={ex._id || exIndex} sx={{ p: 1.5, mb: 1.5, background: 'white' }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={6}>
                            <Typography sx={{ fontWeight: 500 }}>
                              {/* Tra cứu tên từ workoutMap */}
                              {workoutMap.get(ex.workoutId) || `(ID: ${ex.workoutId.slice(0,5)}...)`}
                            </Typography>
                          </Grid>
                          <Grid item xs={2} align="center">{ex.order}</Grid>
                          <Grid item xs={2} align="center">{ex.workTime}</Grid>
                          <Grid item xs={2} align="center">{ex.restTime}</Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PlanDetailsModal;
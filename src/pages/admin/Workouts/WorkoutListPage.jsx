import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Tooltip,
  Button,
  Chip,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import apiClient from '../../../services/apiClient';

// Import CẢ 3 modal
import WorkoutCreateModal from './WorkoutCreateModal';
import WorkoutEditModal from './WorkoutEditModal';
import WorkoutDetailsModal from './WorkoutDetailsModal';
// Import Dialog Xóa (đảm bảo bạn đã tạo file này ở 'src/components/common/ConfirmDeleteDialog.jsx')
import ConfirmDeleteDialog from '../../../components/common/ConfirmDeleteDialog';

function WorkoutListPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- State cho các modal ---
  const [selectedWorkout, setSelectedWorkout] = useState(null); // Dùng cho cả Xem và Sửa
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // --- State cho Xóa ---
  const [deletingWorkoutId, setDeletingWorkoutId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // --- State cho Snackbar thông báo ---
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // --- Fetch dữ liệu ban đầu ---
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/workout');
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setWorkouts(response.data.data);
      } else {
        setError('Dữ liệu bài tập trả về không đúng định dạng.');
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bài tập:", err);
      setError("Không thể tải danh sách bài tập.");
    } finally {
      setLoading(false);
    }
  };

  // --- Xử lý Mở/Đóng Modal ---
  const handleOpenCreate = () => setIsCreateModalOpen(true);
  const handleCloseCreate = () => setIsCreateModalOpen(false);

  const handleOpenView = (workout) => {
    setSelectedWorkout(workout); // <-- Cần dòng này
    setIsViewModalOpen(true);    // <-- Cần dòng này
  };
  const handleCloseView = () => {
    setIsViewModalOpen(false);
    setSelectedWorkout(null); // Reset khi đóng
  };

  const handleOpenEdit = (workout) => {
    setSelectedWorkout(workout); // <-- Cần dòng này
    setIsEditModalOpen(true);    // <-- Cần dòng này
  };
  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedWorkout(null); // Reset khi đóng
  };

  // --- Xử lý Lưu (Tạo/Sửa) ---
  const handleSave = async (formData, workoutId) => {
    const isEditMode = Boolean(workoutId);
    const apiCall = isEditMode
      ? apiClient.put(`/workout/${workoutId}`, formData)
      : apiClient.post('/workout', formData);

    try {
      const response = await apiCall;
      const savedWorkout = response.data.data;

      if (isEditMode) {
        setWorkouts(prev =>
          prev.map(w => (w._id === workoutId ? savedWorkout : w))
        );
        handleCloseEdit();
      } else {
        setWorkouts(prev => [savedWorkout, ...prev]);
        handleCloseCreate();
      }

      setSnackbar({ open: true, message: `Lưu bài tập thành công!`, severity: 'success' });
      return Promise.resolve();

    } catch (err) {
      console.error("Lỗi khi lưu bài tập:", err);
      setSnackbar({ open: true, message: err.response?.data?.message || 'Lưu thất bại.', severity: 'error' });
      throw err;
    }
  };

  // --- Xử lý Xóa ---
  const handleOpenDelete = (workoutId) => {
    setDeletingWorkoutId(workoutId);
    setIsConfirmOpen(true);
  };
  const handleCloseDelete = () => {
    setDeletingWorkoutId(null);
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await apiClient.delete(`/workout/${deletingWorkoutId}`);
      setWorkouts(prev => prev.filter(w => w._id !== deletingWorkoutId));
      setSnackbar({ open: true, message: 'Xóa bài tập thành công!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Xóa thất bại. Vui lòng thử lại.', severity: 'error' });
    } finally {
      handleCloseDelete();
    }
  };

  // --- Xử lý Snackbar ---
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // --- Hàm tiện ích ---
  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'BEGINNER') return 'success';
    if (difficulty === 'INTERMEDIATE') return 'warning';
    if (difficulty === 'ADVANCED') return 'error';
    return 'default';
  };

  // === RENDER GIAO DIỆN ===
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
      {/* Tiêu đề và Nút "Tạo mới" */}
      <Box sx={{
        p: 3,
        borderBottom: '1px solid #e0e0e0',
        bgcolor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h5" fontWeight="bold" component="div">
          Quản lý Bài tập
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate} // <-- Sửa ở đây
        >
          Thêm Bài tập
        </Button>
      </Box>

      {/* Loading... */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, p: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Đang tải danh sách bài tập...</Typography>
        </Box>
      )}

      {/* Error... */}
      {!loading && error && (
        <Box sx={{ p: 3, textAlign: 'center', color: 'red' }}>
          <Typography>{error}</Typography>
        </Box>
      )}

      {/* Bảng dữ liệu */}
      {!loading && !error && (
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="workout table">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 'bold', bgcolor: '#eeeeee' } }}>
                <TableCell sx={{ width: '10%' }}>Hình ảnh</TableCell>
                <TableCell sx={{ width: '30%' }}>Tên Bài tập</TableCell>
                <TableCell sx={{ width: '20%' }}>Nhóm cơ</TableCell>
                <TableCell sx={{ width: '15%' }} align="center">Độ khó</TableCell>
                <TableCell sx={{ width: '10%' }} align="center">Calo/phút</TableCell>
                <TableCell sx={{ width: '15%' }} align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workouts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Chưa có bài tập nào.</TableCell>
                </TableRow>
              ) : (
                workouts.map((workout) => (
                  <TableRow hover key={workout._id}>
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={workout.imageURL}
                        alt={workout.name}
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {workout.name}
                    </TableCell>
                    <TableCell>
                      {workout.muscleGroups?.join(', ') || 'N/A'}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={workout.difficulty}
                        color={getDifficultyColor(workout.difficulty)}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {workout.caloriesBurnedPerMinute}
                    </TableCell>
                    <TableCell align="center">
                      {/* Sửa onClick ở đây */}
                      <Tooltip title="Xem">
                        <IconButton size="small" onClick={() => handleOpenView(workout)}>
                          <VisibilityIcon fontSize="small" color="info" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Sửa">
                        <IconButton size="small" onClick={() => handleOpenEdit(workout)}>
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton size="small" onClick={() => handleOpenDelete(workout._id)}>
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Render tất cả Modal và Dialog */}

      {/* Modal Tạo mới */}
      <WorkoutCreateModal
        open={isCreateModalOpen}
        onClose={handleCloseCreate}
        onSave={handleSave}
      />

      {/* Modal Sửa (Chỉ render khi có dữ liệu) */}
      {selectedWorkout && (
        <WorkoutEditModal
          open={isEditModalOpen}
          onClose={handleCloseEdit}
          onSave={handleSave}
          editingWorkout={selectedWorkout}
        />
      )}

      {/* Modal Xem (Chỉ render khi có dữ liệu) */}
      {selectedWorkout && (
        <WorkoutDetailsModal
          open={isViewModalOpen}
          onClose={handleCloseView}
          workout={selectedWorkout}
        />
      )}

      {/* Dialog Xóa */}
      <ConfirmDeleteDialog
        open={isConfirmOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa Bài tập"
        message="Bạn có chắc chắn muốn xóa bài tập này không?"
      />

      {/* Snackbar Thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', boxShadow: 3 }} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Paper>
  );
}

export default WorkoutListPage;
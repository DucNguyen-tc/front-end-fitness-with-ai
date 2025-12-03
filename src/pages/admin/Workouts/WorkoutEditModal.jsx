// src/pages/admin/Workouts/WorkoutEditModal.jsx
// DÁN TOÀN BỘ CODE NÀY VÀO FILE

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Chip,
  Alert,
} from '@mui/material';
import apiClient from '../../../services/apiClient';

const difficultyLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

// 1. ĐẢM BẢO CÓ "editingWorkout" TRONG DANH SÁCH PROP
function WorkoutEditModal({ open, onClose, onSave, editingWorkout }) {
  const [formData, setFormData] = useState({}); // Khởi tạo rỗng
  const [muscleGroupList, setMuscleGroupList] = useState([]);
  const [loadingMuscleGroups, setLoadingMuscleGroups] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // 2. Fetch nhóm cơ
  useEffect(() => {
    if (open) {
      const fetchMuscleGroups = async () => {
        setLoadingMuscleGroups(true);
        try {
          const response = await apiClient.get('/muscle-group');
          setMuscleGroupList(response.data.data || []);
        } catch (err) {
          console.error("Lỗi fetch nhóm cơ:", err);
          setError("Không thể tải danh sách nhóm cơ.");
        } finally {
          setLoadingMuscleGroups(false);
        }
      };
      fetchMuscleGroups();
    }
  }, [open]);

  // 3. Nạp dữ liệu cũ vào form
  useEffect(() => {
    if (open && editingWorkout) { // Dòng này giờ sẽ hoạt động
      setError(null);

      // Chuyển đổi mảng TÊN nhóm cơ (từ 'editingWorkout.muscleGroups') sang mảng ID
      const oldGroupIds = (editingWorkout.muscleGroups || [])
        .map(name => {
          // Tìm nhóm cơ trong danh sách đã fetch
          const found = muscleGroupList.find(g => g.name === name); // Giả sử 'name' là mã (CHEST)
          return found ? found._id : null; // Lấy _id
        })
        .filter(Boolean); // Lọc bỏ những cái không tìm thấy (null)

      setFormData({
        name: editingWorkout.name || '',
        muscleGroups: oldGroupIds, // <-- Sử dụng mảng ID
        difficulty: editingWorkout.difficulty || 'BEGINNER',
        instructions: (editingWorkout.instructions || []).join('\n'),
        imageURL: editingWorkout.imageURL || '',
        mediaURL: editingWorkout.mediaURL || '',
        caloriesBurnedPerMinute: editingWorkout.caloriesBurnedPerMinute || 0,
      });
    }
  }, [open, editingWorkout, muscleGroupList]); // Thêm 'muscleGroupList' vào dependency

  // 4. Hàm xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 5. Hàm xử lý khi nhấn nút Lưu
  const handleSubmit = async () => {
    setError(null);
    // ... (Validation)
    if (!formData.name || !formData.imageURL || !formData.mediaURL || formData.muscleGroups.length === 0 || !formData.instructions) {
      setError('Vui lòng điền đầy đủ tất cả các trường bắt buộc.');
      return;
    }
    if (formData.caloriesBurnedPerMinute <= 0) {
      setError('Lượng calo tiêu thụ phải lớn hơn 0.');
      return;
    }

    // Dữ liệu đã ở đúng định dạng (mảng ID)
    const payload = {
      ...formData,
      instructions: formData.instructions.split('\n').filter(line => line.trim() !== ''),
      caloriesBurnedPerMinute: Number(formData.caloriesBurnedPerMinute),
    };

    setIsSaving(true);
    try {
      // Dòng này cũng dùng 'editingWorkout'
      await onSave(payload, editingWorkout._id);
      onClose(); // Đóng modal
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật bài tập.');
    } finally {
      setIsSaving(false);
    }
  };

  // Thêm dòng này để tránh lỗi render khi 'editingWorkout' chưa có
  if (!editingWorkout) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Chỉnh sửa Bài tập</DialogTitle>
      <DialogContent sx={{ paddingTop: '24px !important' }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={2.5}>
          {/* Tên Bài tập */}
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              required
              label="Tên Bài tập"
              fullWidth
              name="name"
              value={formData.name || ''} // Dùng formData
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>

          {/* Độ khó */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Độ khó</InputLabel>
              <Select
                name="difficulty"
                label="Độ khó"
                value={formData.difficulty || 'BEGINNER'} // Dùng formData
                onChange={handleChange}
                disabled={isSaving}
              >
                {difficultyLevels.map((level) => (<MenuItem key={level} value={level}>{level}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>

          {/* Nhóm cơ */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required disabled={loadingMuscleGroups}>
              <InputLabel>Nhóm cơ</InputLabel>
              <Select
                multiple
                name="muscleGroups"
                label="Nhóm cơ"
                value={formData.muscleGroups || []} // Dùng formData
                onChange={handleChange}
                input={<OutlinedInput label="Nhóm cơ" />}
                renderValue={(selectedIds) => ( // selectedIds là mảng các ID
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedIds.map((id) => {
                      const muscle = muscleGroupList.find(m => m._id === id);
                      return <Chip key={id} label={muscle?.displayName || id} size="small" />;
                    })}
                  </Box>
                )}
                disabled={isSaving}
              >
                {loadingMuscleGroups ? <MenuItem disabled>...</MenuItem> :
                  muscleGroupList.map((muscle) => (
                    <MenuItem key={muscle._id} value={muscle._id}>
                      {muscle.displayName}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Calo */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Calo tiêu thụ / phút"
              type="number"
              fullWidth
              name="caloriesBurnedPerMinute"
              value={formData.caloriesBurnedPerMinute || 0} // Dùng formData
              onChange={handleChange}
              disabled={isSaving}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>

          {/* ImageURL */}
          <Grid item xs={12}>
            <TextField
              required
              label="Link Hình ảnh (imageURL)"
              fullWidth
              name="imageURL"
              value={formData.imageURL || ''} // Dùng formData
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>

          {/* MediaURL */}
          <Grid item xs={12}>
            <TextField
              required
              label="Link Video (mediaURL)"
              fullWidth
              name="mediaURL"
              value={formData.mediaURL || ''} // Dùng formData
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>

          {/* Hướng dẫn */}
          <Grid item xs={12}>
            <TextField
              required
              label="Hướng dẫn (mỗi bước 1 dòng)"
              fullWidth
              name="instructions"
              multiline
              rows={4}
              value={formData.instructions || ''} // Dùng formData
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} disabled={isSaving}>Hủy</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Lưu thay đổi'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WorkoutEditModal;
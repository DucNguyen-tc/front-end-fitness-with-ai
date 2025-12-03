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
  Chip, // Để hiển thị các nhóm cơ đã chọn
  Alert, // Để hiển thị lỗi validation
} from '@mui/material';
import apiClient from '../../../services/apiClient';

// Lấy danh sách độ khó từ DTO/Enum của backend
const difficultyLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

// DTO yêu cầu: name, muscleGroups (string[]), difficulty, instructions (string[]), imageURL, mediaURL, caloriesBurnedPerMinute
const initialState = {
  name: '',
  muscleGroups: [], // Sẽ là mảng các ID
  difficulty: 'BEGINNER',
  instructions: '', // Dùng 1 textarea, mỗi dòng là 1 instruction
  imageURL: '',
  mediaURL: '',
  caloriesBurnedPerMinute: 0,
};

function WorkoutCreateModal({ open, onClose, onSave }) {
  const [formData, setFormData] = useState(initialState);
  const [muscleGroupList, setMuscleGroupList] = useState([]); // Danh sách nhóm cơ để chọn
  const [loadingMuscleGroups, setLoadingMuscleGroups] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null); // Lỗi validation/API

  // 1. Fetch danh sách nhóm cơ khi modal được mở
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
  }, [open]); // Chạy lại mỗi khi modal được mở

  // 2. Hàm xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Hàm xử lý khi nhấn nút Lưu
  const handleSubmit = async () => {
    setError(null); // Reset lỗi

    // 3.1. Validation đơn giản
    if (!formData.name || !formData.imageURL || !formData.mediaURL || formData.muscleGroups.length === 0 || !formData.instructions) {
      setError('Vui lòng điền đầy đủ tất cả các trường bắt buộc.');
      return;
    }
    if (formData.caloriesBurnedPerMinute <= 0) {
      setError('Lượng calo tiêu thụ phải lớn hơn 0.');
      return;
    }

    // 3.2. Chuẩn bị dữ liệu để gửi đi
    const payload = {
      ...formData,
      // Chuyển đổi chuỗi instructions (mỗi dòng 1 câu) thành mảng
      instructions: formData.instructions.split('\n').filter(line => line.trim() !== ''),
      // Đảm bảo calories là số
      caloriesBurnedPerMinute: Number(formData.caloriesBurnedPerMinute),
    };

    setIsSaving(true);
    try {
      // 3.3. Gọi hàm onSave (từ ListPage)
      await onSave(payload);
      handleClose(); // Đóng và reset form sau khi lưu thành công
    } catch (err) {
      // Lỗi API sẽ được onSave (trong ListPage) bắt và hiển thị snackbar
      // Nhưng ta vẫn set lỗi ở đây để modal hiển thị
      setError(err.response?.data?.message || 'Lỗi khi tạo bài tập.');
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Hàm đóng và reset form
  const handleClose = () => {
    onClose(); // Gọi hàm onClose từ prop
    setTimeout(() => { // Thêm delay nhỏ để tránh giật UI
      setFormData(initialState);
      setError(null);
    }, 200);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>
        Tạo Bài tập mới
      </DialogTitle>
      <DialogContent sx={{ paddingTop: '20px !important' }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Bọc các trường trong Grid container */}
        <Grid container spacing={3}>

          {/* Hàng 1, Cột 1: Tên Bài tập */}
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              required
              // margin="dense" // <-- ĐÃ XÓA
              label="Tên Bài tập"
              fullWidth
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>

          {/* Hàng 1, Cột 2: Độ khó */}
          <Grid item xs={12} sm={6}>
            {/* Xóa margin="dense" */}
            <FormControl fullWidth required>
              <InputLabel>Độ khó</InputLabel>
              <Select
                name="difficulty"
                label="Độ khó" // <-- ĐÃ THÊM
                value={formData.difficulty}
                onChange={handleChange}
                disabled={isSaving}
              >
                {difficultyLevels.map((level) => (
                  <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Hàng 2, Cột 1: Nhóm cơ */}
          <Grid item xs={12} sm={6}>
            {/* Xóa margin="dense" */}
            <FormControl fullWidth required disabled={loadingMuscleGroups}>
              <InputLabel>Nhóm cơ</InputLabel>
              <Select
                multiple
                name="muscleGroups"
                label="Nhóm cơ" // <-- ĐÃ THÊM
                value={formData.muscleGroups}
                onChange={handleChange}
                input={<OutlinedInput label="Nhóm cơ" />} // <-- ĐÃ THÊM
                renderValue={(selectedIds) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedIds.map((id) => {
                      const muscle = muscleGroupList.find(m => m._id === id);
                      return <Chip key={id} label={muscle?.displayName || id} size="small" />;
                    })}
                  </Box>
                )}
                disabled={isSaving}
              >
                {loadingMuscleGroups ? (
                  <MenuItem disabled>Đang tải nhóm cơ...</MenuItem>
                ) : (
                  muscleGroupList.map((muscle) => (
                    <MenuItem key={muscle._id} value={muscle._id}>
                      {muscle.displayName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Hàng 2, Cột 2: Calo */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              // margin="dense" // <-- ĐÃ XÓA
              label="Calo tiêu thụ / phút"
              type="number"
              fullWidth
              variant="outlined"
              name="caloriesBurnedPerMinute"
              value={formData.caloriesBurnedPerMinute}
              onChange={handleChange}
              disabled={isSaving}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>

          {/* Hàng 3: ImageURL */}
          <Grid item xs={12}>
            <TextField
              required
              // margin="dense" // <-- ĐÃ XÓA
              label="Link Hình ảnh (imageURL)"
              fullWidth
              variant="outlined"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>

          {/* Hàng 4: MediaURL */}
          <Grid item xs={12}>
            <TextField
              required
              // margin="dense" // <-- ĐÃ XÓA
              label="Link Video (mediaURL)"
              fullWidth
              variant="outlined"
              name="mediaURL"
              value={formData.mediaURL}
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>

          {/* Hàng 5: Hướng dẫn */}
          <Grid item xs={12}>
            <TextField
              required
              // margin="dense" // <-- ĐÃ XÓA
              label="Hướng dẫn (mỗi bước 1 dòng)"
              fullWidth
              variant="outlined"
              name="instructions"
              multiline
              rows={4}
              value={formData.instructions}
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>

        </Grid>

      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid #e0e0e0', padding: '16px 24px' }}>
        <Button onClick={handleClose} disabled={isSaving}>Hủy</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Tạo mới'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WorkoutCreateModal;
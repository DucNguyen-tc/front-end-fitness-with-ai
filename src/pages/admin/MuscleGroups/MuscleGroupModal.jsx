// src/pages/admin/MuscleGroups/MuscleGroupModal.jsx

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
  Alert,
} from '@mui/material';

// DTO của backend yêu cầu: name, displayName, description, imageURL
//
const initialState = {
  name: '', // Mã (VD: CHEST)
  displayName: '', // Tên (VD: Ngực)
  description: '',
  imageURL: '',
};

function MuscleGroupModal({ open, onClose, onSave, editingGroup }) {
  const [formData, setFormData] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Kiểm tra xem đây là modal Tạo mới hay Sửa
  const isEditMode = Boolean(editingGroup);

  // Cập nhật form khi 'editingGroup' thay đổi
  useEffect(() => {
    if (open) {
      if (isEditMode) {
        setFormData(editingGroup); // Nạp dữ liệu cũ vào form
      } else {
        setFormData(initialState); // Reset form về rỗng
      }
      setError(null); // Reset lỗi
    }
  }, [open, editingGroup, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!formData.name || !formData.displayName || !formData.description || !formData.imageURL) {
      setError('Vui lòng điền đầy đủ các trường.');
      return;
    }

    setIsSaving(true);
    try {
      // Gọi hàm onSave (từ ListPage) và truyền dữ liệu
      await onSave(formData, editingGroup?._id);
      onClose(); // Đóng modal nếu thành công
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi lưu nhóm cơ.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {isEditMode ? 'Chỉnh sửa Nhóm cơ' : 'Tạo Nhóm cơ mới'}
      </DialogTitle>
      <DialogContent sx={{ paddingTop: '24px !important' }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              required
              label="Tên hiển thị (VD: Ngực)"
              fullWidth
              variant="outlined"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Tên Mã (VD: CHEST)"
              fullWidth
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Mô tả"
              fullWidth
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Link Hình ảnh (imageURL)"
              fullWidth
              variant="outlined"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} disabled={isSaving}>Hủy</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} color="inherit" /> : (isEditMode ? 'Lưu thay đổi' : 'Tạo mới')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MuscleGroupModal;
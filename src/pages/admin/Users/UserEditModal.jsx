import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel, // Dùng cho Checkbox/Switch
  Switch,           // Ví dụ dùng Switch cho isActive
  Grid,
  CircularProgress,
  Box
} from '@mui/material';

function UserEditModal({ open, onClose, user, onSave }) {
  const [formData, setFormData] = useState({}); // State lưu dữ liệu form
  const [isSaving, setIsSaving] = useState(false); // State khi đang lưu

  // Cập nhật state formData khi prop 'user' thay đổi (khi mở modal)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '', // Email thường không cho sửa, nhưng vẫn hiển thị
        isActive: user.isActive || false,
        // Thêm các trường khác nếu cần
      });
    } else {
      // Reset form khi không có user (ví dụ khi đóng modal)
      setFormData({});
    }
  }, [user]); // Chạy lại khi user thay đổi

  // Hàm xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' || type === 'switch' ? checked : value,
    }));
  };

  // Hàm xử lý khi nhấn nút Lưu
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Gọi hàm onSave được truyền từ UserListPage, truyền dữ liệu đã sửa
      await onSave(user.id, formData); // Truyền ID và dữ liệu mới
      // onClose(); // Đóng modal (thường sẽ do UserListPage xử lý sau khi onSave thành công)
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      // Có thể hiển thị lỗi ngay tại đây hoặc để UserListPage xử lý
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null; // Không render nếu chưa có user

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>
        Chỉnh sửa Người dùng
      </DialogTitle>
      <DialogContent sx={{ paddingTop: '20px !important' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              name="email"
              value={formData.email || ''}
              disabled // Không cho sửa email
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus // Tự động focus vào trường này khi mở
              margin="dense"
              label="Tên"
              type="text"
              fullWidth
              variant="outlined"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              disabled // không cho sửa tên
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive || false}
                  onChange={handleChange}
                  name="isActive"
                  disabled={isSaving}
                />
              }
              label="Đang hoạt động"
            />
          </Grid>
          {/* Thêm các trường khác nếu cần */}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid #e0e0e0', padding: '16px 24px' }}>
        <Button onClick={onClose} disabled={isSaving}>Hủy</Button>
        <Button onClick={handleSave} color="primary" variant="contained" disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Lưu thay đổi'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserEditModal;
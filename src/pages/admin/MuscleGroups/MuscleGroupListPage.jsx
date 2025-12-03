// src/pages/admin/MuscleGroups/MuscleGroupListPage.jsx

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, CircularProgress, Tooltip, Button,
  Snackbar, Alert // Thêm Snackbar, Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import apiClient from '../../../services/apiClient';

// Import các component mới tạo
import MuscleGroupModal from './MuscleGroupModal';
import ConfirmDeleteDialog from '../../../components/common/ConfirmDeleteDialog';

function MuscleGroupListPage() {
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho modal (Thêm/Sửa)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null); // null = Tạo mới, object = Sửa

  // State cho dialog Xóa
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingGroupId, setDeletingGroupId] = useState(null);

  // State cho Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchGroups(); // Tách hàm fetch ra
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/muscle-group');
      setMuscleGroups(response.data.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy nhóm cơ:", err);
      setError("Không thể tải danh sách nhóm cơ.");
    } finally {
      setLoading(false);
    }
  };

  // --- Xử lý Mở/Đóng Modal ---
  const handleOpenCreate = () => {
    setEditingGroup(null); // Đặt là null để modal biết là đang Tạo mới
    setIsModalOpen(true);
  };

  const handleOpenEdit = (group) => {
    setEditingGroup(group); // Đặt là group để modal biết là đang Sửa
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null); // Luôn reset khi đóng
  };

  // --- Xử lý Lưu (Tạo mới hoặc Sửa) ---
  const handleSave = async (formData, groupId) => {
    // Nếu có groupId nghĩa là Sửa, không thì là Tạo mới
    const isEditMode = Boolean(groupId);
    const apiCall = isEditMode
      ? apiClient.put(`/muscle-group/${groupId}`, formData)
      : apiClient.post('/muscle-group', formData);

    try {
      const response = await apiCall;

      if (isEditMode) {
        // Cập nhật nhóm cơ trong danh sách
        setMuscleGroups(prev =>
          prev.map(g => (g._id === groupId ? response.data.data : g))
        );
      } else {
        // Thêm nhóm cơ mới vào đầu danh sách
        setMuscleGroups(prev => [response.data.data, ...prev]);
      }

      setSnackbar({ open: true, message: `Lưu nhóm cơ thành công!`, severity: 'success' });
      return Promise.resolve(); // Báo cho modal là đã thành công

    } catch (err) {
      console.error("Lỗi khi lưu nhóm cơ:", err);
      // Ném lỗi lại để modal hiển thị
      throw err;
    }
  };

  // --- Xử lý Xóa ---
  const handleOpenDelete = (groupId) => {
    setDeletingGroupId(groupId);
    setIsConfirmOpen(true);
  };

  const handleCloseDelete = () => {
    setDeletingGroupId(null);
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await apiClient.delete(`/muscle-group/${deletingGroupId}`);
      setMuscleGroups(prev => prev.filter(g => g._id !== deletingGroupId));
      setSnackbar({ open: true, message: 'Xóa nhóm cơ thành công!', severity: 'success' });
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      setSnackbar({ open: true, message: 'Xóa thất bại. Vui lòng thử lại.', severity: 'error' });
    } finally {
      handleCloseDelete();
    }
  };

  // --- Xử lý Snackbar ---
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

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
          Quản lý Nhóm cơ
        </Typography>
        <Button
          variant="contained"
          color="primary" // Hoặc secondary (đỏ)
          startIcon={<AddIcon />}
          onClick={handleOpenCreate} // <-- Sửa onClick
        >
          Thêm Nhóm cơ
        </Button>
      </Box>

      {/* Loading/Error/Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
      ) : error ? (
        <Box sx={{ p: 3, textAlign: 'center', color: 'red' }}><Typography>{error}</Typography></Box>
      ) : (
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 'bold', bgcolor: '#eeeeee' } }}>
                <TableCell>Tên hiển thị (Tiếng Việt)</TableCell>
                <TableCell>Tên (Mã)</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {muscleGroups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">Chưa có nhóm cơ nào. (Nhấn "Thêm Nhóm cơ" để tạo)</TableCell>
                </TableRow>
              ) : (
                muscleGroups.map((group) => (
                  <TableRow hover key={group._id}>
                    <TableCell sx={{ fontWeight: 500 }}>{group.displayName}</TableCell>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.description}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Sửa">
                        <IconButton size="small" onClick={() => handleOpenEdit(group)}> {/* <-- Sửa onClick */}
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton size="small" onClick={() => handleOpenDelete(group._id)}> {/* <-- Sửa onClick */}
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

      {/* Modal Thêm/Sửa */}
      <MuscleGroupModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingGroup={editingGroup}
      />

      {/* Dialog Xóa */}
      <ConfirmDeleteDialog
        open={isConfirmOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa Nhóm cơ"
        message={`Bạn có chắc chắn muốn xóa nhóm cơ này không?`}
      />

      {/* Snackbar Thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Paper>
  );
}

export default MuscleGroupListPage;
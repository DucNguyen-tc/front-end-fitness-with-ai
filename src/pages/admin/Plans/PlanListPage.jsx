// src/pages/admin/Plans/PlanListPage.jsx

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, CircularProgress, Tooltip, Chip,
  Snackbar, Alert // Thêm Snackbar, Alert
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import apiClient from '../../../services/apiClient';
import PlanDetailsModal from './PlanDetailsModal'; // <-- Import Modal
import ConfirmDeleteDialog from '../../../components/common/ConfirmDeleteDialog'; // <-- Import Dialog Xóa

function PlanListPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userMap, setUserMap] = useState(new Map());

  // --- State cho Modal/Dialog ---
  const [selectedPlan, setSelectedPlan] = useState(null); // Kế hoạch đang xem
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deletingPlanId, setDeletingPlanId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [planRes, userRes, accountRes] = await Promise.all([
          apiClient.get('/plan'),
          apiClient.get('/user'),
          apiClient.get('/accounts')
        ]);

        const plansData = planRes.data.data || [];
        const usersData = userRes.data.data || [];
        const accountsData = accountRes.data.data || [];

        // Tạo bản đồ ánh xạ (Giữ nguyên)
        const accountMap = new Map(accountsData.map(acc => [acc.id, { name: acc.name, email: acc.email }]));
        const newMap = new Map();
        usersData.forEach(user => {
          const accountInfo = accountMap.get(user.accountId);
          if (accountInfo) {
            newMap.set(user._id, { name: accountInfo.name, email: accountInfo.email });
          }
        });

        setUserMap(newMap);
        setPlans(plansData);
      } catch (err) {
        setError("Không thể tải danh sách kế hoạch.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Hàm xử lý Mở/Đóng ---
  const handleOpenView = (plan) => {
    setSelectedPlan(plan);
    setIsViewModalOpen(true);
  };
  const handleCloseView = () => setIsViewModalOpen(false);

  const handleOpenDelete = (planId) => {
    setDeletingPlanId(planId);
    setIsConfirmOpen(true);
  };
  const handleCloseDelete = () => setDeletingPlanId(null);

  // --- Hàm xử lý Xóa ---
  const handleConfirmDelete = async () => {
    try {
      await apiClient.delete(`/plan/${deletingPlanId}`);
      setPlans(prev => prev.filter(p => p._id !== deletingPlanId));
      setSnackbar({ open: true, message: 'Xóa kế hoạch thành công!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Xóa thất bại.', severity: 'error' });
    } finally {
      handleCloseDelete();
      setIsConfirmOpen(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const getUserDisplay = (userId) => {
    // ... (Giữ nguyên hàm này)
    const info = userMap.get(userId);
    if (info) {
      return (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{info.name}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{info.email}</Typography>
        </Box>
      );
    }
    return <Typography variant="caption">Không rõ (ID: {userId.slice(0, 5)}...)</Typography>;
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
      {/* Tiêu đề (Giữ nguyên) */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0', bgcolor: '#f5f5f5' }}>
        <Typography variant="h5" fontWeight="bold" component="div">
          Quản lý Kế hoạch (Plans)
        </Typography>
      </Box>

      {/* Loading/Error/Table (Giữ nguyên) */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
      ) : error ? (
        <Box sx={{ p: 3, textAlign: 'center', color: 'red' }}><Typography>{error}</Typography></Box>
      ) : (
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 'bold', bgcolor: '#eeeeee' } }}>
                <TableCell sx={{ minWidth: 200 }}>Người dùng (Tên & Email)</TableCell>
                <TableCell align="center">Tuần hiện tại</TableCell>
                <TableCell align="center">Số buổi tập</TableCell>
                <TableCell align="center">Trạng thái Kế hoạch</TableCell>
                <TableCell align="center">Ngày tạo</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Chưa có kế hoạch nào.</TableCell>
                </TableRow>
              ) : (
                plans.map((plan) => (
                  <TableRow hover key={plan._id}>
                    {/* ... (Các TableCell khác giữ nguyên) ... */}
                    <TableCell>{getUserDisplay(plan.userId)}</TableCell>
                    <TableCell align="center">{plan.currentWeek}</TableCell>
                    <TableCell align="center">{plan.sessions?.length || 0}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={plan.status}
                        color={plan.status === 'COMPLETED' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {new Date(plan.createdAt).toLocaleDateString('vi-VN')}
                    </TableCell>

                    {/* Cập nhật onClick cho các nút */}
                    <TableCell align="center">
                      <Tooltip title="Xem chi tiết">
                        <IconButton size="small" onClick={() => handleOpenView(plan)}>
                          <VisibilityIcon fontSize="small" color="info" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton size="small" onClick={() => handleOpenDelete(plan._id)}>
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

      {/* === RENDER CÁC MODAL === */}

      {/* Modal Xem chi tiết (Chỉ render khi có dữ liệu) */}
      {selectedPlan && (
        <PlanDetailsModal
          open={isViewModalOpen}
          onClose={handleCloseView}
          plan={selectedPlan}
        />
      )}

      {/* Dialog Xóa */}
      <ConfirmDeleteDialog
        open={isConfirmOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa Kế hoạch"
        message="Bạn có chắc chắn muốn xóa kế hoạch này không?"
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

export default PlanListPage;
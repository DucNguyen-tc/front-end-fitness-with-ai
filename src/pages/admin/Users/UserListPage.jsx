import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  Grid,
  Button,
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
  CircularProgress, // Để hiển thị loading
  Tooltip, // Để hiển thị gợi ý khi hover nút
} from '@mui/material';
import {
  Edit as EditIcon, // Icon sửa
  Delete as DeleteIcon, // Icon xóa
  Visibility as VisibilityIcon, // Icon xem
  CheckCircle as CheckCircleIcon, // Icon active
  Cancel as CancelIcon, // Icon inactive
} from '@mui/icons-material';
import apiClient from '../../../services/apiClient'; // Import apiClient đã cấu hình
import UserDetailsModal from './UserDetailsModal';
import UserEditModal from './UserEditModal';
function UserListPage() {
  const [users, setUsers] = useState([]); // State lưu danh sách user
  const [loading, setLoading] = useState(true); // State theo dõi trạng thái loading
  const [error, setError] = useState(null); // State lưu lỗi (nếu có)
  // State cho modal xem chi tiết
  const [selectedUser, setSelectedUser] = useState(null); // Lưu user đang được xem
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Trạng thái mở/đóng modal
  // State cho dialog xác nhận xóa
  const [deletingUserId, setDeletingUserId] = useState(null); // Lưu ID user cần xóa
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Trạng thái mở/đóng dialog

  // State cho Snackbar thông báo
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' hoặc 'error'
  // State cho modal sửa
  const [editingUser, setEditingUser] = useState(null); // User đang được sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Trạng thái mở/đóng
  // Hàm gọi API để lấy danh sách tài khoản
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Bắt đầu loading
      setError(null); // Reset lỗi
      try {
        // Sử dụng apiClient đã cấu hình sẵn token
        const response = await apiClient.get('/accounts');
        console.log('API Response:', response.data); // Kiểm tra dữ liệu trả về

        // Kiểm tra cấu trúc data backend trả về (quan trọng!)
        // Backend đang trả về { statusCode, message, data }
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
           setUsers(response.data.data); // Lấy mảng user từ response.data.data
        } else {
          // Nếu cấu trúc không đúng, log ra và báo lỗi
          console.error('Unexpected API response structure:', response.data);
          setError('Dữ liệu người dùng trả về không đúng định dạng.');
          setUsers([]); // Đặt lại users thành mảng rỗng
        }

      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
        setError("Không thể tải danh sách người dùng. Vui lòng thử lại.");
        setUsers([]); // Đặt lại users thành mảng rỗng khi có lỗi
      } finally {
        setLoading(false); // Kết thúc loading dù thành công hay thất bại
      }
    };

    fetchUsers(); // Gọi hàm fetchUsers khi component mount
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy 1 lần
  // Hàm mở modal xem chi tiết
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // Hàm đóng modal xem chi tiết
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null); // Reset user đang chọn khi đóng
  };
  // Hàm mở dialog xác nhận xóa
  const handleDeleteClick = (userId) => {
    setDeletingUserId(userId); // Lưu ID lại
    setIsConfirmOpen(true);    // Mở dialog
  };

  // Hàm đóng dialog xác nhận
  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setDeletingUserId(null); // Reset ID
  };

  // Hàm xử lý khi người dùng xác nhận xóa
  const handleDeleteConfirm = async () => {
    if (!deletingUserId) return;

    try {
      // Gọi API xóa user
      await apiClient.delete(`/accounts/${deletingUserId}`);

      // Cập nhật lại danh sách users trên UI (loại bỏ user đã xóa)
      setUsers(currentUsers => currentUsers.filter(user => user.id !== deletingUserId));

      // Hiển thị thông báo thành công
      setSnackbarMessage('Xóa người dùng thành công!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (err) {
      console.error("Lỗi khi xóa người dùng:", err);
      // Hiển thị thông báo lỗi
      setSnackbarMessage('Xóa người dùng thất bại. Vui lòng thử lại.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseConfirm(); // Đóng dialog xác nhận sau khi xử lý xong
    }
  };

  // Hàm đóng Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  // Hàm mở modal sửa
  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // Hàm đóng modal sửa
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };
  // Hàm xử lý khi lưu thay đổi từ modal sửa
  const handleSaveUser = async (userId, updatedData) => {
    // Ta sẽ gọi API PUT ở đây
    console.log("Saving user:", userId, updatedData);
    try {
      // Ví dụ API call (bạn cần API này ở backend)
      const response = await apiClient.put(`/accounts/${userId}`, updatedData);

      // Cập nhật lại danh sách user trên UI
      setUsers(currentUsers =>
        currentUsers.map(user =>
          user.id === userId ? { ...user, ...response.data.data } : user // Giả sử API trả về user đã update trong response.data.data
        )
      );

      handleCloseEditModal(); // Đóng modal sau khi lưu thành công
      // Hiển thị thông báo thành công
      setSnackbarMessage('Cập nhật người dùng thành công!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (err) {
      console.error("Lỗi khi cập nhật người dùng:", err);
      // Hiển thị thông báo lỗi
      setSnackbarMessage('Cập nhật người dùng thất bại. Vui lòng thử lại.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      // Không đóng modal khi có lỗi để user có thể thử lại
      throw err; // Ném lỗi để UserEditModal biết là có lỗi xảy ra
    }
  };

  // === Render giao diện ===
  return (
    // Sử dụng Paper của MUI để tạo khung trắng bao quanh bảng
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
      {/* Tiêu đề trang */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0', bgcolor: '#f5f5f5' /* Màu nền nhẹ cho header */ }}>
        <Typography variant="h5" fontWeight="bold" component="div">
          Quản lý Người dùng
        </Typography>
      </Box>

      {/* Hiển thị loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Đang tải dữ liệu...</Typography>
        </Box>
      )}

      {/* Hiển thị lỗi */}
      {!loading && error && (
        <Box sx={{ p: 3, textAlign: 'center', color: 'red' }}>
          <Typography>{error}</Typography>
        </Box>
      )}

      {/* Hiển thị bảng khi không loading và không có lỗi */}
      {!loading && !error && (
        <TableContainer sx={{ maxHeight: 600 }}> {/* Giới hạn chiều cao và cho phép cuộn */}
          <Table stickyHeader aria-label="sticky table"> {/* stickyHeader giữ header cố định khi cuộn */}
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 'bold', bgcolor: '#eeeeee' /* Màu nền header */ } }}>
                <TableCell>STT</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell align="center">Vai trò</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Không có dữ liệu người dùng.</TableCell>
                </TableRow>
              ) : (
                // Lặp qua danh sách users để render từng hàng
                users.map((user, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id || index}> {/* Nên dùng user.id nếu có */}
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell align="center">
                      {/* Hiển thị role với màu sắc */}
                      <Typography
                        component="span"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          color: user.role === 'admin' ? '#fff' : '#333',
                          bgcolor: user.role === 'admin' ? 'secondary.main' : 'primary.light',
                        }}
                      >
                        {user.role?.toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {/* Hiển thị trạng thái với icon */}
                      {user.isActive ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <CancelIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {/* Các nút hành động */}
                      <Tooltip title="Xem chi tiết">
                        <IconButton size="small" onClick={() => handleViewDetails(user)}>
                          <VisibilityIcon fontSize="small" color="info" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton size="small" onClick={() => handleEditClick(user)}>
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        {/* Chỉ hiển thị nút xóa nếu không phải admin */}
                        {user.role !== 'admin' && (
                          <IconButton size="small" onClick={() => handleDeleteClick(user.id)}>
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        )}
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Render Modal xem chi tiết (nó chỉ hiển thị khi isViewModalOpen là true) */}
      <UserDetailsModal
        open={isViewModalOpen}
        onClose={handleCloseViewModal}
        user={selectedUser}
      />
      {/* Dialog Xác nhận Xóa */}
      <Dialog
        open={isConfirmOpen}
        onClose={handleCloseConfirm}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa người dùng này không? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Hủy</Button>
          {/* Gọi hàm xác nhận xóa khi nhấn nút Xóa */}
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar để hiển thị thông báo */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* Render Modal Sửa */}
      <UserEditModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        user={editingUser}
        onSave={handleSaveUser} // Truyền hàm xử lý lưu vào modal
      />

    </Paper>
  );
}

export default UserListPage;
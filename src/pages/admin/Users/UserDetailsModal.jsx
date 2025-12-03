import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress, // Thêm loading
  Divider, // Thêm dải phân cách
} from '@mui/material';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { getUserByAccountId } from '../../../services/userService'; // Import service
import { getPlanByUserId } from '../../../services/planService'; // Import service

// Component này nhận vào:
// - open: boolean để điều khiển hiển thị
// - onClose: hàm để đóng modal
// - user: object chứa thông tin ACCOUNT (lấy từ bảng)
function UserDetailsModal({ open, onClose, user }) {
  const [profile, setProfile] = useState(null); // State cho profile (User)
  const [plans, setPlans] = useState([]); // State cho plan
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect này sẽ chạy mỗi khi modal được mở (prop 'open' = true)
  useEffect(() => {
    // Chỉ fetch khi modal được mở và có user (user ở đây là account)
    if (open && user?.id) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        setProfile(null); // Reset dữ liệu cũ
        setPlans([]);

        try {
          // 1. Fetch User Profile (dùng accountId)
          // file: src/services/userService.js
          const userProfileRes = await getUserByAccountId(user.id);
          const userProfileData = userProfileRes.data;
          setProfile(userProfileData); // Lưu lại thông tin User (profile, goals)

          // 2. Kiểm tra xem có lấy được _id của User không
          if (userProfileData?._id) {
            // Dùng _id (là userId) để fetch plan
            // file: src/services/planService.js
            const planRes = await getPlanByUserId(userProfileData._id);
            setPlans(planRes.data || []); // Lưu lại mảng các kế hoạch
          } else {
            // Nếu không có userProfile._id, nghĩa là user này chưa tạo hồ sơ
            setError('Người dùng này chưa hoàn tất hồ sơ (profile).');
          }
        } catch (err) {
          console.error("Lỗi khi fetch chi tiết user:", err);
          // Kiểm tra xem lỗi có phải do user chưa tạo profile không (backend trả về 404)
          if (err.response && err.response.status === 404) {
             setError('Người dùng này chưa hoàn tất hồ sơ (profile).');
          } else {
             setError("Không thể tải đầy đủ thông tin chi tiết.");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [open, user]); // Chạy lại mỗi khi mở modal hoặc đổi user

  // Đếm số buổi đã hoàn thành
  const completedSessions = plans.reduce((count, weeklyPlan) => {
    if (weeklyPlan.sessions && Array.isArray(weeklyPlan.sessions)) {
        // Đếm số session có status là 'COMPLETED' trong tuần
        const completedInWeek = weeklyPlan.sessions.filter(s => s.status === 'COMPLETED').length;
        return count + completedInWeek;
    }
    return count;
  }, 0);

  // Hàm render nội dung chi tiết (Profile, Plan)
  const renderExtraDetails = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
          <CircularProgress size={24} sx={{ mr: 2 }} />
          <Typography>Đang tải thông tin hồ sơ...</Typography>
        </Box>
      );
    }
    if (error) {
      return <Typography color="text.secondary" sx={{ p: 3, textAlign: 'center' }}>{error}</Typography>;
    }
    if (!profile) {
      return null; // Không hiển thị gì thêm nếu không có profile
    }

    // Hiển thị đầy đủ thông tin
    return (
      <>
        {/* Thông tin Profile */}
        <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
          Hồ sơ (Profile)
        </Typography>
        <Box sx={{ pl: 2, borderLeft: '3px solid #f44336' /* Màu đỏ */, pb: 1 }}>
          <Typography><strong>Tuổi:</strong> {profile.profile.age}</Typography>
          <Typography><strong>Giới tính:</strong> {profile.profile.gender}</Typography>
          <Typography><strong>Chiều cao:</strong> {profile.profile.height} cm</Typography>
          <Typography><strong>Cân nặng hiện tại:</strong> {profile.profile.weight} kg</Typography>
          <Typography><strong>BMI:</strong> {profile.profile.bmi}</Typography>
          <Typography><strong>Trình độ:</strong> {profile.profile.fitnessLevel}</Typography>
          <Typography><strong>Mỡ cơ thể:</strong> {profile.profile.bodyFatPercentageBefore}</Typography>
        </Box>

        {/* Thông tin Mục tiêu */}
        <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
          Mục tiêu
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography><strong>Cân nặng mục tiêu:</strong> {profile.goals.weightGoal} kg</Typography>
          <Typography><strong>Thời gian:</strong> {profile.goals.timeFrame} tuần</Typography>
          <Typography><strong>Mỡ cơ thể (Mục tiêu):</strong> {profile.goals.bodyFatPercentageAfter}</Typography>
        </Box>

        {/* Thông tin Tiến độ */}
        <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
          Tiến độ
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography>
            <strong>Số buổi đã hoàn thành:</strong> {completedSessions}
          </Typography>
        </Box>
      </>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>
        Chi tiết Người dùng: {user?.name || ''}
      </DialogTitle>
      <DialogContent sx={{ paddingTop: '20px !important' }}>
        {/* Phần thông tin Account (vẫn giữ) */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          Tài khoản (Account)
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography><strong>Email:</strong> {user?.email}</Typography>
          <Box mb={1} display="flex" alignItems="center">
            <Typography mr={1}><strong>Vai trò:</strong></Typography>
            <Chip
              label={user?.role?.toUpperCase()}
              color={user?.role === 'admin' ? 'secondary' : 'primary'}
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography mr={1}><strong>Trạng thái:</strong></Typography>
            {user?.isActive ? (
              <Chip icon={<CheckCircleIcon />} label="Hoạt động" color="success" size="small" variant="outlined" />
            ) : (
              <Chip icon={<CancelIcon />} label="Đã khóa" color="error" size="small" variant="outlined" />
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} /> {/* Dải phân cách */}

        {/* Render nội dung động (profile, plan) */}
        {renderExtraDetails()}

      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid #e0e0e0', padding: '16px 24px' }}>
        <Button onClick={onClose} color="primary" variant="contained">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDetailsModal;
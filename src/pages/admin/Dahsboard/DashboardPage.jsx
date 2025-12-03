// src/pages/admin/Dahsboard/DashboardPage.jsx (Phiên bản nâng cấp)
import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import apiClient from '../../../services/apiClient'; // Import apiClient
import { UserContext } from '../../../stores/UserContext'; // Import UserContext

const Dashboard = () => {
  const { user } = useContext(UserContext); // Lấy thông tin admin đang đăng nhập
  const [stats, setStats] = useState({
    memberCount: 0,
    completedSessions: 0,
    totalCalories: 0,
  });
  const [loading, setLoading] = useState(true);

  // Gọi API để lấy dữ liệu thống kê thật
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Gọi song song 2 API
        const [accountRes, planRes] = await Promise.all([
          apiClient.get('/accounts'), // Lấy tất cả tài khoản
          apiClient.get('/plan')      // Lấy tất cả kế hoạch
        ]);

        const accounts = accountRes.data.data || [];
        const plans = planRes.data.data || [];

        // 1. Đếm tổng số thành viên (bao gồm cả admin)
        const memberCount = accounts.length;

        // 2. Tính toán từ kế hoạch
        let completedSessions = 0;
        let totalCalories = 0;

        plans.forEach(plan => {
          if (plan.sessions && Array.isArray(plan.sessions)) {
            plan.sessions.forEach(session => {
              if (session.status === 'COMPLETED') {
                completedSessions += 1;
                totalCalories += session.caloriesBurned || 0; // Lấy calo từ session
              }
            });
          }
        });

        setStats({ memberCount, completedSessions, totalCalories });

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []); // Chạy 1 lần khi component mount

  // Hàm hiển thị số liệu hoặc dấu "..." khi đang tải
  const renderStat = (value) => {
    if (loading) {
      return <CircularProgress size={24} color="inherit" />;
    }
    // Format số cho đẹp (ví dụ: 1000 -> 1,000)
    return value.toLocaleString('vi-VN');
  };

  return (
    // Chỉ render phần nội dung, vì layout đã có sidebar
    <Box>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Dashboard - Gym Fitness</h1>
        <div className="flex items-center">
          {/* Lấy tên admin từ Context */}
          <span className="text-sm font-semibold mr-2 text-white">{user?.name || 'Admin'}</span>
          <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>
      </div>

      {/* Thống kê trên cùng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1: Thành viên */}
        <Card sx={{ backgroundColor: '#2A2A2A', color: '#F5F5F5', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" className="font-semibold text-gray-400">Tổng Thành viên</Typography>
            <div className="flex justify-between items-center mt-2">
              <Typography variant="h4" className="font-bold text-[#FF6B6B]">
                {renderStat(stats.memberCount)}
              </Typography>
              <div className="bg-[#FF6B6B] w-10 h-10 rounded-full flex items-center justify-center text-3xl">
                👥
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Buổi tập (Đã hoàn thành) */}
        <Card sx={{ backgroundColor: '#2A2A2A', color: '#F5F5F5', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" className="font-semibold text-gray-400">Buổi tập (Đã HT)</Typography>
            <div className="flex justify-between items-center mt-2">
              <Typography variant="h4" className="font-bold text-[#FF6B6B]">
                {renderStat(stats.completedSessions)}
              </Typography>
              <div className="bg-[#FF6B6B] w-10 h-10 rounded-full flex items-center justify-center text-3xl">
                💪
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Calories (Đã đốt) */}
        <Card sx={{ backgroundColor: '#2A2A2A', color: '#F5F5F5', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" className="font-semibold text-gray-400">Tổng Calories (Đã đốt)</Typography>
            <div className="flex justify-between items-center mt-2">
              <Typography variant="h4" className="font-bold text-[#FF6B6B]">
                {renderStat(stats.totalCalories)}
              </Typography>
              <div className="bg-[#FF6B6B] w-10 h-10 rounded-full flex items-center justify-center text-3xl">
                🔥
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phần biểu đồ và hoạt động (vẫn giữ nguyên) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 bg-[#2A2A2A] rounded-xl p-6 shadow-md">
          <Typography variant="h6" className="font-semibold mb-4 text-white">Lượng calories tiêu hao theo ngày</Typography>
          <div className="w-full h-72 flex items-center justify-center">
            <p className="text-gray-500">(Nội dung biểu đồ ở đây)</p>
          </div>
        </div>
        <div className="col-span-1 bg-[#2A2A2A] rounded-xl p-6 shadow-md">
          <Typography variant="h6" className="font-semibold mb-4 text-white">Hoạt động gần đây</Typography>
          <div className="space-y-4">
            {/* (Nội dung hoạt động ở đây) */}
            <p className="text-gray-500">(Hoạt động gần đây của user)</p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
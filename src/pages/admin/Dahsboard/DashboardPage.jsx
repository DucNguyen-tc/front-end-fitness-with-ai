// src/components/Dashboard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    // Main container sử dụng Flexbox để chia sidebar và nội dung chính
    <div className="flex bg-[#1E1E1E] text-[#F5F5F5] min-h-screen font-sans">
      
      {/* Sidebar */}
      <div className="bg-[#1A1A1A] w-64 p-6 flex-shrink-0 flex flex-col justify-between">
        <div>
          {/* Logo/Tên thương hiệu */}
          <div className="flex items-center mb-10">
            <span className="text-[#FF6B6B] font-bold text-2xl">Gym</span>
            <span className="text-white font-bold text-2xl">Pulse</span>
          </div>

          {/* Menu điều hướng */}
          <nav className="space-y-4">
            <div className="flex items-center p-3 rounded-lg bg-gray-800 text-[#FF6B6B] font-semibold">
              <span role="img" aria-label="dashboard" className="mr-3 text-xl">🏠</span>
              <span>Dashboard</span>
            </div>
            <div className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-gray-800 transition duration-200 cursor-pointer">
              <span role="img" aria-label="users" className="mr-3 text-xl">👥</span>
              <span>Người dùng</span>
            </div>
            <div className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-gray-800 transition duration-200 cursor-pointer">
              <span role="img" aria-label="settings" className="mr-3 text-xl">⚙️</span>
              <span>Cài đặt</span>
            </div>
          </nav>
        </div>
        
        {/* Footer của Sidebar */}
        <div className="border-t border-gray-700 pt-4 mt-6">
          <div className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-gray-800 transition duration-200 cursor-pointer">
            <span role="img" aria-label="logout" className="mr-3 text-xl">🚪</span>
            <span>Đăng xuất</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard - Gym Fitness</h1>
          <div className="flex items-center">
            <span className="text-sm font-semibold mr-2">Nguyễn Đức</span>
            <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold">
              ND
            </div>
          </div>
        </div>
        
        {/* Thống kê trên cùng */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card sx={{ backgroundColor: '#2A2A2A', color: '#F5F5F5', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" className="font-semibold text-gray-400">Thành viên</Typography>
              <div className="flex justify-between items-center mt-2">
                <Typography variant="h4" className="font-bold text-[#FF6B6B]">120</Typography>
                <div className="bg-[#FF6B6B] w-10 h-10 rounded-full flex items-center justify-center text-3xl">
                  👥
                </div>
              </div>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#2A2A2A', color: '#F5F5F5', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" className="font-semibold text-gray-400">Buổi tập</Typography>
              <div className="flex justify-between items-center mt-2">
                <Typography variant="h4" className="font-bold text-[#FF6B6B]">25</Typography>
                <div className="bg-[#FF6B6B] w-10 h-10 rounded-full flex items-center justify-center text-3xl">
                  💪
                </div>
              </div>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#2A2A2A', color: '#F5F5F5', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" className="font-semibold text-gray-400">Calories</Typography>
              <div className="flex justify-between items-center mt-2">
                <Typography variant="h4" className="font-bold text-[#FF6B6B]">3500</Typography>
                <div className="bg-[#FF6B6B] w-10 h-10 rounded-full flex items-center justify-center text-3xl">
                  🔥
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 bg-[#2A2A2A] rounded-xl p-6 shadow-md">
            <Typography variant="h6" className="font-semibold mb-4 text-white">Lượng calories tiêu hao theo ngày</Typography>
            <div className="w-full h-72 flex items-center justify-center">
              <p className="text-gray-500">Nội dung biểu đồ ở đây</p>
            </div>
          </div>
          <div className="col-span-1 bg-[#2A2A2A] rounded-xl p-6 shadow-md">
            <Typography variant="h6" className="font-semibold mb-4 text-white">Hoạt động gần đây</Typography>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white">AD</div>
                <div>
                  <Typography className="text-sm font-semibold">An Dũng</Typography>
                  <Typography variant="caption" className="text-gray-400">đã đăng ký gói 12 buổi</Typography>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white">VT</div>
                <div>
                  <Typography className="text-sm font-semibold">Việt Thắng</Typography>
                  <Typography variant="caption" className="text-gray-400">đã hoàn thành buổi tập</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
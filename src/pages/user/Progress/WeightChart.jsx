import React, { useMemo } from "react";
import { Card, CardContent, Box, Typography, LinearProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const WeightChart = ({ userData, plan = [] }) => {
  const timeFrame = userData?.data?.goals?.timeFrame ?? 0;
  const weightGoal = userData?.data?.goals?.weightGoal ?? 0;
  const profileWeight = userData?.data?.profile?.weight ?? null;

  const weightData = useMemo(() => {
    // Không có profileWeight và không có plan → không có dữ liệu
    if (profileWeight == null && plan.length === 0) return [];

    const result = [];

    // ✅ Cột đầu tiên: cân nặng ban đầu (bắt buộc có)
    result.push({
      week: "Bắt đầu",
      weight: profileWeight ? Number(profileWeight) : null,
    });

    // ✅ Tạo các tuần từ 1 → timeFrame
    for (let i = 1; i <= timeFrame; i++) {
      // Tìm trong plan tuần tương ứng
      const p = plan.find((item) => item.currentWeek === i);

      const weight = p?.progress?.endOfWeekWeight ?? null;

      result.push({
        week: `Tuần ${i}`,
        weight: weight != null ? Number(weight) : null,
      });
    }

    return result;
  }, [userData, plan, timeFrame, profileWeight]);

  // ✅ Tính toán tiến độ
  const currentWeight = weightData
    .slice()
    .reverse()
    .find((d) => d.weight != null)?.weight ?? profileWeight;

  const progressPercentage = profileWeight && weightGoal 
    ? Math.max(0, Math.min(100, ((profileWeight - currentWeight) / (profileWeight - weightGoal)) * 100))
    : 0;

  const weightDifference = profileWeight ? profileWeight - currentWeight : 0;

  // ✅ Không có dữ liệu gì thật sự
  const hasAnyWeight = weightData.some((d) => d.weight != null);
  if (!hasAnyWeight) {
    return (
      <Card sx={{ 
        borderRadius: 3, 
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
        border: '2px solid #333',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        p: 3 
      }}>
        <Typography 
          align="center" 
          sx={{ color: '#ccc' }}
        >
          📭 Chưa có dữ liệu cân nặng để hiển thị biểu đồ
        </Typography>
      </Card>
    );
  }

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(42, 42, 42, 0.95)',
            border: '1px solid #dc2d2d',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
            {label}
          </Typography>
          <Typography sx={{ color: '#ff6b6b' }}>
            Cân nặng: <strong>{payload[0].value} kg</strong>
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card sx={{ 
      borderRadius: 3, 
      background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
      border: '2px solid #333',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={3}
        >
          <Box>
            <Typography 
              variant="h5" 
              fontWeight="600" 
              sx={{ 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1
              }}
            >
              ⚖️ Theo Dõi Cân Nặng
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Hành trình giảm cân của bạn
            </Typography>
          </Box>
          
          {/* Stats Box */}
          <Box 
            sx={{ 
              textAlign: 'right',
              background: 'rgba(220, 45, 45, 0.1)',
              borderRadius: 2,
              p: 2,
              border: '1px solid #dc2d2d',
              minWidth: 140
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#ff6b6b' }}>
              {weightGoal} kg
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Mục tiêu
            </Typography>
          </Box>
        </Box>

        {/* Progress Info */}
        <Box sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Tiến độ hiện tại: <strong style={{ color: '#ff6b6b' }}>{currentWeight} kg</strong>
            </Typography>
            <Typography variant="body2" sx={{ 
              color: weightDifference >= 0 ? '#4caf50' : '#ff9800',
              fontWeight: 'bold'
            }}>
              {weightDifference > 0 ? `↓ ${weightDifference.toFixed(1)}kg` : weightDifference < 0 ? `↑ ${Math.abs(weightDifference).toFixed(1)}kg` : 'Không thay đổi'}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: '#333',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(45deg, #dc2d2d, #ff6b6b)',
                borderRadius: 4,
              }
            }}
          />
          <Typography variant="caption" sx={{ color: '#888', mt: 0.5, display: 'block' }}>
            Đã hoàn thành: {progressPercentage.toFixed(1)}%
          </Typography>
        </Box>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weightData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#444" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="week" 
              stroke="#ccc"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#ccc"
              fontSize={12}
              tickLine={false}
              domain={[
                (dataMin) => (dataMin ? Math.floor(dataMin - 2) : 0),
                (dataMax) => (dataMax ? Math.ceil(dataMax + 2) : 10),
              ]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={weightGoal} 
              stroke="#4caf50"
              strokeDasharray="3 3"
              label={{
                value: 'Mục tiêu',
                position: 'right',
                fill: '#4caf50',
                fontSize: 12
              }} 
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="url(#weightGradient)"
              strokeWidth={3}
              dot={{ 
                r: 5, 
                fill: '#dc2d2d',
                stroke: '#fff',
                strokeWidth: 2 
              }}
              activeDot={{ 
                r: 8, 
                fill: '#ff6b6b',
                stroke: '#fff',
                strokeWidth: 2 
              }}
              connectNulls
            />
            {/* Gradient for line */}
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#dc2d2d" />
                <stop offset="100%" stopColor="#ff6b6b" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>

        {/* Legend */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 3, background: 'linear-gradient(45deg, #dc2d2d, #ff6b6b)' }} />
            <Typography variant="caption" sx={{ color: '#ccc' }}>
              Cân nặng thực tế
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 2, background: '#4caf50', border: '1px dashed #4caf50' }} />
            <Typography variant="caption" sx={{ color: '#ccc' }}>
              Mục tiêu
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeightChart;
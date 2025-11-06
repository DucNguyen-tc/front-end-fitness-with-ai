import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CalorieChart = ({ plan }) => {
  const [offset, setOffset] = useState(0);

  const allSessions = plan.flatMap((p) => p.sessions || []);
  const today = new Date();

  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1 + offset * 7);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  const weeklySessions = allSessions.filter((s) => {
    if (!s.targetDate) return false;
    const d = new Date(s.targetDate);
    return d >= monday && d <= sunday && s.status === "COMPLETED";
  });

  const calorieMap = {};
  weeklySessions.forEach((s) => {
    const key = new Date(s.targetDate).toLocaleDateString("vi-VN");
    calorieMap[key] = (calorieMap[key] || 0) + (s.caloriesBurned || 0);
  });

  const calorieData = weekDays.map((d) => {
    const calories = calorieMap[d.toLocaleDateString("vi-VN")] || 0;
    return {
      day: d.toLocaleDateString("vi-VN", { weekday: "short" }),
      fullDay: d.toLocaleDateString("vi-VN", { weekday: "long" }),
      date: d.toLocaleDateString("vi-VN"),
      calo: calories,
      isToday: d.toDateString() === today.toDateString(),
    };
  });

  const getPeriodLabel = () => {
    return `Tuần ${monday.toLocaleDateString("vi-VN")} - ${sunday.toLocaleDateString("vi-VN")}`;
  };

  const totalCalories = calorieData.reduce((sum, item) => sum + item.calo, 0);
  const averageCalories = Math.round(totalCalories / 7);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(42, 42, 42, 0.95)',
            border: '1px solid #ff9800',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
            {payload[0]?.payload.fullDay}
          </Typography>
          <Typography sx={{ color: '#ccc', mb: 0.5 }}>
            {payload[0]?.payload.date}
          </Typography>
          <Typography sx={{ color: '#ff9800', fontWeight: 'bold' }}>
            Calories: <strong>{payload[0].value} cal</strong>
          </Typography>
        </Box>
      );
    }
    return null;
  };

  // Custom bar color based on calories
  const getBarColor = (calories) => {
    if (calories === 0) return '#444';
    if (calories < 200) return '#ffb74d';
    if (calories < 400) return '#ff9800';
    return '#ff5722';
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
              🔥 Thống Kê Calories
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Lượng calories đốt cháy theo tuần
            </Typography>
          </Box>

          {/* Navigation */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton 
              onClick={() => setOffset((prev) => prev - 1)}
              sx={{
                color: '#ccc',
                '&:hover': {
                  bgcolor: 'rgba(255, 152, 0, 0.1)',
                  color: '#ff9800',
                }
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#ff9800',
                fontWeight: '500',
                minWidth: 200,
                textAlign: 'center'
              }}
            >
              {getPeriodLabel()}
            </Typography>
            <IconButton 
              onClick={() => setOffset((prev) => prev + 1)}
              sx={{
                color: '#ccc',
                '&:hover': {
                  bgcolor: 'rgba(255, 152, 0, 0.1)',
                  color: '#ff9800',
                }
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        {/* Stats Summary */}
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 3,
            flexWrap: 'wrap'
          }}
        >
          <Box 
            sx={{ 
              background: 'rgba(255, 152, 0, 0.1)',
              borderRadius: 2,
              p: 2,
              border: '1px solid #ff9800',
              flex: 1,
              minWidth: 120
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#ffb74d' }}>
              {totalCalories}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Tổng tuần
            </Typography>
          </Box>
          <Box 
            sx={{ 
              background: 'rgba(76, 175, 80, 0.1)',
              borderRadius: 2,
              p: 2,
              border: '1px solid #4caf50',
              flex: 1,
              minWidth: 120
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#81c784' }}>
              {averageCalories}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Trung bình/ngày
            </Typography>
          </Box>
        </Box>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={calorieData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#444" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="day" 
              stroke="#ccc"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#ccc"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="calo" 
              radius={[4, 4, 0, 0]}
            >
              {calorieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.calo)}
                  stroke={entry.isToday ? "#fff" : "none"}
                  strokeWidth={entry.isToday ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: '#ffb74d', borderRadius: 1 }} />
            <Typography variant="caption" sx={{ color: '#ccc' }}>
              Thấp (&lt; 200 cal)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: '#ff9800', borderRadius: 1 }} />
            <Typography variant="caption" sx={{ color: '#ccc' }}>
              Trung bình (200-400 cal)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: '#ff5722', borderRadius: 1 }} />
            <Typography variant="caption" sx={{ color: '#ccc' }}>
              Cao (&gt; 400 cal)
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CalorieChart;
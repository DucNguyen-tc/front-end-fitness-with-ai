import React, { useState } from "react";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const reviews = [
  {
    name: "Farhan Rio",
    role: "Happy Customer",
    rating: 5,
    comment:
      "Tôi đã tập được 3 năm rồi và chưa bao giờ có được vóc dáng tốt như thế này. Huấn luyện viên AI rất tuyệt vời và họ luôn thúc đẩy tôi để tôi đạt được trạng thái tốt nhất. Tôi rất vui khi tập với Fitness KouDAn.",
    avatar:
      "https://images.pexels.com/photos/5236639/pexels-photo-5236639.jpeg",
  },
  {
    name: "Sophia Lee",
    role: "Fitness Enthusiast",
    rating: 4,
    comment:
      "Môi trường ở đây rất khích lệ! Các huấn luyện viên thực sự quan tâm đến sự tiến bộ của bạn và tôi cảm thấy mạnh mẽ hơn mỗi tuần. Tôi có thể thấy sự khác biệt rõ ràng trong sức khỏe tổng thể của mình kể từ khi tôi bắt đầu tập luyện ở đây.",
    avatar: "https://images.pexels.com/photos/963697/pexels-photo-963697.jpeg",
  },
  {
    name: "Michael Chen",
    role: "Member",
    rating: 5,
    comment:
      "Phòng tập tốt nhất thành phố. Thiết bị hiện đại, huấn luyện viên chuyên nghiệp và lịch tập linh hoạt. Tôi đã giảm được 15kg trong 4 tháng và cảm thấy tuyệt vời hơn bao giờ hết!",
    avatar:
      "https://images.pexels.com/photos/5201524/pexels-photo-5201524.jpeg",
  },
];

const ReviewsSection = () => {
  const [current, setCurrent] = useState(0);

  const prevReview = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gray-950 py-20 px-6 md:px-40">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Khách hàng đã nói <br /> gì về chúng tôi
          </h2>
          <p className="text-gray-400 mb-6">
            Tôi đã là thành viên của Fitness KouDAn được khoảng 6 tháng và tôi thực sự yêu thích nơi này!
            Các huấn luyện viên rất nhiệt tình và giúp tôi đạt được mục tiêu thể hình.
          </p>

          {/* Avatars + Rating */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img
                src="https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg"
                alt="client"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg"
                alt="client"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.pexels.com/photos/3799455/pexels-photo-3799455.jpeg"
                alt="client"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                +
              </div>
            </div>

            <div className="flex items-center gap-2 text-yellow-400">
              <StarIcon />
              <p className="text-white text-sm">4.9 (450 Reviews)</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="bg-gray-800 rounded-lg m-10 p-6 shadow-lg">
            {/* Avatar + Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={reviews[current].avatar}
                alt={reviews[current].name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-white font-semibold">
                  {reviews[current].name}
                </h4>
                <p className="text-gray-400 text-sm">{reviews[current].role}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex text-yellow-400 mb-3">
              {Array(reviews[current].rating)
                .fill()
                .map((_, i) => (
                  <StarIcon key={i} />
                ))}
            </div>

            {/* Comment */}
            <p className="text-gray-300 text-sm">{reviews[current].comment}</p>
          </div>

          {/* Arrows */}
          <IconButton
            onClick={prevReview}
            sx={{
              backgroundColor: "#1e293b", // màu nền
              color: "white", // màu icon
              "&:hover": {
                backgroundColor: "red", // màu khi hover
              },
            }}
            className="!absolute -left-4 top-1/2 -translate-y-1/2"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={nextReview}
            sx={{
              backgroundColor: "#1e293b", // màu nền
              color: "white", // màu icon
              "&:hover": {
                backgroundColor: "red", // màu khi hover
              },
            }}
            className="!absolute -right-4 top-1/2 -translate-y-1/2"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

import React from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

const programs = [
  {
    icon: <FitnessCenterIcon fontSize="large" className="text-white" />,
    title: "Rèn luyện sức mạnh",
    description:
      "Huấn luyện viên AI của chúng tôi sẽ thiết kế các chương trình tập luyện tiên tiến giúp bạn tăng cường sức mạnh hiệu quả.",
  },
  {
    icon: <SelfImprovementIcon fontSize="large" className="text-white" />,
    title: "Yoga Cơ bản",
    description:
      "Chương trình này kết hợp yoga với bài tập tim mạch và sức mạnh để giúp giảm cân và cải thiện thể lực.",
  },
  {
    icon: <SportsKabaddiIcon fontSize="large" className="text-white" />,
    title: "Thể hình",
    description:
      "Đối với những người muốn tăng cơ và sức mạnh tổng thể, chương trình tập thể hình của chúng tôi là hoàn hảo.",
    highlight: true, // cái này để làm card màu đỏ cam nổi bật
  },
  {
    icon: <DirectionsRunIcon fontSize="large" className="text-white" />,
    title: "Giảm cân",
    description:
      "Chương trình giảm cân của chúng tôi được thiết kế để giúp bạn thay đổi lối sống bền vững.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-950 py-16 px-6 md:px-40">
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
          Những chương trình tốt nhất <br /> chúng tôi cung cấp cho bạn
        </h2>
        <p className="text-gray-400 text-lg">
          Chúng tôi cung cấp đa dạng các chương trình thể dục toàn diện được thiết kế riêng 
          cho từng cá nhân ở mọi cấp độ thể lực. Mục tiêu của chúng tôi là giúp bạn đạt được 
          các mục tiêu cụ thể và tối đa hóa kết quả.
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((program, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 flex flex-col justify-between shadow-md transition-all duration-300
              ${
                program.highlight
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            <div className="mb-4">{program.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {program.title}
            </h3>
            <p className="text-gray-300 text-sm flex-1">
              {program.description}
            </p>
            <button className="mt-4 text-white font-medium flex items-center gap-1 hover:underline">
              Chi tiết hơn →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import IntroSection from "../../../assets/introSection.png"; // đúng đường dẫn

const features = [
  {
    title: "Huấn luyện cá nhân",
    description:
      "Huấn luyện viên cá nhân của chúng tôi có thể giúp bạn lập kế hoạch tập luyện cá nhân và theo dõi tiến trình của bạn.",
  },
  {
    title: "Huấn luyện viên chuyên gia",
    description:
      "Đội ngũ huấn luyện viên của chúng tôi đều là những chuyên gia có chứng chỉ và kinh nghiệm trong lĩnh vực thể hình.",
  },
  {
    title: "Thời gian linh hoạt",
    description:
      "Chúng tôi cung cấp các lớp học và huấn luyện cá nhân vào nhiều thời điểm khác nhau trong ngày để phù hợp với lịch trình bận rộn của bạn.",
  },
];

const IntroductionSection = () => {
  return (
    <section className="bg-gray-900 py-20 px-6 md:px-40">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Tại sao mọi người nên chọn <br /> Dịch vụ Fitness KouDAn
          </h2>

          <div className="space-y-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircleIcon className="text-red-500 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition">
            Tham gia ngay hôm nay
          </button>
        </div>

        {/* Right Content */}
        <div className="relative flex justify-center">
          {/* Circle Background */}
          <div className="absolute w-72 h-72 bg-red-500 rounded-full top-10 -z-10"></div>

          {/* Main Image */}
          <img
            src={IntroSection} // thay ảnh huấn luyện viên vào đây
            alt="Trainer"
            className="rounded-lg relative z-10 w-[550px] object-cover"
          />

          {/* Heart Rate Card */}
          <div className="absolute top-30 right-20 bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
            <FavoriteIcon className="text-red-500" />
            <div>
              <p className="text-sm font-semibold text-gray-800">70 bpm</p>
              <p className="text-xs text-gray-500">Heart Rate</p>
            </div>
          </div>

          {/* Fat Burning Card */}
          <div className="absolute bottom-6 left-0 bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
            <LocalFireDepartmentIcon className="text-orange-500" />
            <div>
              <p className="text-sm font-semibold text-gray-800">24%</p>
              <p className="text-xs text-gray-500">Fat Burning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;

import React from "react";
import { Facebook, Instagram, Twitter, YouTube, LocationOn, Email, Phone } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Logo + intro */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Fitness KouDAn</h2>
          <p className="text-sm leading-relaxed">
            Chúng tôi cung cấp các chương trình thể dục tốt nhất để giúp bạn đạt được mục tiêu về sức khỏe và thể chất.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Truy cập nhanh</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-red-500">Trang chủ</a></li>
            <li><a href="#" className="hover:text-red-500">Về chúng tôi</a></li>
            <li><a href="#" className="hover:text-red-500">Dịch vụ</a></li>
            <li><a href="#" className="hover:text-red-500">Bài viết</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Liên hệ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <LocationOn fontSize="small" className="text-red-500" />
              97 Man Thien, Tp. HCM
            </li>
            <li className="flex items-center gap-2">
              <Email fontSize="small" className="text-red-500" />
              support@fitnessKouDAn.com
            </li>
            <li className="flex items-center gap-2">
              <Phone fontSize="small" className="text-red-500" />
              +84 123 456 789
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Liên hệ chúng tôi</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500"><Facebook /></a>
            <a href="#" className="hover:text-red-500"><Instagram /></a>
            <a href="#" className="hover:text-red-500"><Twitter /></a>
            <a href="#" className="hover:text-red-500"><YouTube /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Fitness KouDAn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

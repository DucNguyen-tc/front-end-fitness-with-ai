import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff} from "@mui/icons-material";
import { login } from "../../services/authService.js";
import SignUpForm from "./SignUpForm.jsx";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  if (isSignUp) {
    return <SignUpForm onSwitch={() => setIsSignUp(false)} />;
  }

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 5) {
      newErrors.password = "Mật khẩu phải từ 5 ký tự trở lên";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newErrors = {};
    try {
      await login(email, password);
      console.log("Đăng nhập thành công");
      setErrors({});
    }
    catch (error) {
      newErrors.general = error.response?.data?.message || "Tài khoản không tồn tại hoặc mật khẩu sai";
      setErrors(newErrors);
      return;
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-gray-900/90 backdrop-blur-lg">
      <h2 className="text-3xl font-bold text-red-500 text-center mb-6">
        Đăng Nhập
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          sx={{
            "& label": {
              color: "white",
            },
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "lightgray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: {
              color: "white",
            },
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          type={showPassword ? "text" : "password"}
          label="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff className="text-gray-400" />
                    ) : (
                      <Visibility className="text-gray-400" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& label": {
              color: "white",
            },
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "lightgray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: {
              color: "white",
            },
          }}
        />

        {errors.general && (
          <p className="text-red-400 text-sm">{errors.general}</p>
        )}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold text-lg shadow-md hover:bg-red-700 transition"
        >
          Đăng Nhập
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-6 text-center">
        Chưa có tài khoản?{" "}
        <button
          onClick={() => setIsSignUp(true)}
          className="text-red-500 font-semibold hover:underline"
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
}

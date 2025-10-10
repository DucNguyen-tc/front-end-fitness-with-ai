import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "../../services/authService.js";

export default function SignUpForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 4) {
      newErrors.password = "Mật khẩu phải từ 4 ký tự trở lên";
    }

    if (!username) {
      newErrors.username = "Vui lòng nhập tên người dùng";
    } else if (username.length < 3) {
      newErrors.username = "Tên người dùng phải từ 3 ký tự trở lên";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register(username, email, password);
      alert("Đăng kí thành công");
      setErrors({});
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "Đăng kí thất bại",
      });
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-gray-900/80 backdrop-blur-lg">
      <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
        Đăng Ký
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
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
          Đăng Ký
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-6 text-center">
        Đã có tài khoản?{" "}
        <button
          onClick={onSwitch}
          className="text-red-500 font-semibold hover:underline"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
}

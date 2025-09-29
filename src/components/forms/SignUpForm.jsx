import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";

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
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải từ 6 ký tự trở lên";
    }

    if (!username) {
      newErrors.username = "Vui lòng nhập tên người dùng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đăng ký thành công 🎉");
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-gray-900/80 backdrop-blur-lg">
      <h2 className="text-3xl font-bold text-red-500 mb-6">Đăng Ký</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          fullWidth
          variant="standard"
          label="Username"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Person className="text-gray-400" />
                </InputAdornment>
              ),
              sx: { color: "white" },
            },
            inputLabel: {
              sx: { color: "gray.300" },
            },
          }}
          sx={{
            "& .MuiInput-underline:before": { borderBottomColor: "gray" },
          }}
        />

        <TextField
          fullWidth
          variant="standard"
          label="Email"
          slotProps={{
            input: { sx: { color: "white" } },
            inputLabel: { sx: { color: "gray.300" } },
          }}
          sx={{
            "& .MuiInput-underline:before": { borderBottomColor: "gray" },
          }}
        />

        <TextField
          fullWidth
          variant="standard"
          type={showPassword ? "text" : "password"}
          label="Mật khẩu"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className="text-gray-400" />
                </InputAdornment>
              ),
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
              sx: { color: "white" },
            },
            inputLabel: {
              sx: { color: "gray.300" },
            },
          }}
          sx={{
            "& .MuiInput-underline:before": { borderBottomColor: "gray" },
          }}
        />

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

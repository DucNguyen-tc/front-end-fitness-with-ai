import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Lấy user từ localStorage khi load lại trang
  //   const savedUser = localStorage.getItem("user");
  //   console.log(savedUser);
  //   if (savedUser) {
  //     setUser(JSON.parse(savedUser));
  //   }
  //   setLoading(false);
  // }, []);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser && savedUser !== "undefined") {
    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Lỗi khi parse user từ localStorage:", error);
      localStorage.removeItem("user");
      setUser(null);
    }
  } else {
    setUser(null);
  }

  setLoading(false);
}, []);

  // Thêm hàm logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
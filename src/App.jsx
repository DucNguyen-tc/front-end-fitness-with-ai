import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/*" element={<PublicRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/user/*" element={<UserRoute />} />
        </Routes>
      </Router>
  );
}

export default App;
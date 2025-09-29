import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/*" element={<PublicRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
      </Router>
  );
}

export default App;
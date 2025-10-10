import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CssBaseline } from "@mui/material";
import App from './App.jsx';
import { UserProvider } from './stores/UserContext.jsx'; // ✅ import provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <UserProvider> {/* ✅ bọc App trong UserProvider */}
      <App />
    </UserProvider>
  </StrictMode>
);
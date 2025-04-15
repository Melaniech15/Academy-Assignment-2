import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/organisims/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { initializeAuth } from './stores/authStore';
import { initializeTheme } from './stores/themeStore';
import { updateTheme } from './utils/themeUtils';

const App = () => {
  useEffect(() => {
    // Initialize auth from localStorage
    initializeAuth();
    
    // Initialize theme and apply it
    const isDarkMode = initializeTheme();
    updateTheme(isDarkMode);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App; 
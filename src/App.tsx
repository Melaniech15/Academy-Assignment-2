import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider.tsx';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NewUserPage from './pages/NewUserPage';
import EditUserPage  from './pages/EditUserPage'; 
import Layout from './components/organisims/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { initializeAuth } from './stores/authStore';
import { initializeTheme } from './stores/themeStore';

initializeAuth();
initializeTheme();

function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/new" element={<NewUserPage />} />
              <Route path="/dashboard/edit/:id" element={<EditUserPage />} />
            </Route>
          </Route>
          
          {}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </QueryProvider>
  );
}

export default App;

import { useEffect } from 'react'; 
import { Outlet, useNavigate, Link } from 'react-router-dom'; 
import { useThemeStore } from '../../stores/themeStore'; 
import { useAuthStore } from '../../stores/authStore'; 
import { updateTheme, initializeThemeListeners } from '../../utils/themeUtils'; 
import React from 'react';

const Layout = () => {
  const { isDarkMode, toggleTheme, setDarkMode } = useThemeStore();
  const { logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    updateTheme(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const cleanup = initializeThemeListeners(setDarkMode);
    return cleanup;
  }, [setDarkMode]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen transition-colors  dark:bg-[#121212]">
      <nav className="bg-[var(--primary)] dark:bg-[#121212]/90 p-4 text-white flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-medium">User Management</h1>
        <div className="flex gap-4">
          <Link 
            to="/dashboard/new"
            className="bg-white dark:bg-gray-300 text-[var(--primary)] px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-300 transition-colors font-medium"
          >
            Create User
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 dark:bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-medium"
          >
            Logout
          </button>
          <button
            onClick={toggleTheme}
            className="bg-transparent text-white p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <main className="bg-white dark:bg-[#121212] mx-auto px-5 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
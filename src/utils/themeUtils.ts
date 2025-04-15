export const updateTheme = (isDarkMode: boolean) => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

export const initializeThemeListeners = (setDarkMode: (darkMode: boolean) => void) => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    setDarkMode(true);
    document.documentElement.classList.add('dark');
  } else {
    setDarkMode(false);
    document.documentElement.classList.remove('dark');
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    setDarkMode(e.matches);
    updateTheme(e.matches);
  };

  mediaQuery.addEventListener('change', handleSystemThemeChange);

  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  };
};

import { create } from 'zustand'

interface ThemeState {
  isDarkMode: boolean
  toggleTheme: () => void
  setDarkMode: (isDark: boolean) => void
}

// Create the theme store
export const useThemeStore = create<ThemeState>((set) => ({
  // Default to system preference for initial value
  isDarkMode: localStorage.getItem('theme') === 'dark' ||
    (localStorage.getItem('theme') === null && 
     window.matchMedia('(prefers-color-scheme: dark)').matches),

  toggleTheme: () => {
    set((state) => {
      const newMode = !state.isDarkMode
      localStorage.setItem('theme', newMode ? 'dark' : 'light')
      // Apply the dark class to the <html> element
      document.documentElement.classList.toggle('dark', newMode)
      return { isDarkMode: newMode }
    })
  },

  setDarkMode: (isDark: boolean) => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark)
    set({ isDarkMode: isDark })
  }
}))


export const initializeTheme = () => {
  const storedTheme = localStorage.getItem('theme')

  if (storedTheme === 'dark') {
    useThemeStore.getState().setDarkMode(true)
    return true
  } else if (storedTheme === 'light') {
    useThemeStore.getState().setDarkMode(false)
    return false
  } else {

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    useThemeStore.getState().setDarkMode(systemPrefersDark)
    return systemPrefersDark
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const isDarkMode = e.matches
  useThemeStore.getState().setDarkMode(isDarkMode)
})

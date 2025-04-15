import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the store without persist for now
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  login: (token) => {
    // Store token in localStorage manually
    localStorage.setItem('auth-token', token);
    set({ accessToken: token, isAuthenticated: true });
  },
  logout: () => {
    // Remove token from localStorage
    localStorage.removeItem('auth-token');
    set({ accessToken: null, isAuthenticated: false });
  },
}));

// Helper function to initialize auth state from localStorage
export const initializeAuth = () => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    useAuthStore.getState().login(token);
    return true;
  }
  return false;
};  
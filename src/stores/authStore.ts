import { create } from 'zustand';

interface AuthState {
  [x: string]: any;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  login: (accessToken) => {
    localStorage.setItem('auth-token', accessToken);
    set({ accessToken, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('auth-token');
    set({ accessToken: null, isAuthenticated: false });
  },
}));

export const initializeAuth = () => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    useAuthStore.getState().login(token);
    return true;
  }
  return false;
};

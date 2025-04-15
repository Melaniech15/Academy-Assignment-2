import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  login: (token) => {

    localStorage.setItem('auth-token', token);
    set({ accessToken: token, isAuthenticated: true });
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
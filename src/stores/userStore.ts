import { create } from 'zustand';

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: 'ACTIVE' | 'LOCKED';
  dateOfBirth: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setUsers: (users: User[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  setUsers: (users) => set({ users }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
})); 
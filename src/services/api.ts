import { User } from '../stores/userStore';

const BASE_URL = '/api';

interface LoginResponse {
  accessToken: string;
  expiresIn: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to login');
    }

    return response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function fetchUsers(searchTerm: string = ''): Promise<User[]> {
  // Get token directly from localStorage
  const accessToken = localStorage.getItem('auth-token');
  
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const url = searchTerm 
    ? `${BASE_URL}/users?search=${encodeURIComponent(searchTerm)}` 
    : `${BASE_URL}/users`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch users');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch users error:', error);
    throw error;
  }
}
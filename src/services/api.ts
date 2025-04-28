import { UserFormValues } from '../components/molecules/UserForm';
import { User, UserFormData } from '../types/user';

const BASE_URL = '/api';

interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

// Helper to get Authorization header
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('auth-token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper to get full headers
const getHeaders = (): HeadersInit => {
  return {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  };
};

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.result?.message || 'Failed to login');
    }

    const result = await response.json();
    return result.result.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function getUsers(searchTerm?: string): Promise<{ users: User[] }> {
  const url = searchTerm
    ? `${BASE_URL}/users?search=${encodeURIComponent(searchTerm)}`
    : `${BASE_URL}/users`;

  try {
    const response = await fetch(url, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.result?.message || 'Failed to fetch users');
    }

    const result = await response.json();
    return result.result.data;
  } catch (error) {
    console.error('Fetch users error:', error);
    throw error;
  }
}

export async function getUserById(id: string): Promise<{ user: User }> {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.result?.message || 'Failed to fetch user');
    }

    const result = await response.json();
    return result.result.data;
  } catch (error) {
    console.error('Fetch user error:', error);
    throw error;
  }
}

export async function createUser(userData: UserFormData): Promise<{ user: User }> {
  try {
    // Log the request payload for debugging
    console.log('Creating user with data:', userData);
    
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData), // Send userData directly without wrapping
    });

    // Log the full response for debugging
    console.log('Create user response status:', response.status);
    const responseData = await response.json();
    console.log('Create user response:', responseData);

    if (!response.ok) {
      throw new Error(responseData.message || responseData.error || 'Failed to create user');
    }

    return responseData.result?.data || responseData;
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
}

// api.ts - The updateUser function
export async function updateUser(id: string, userData: UserFormData): Promise<{ user: User }> {
  try {
    // Log the request payload for debugging
    console.log('Updating user with ID:', id);
    console.log('Update data:', userData);
    
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData), // Send userData directly without wrapping
    });

    // Log the full response for debugging
    console.log('Update user response status:', response.status);
    const responseData = await response.json();
    console.log('Update user response:', responseData);

    if (!response.ok) {
      throw new Error(responseData.message || responseData.error || 'Failed to update user');
    }

    return responseData.result?.data || responseData;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.result?.message || 'Failed to delete user');
    }

    return;
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
}

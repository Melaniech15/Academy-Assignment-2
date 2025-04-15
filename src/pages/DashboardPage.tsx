import React, { useEffect, useState } from 'react';
import UserCard from '../components/atoms/UserCard';
import { useUserStore } from '../stores/userStore';
import mockData from '../../mock/users.json';
import { User } from '../stores/userStore';

const DashboardPage = () => {
  const { users, setUsers, isLoading, setLoading, setError, error } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = 'User Management';
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const typedUsers: User[] = mockData.users.map((user) => ({
          ...user,
          status: user.status as 'ACTIVE' | 'LOCKED',
        }));

        setUsers(typedUsers);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [setUsers, setLoading, setError]);

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen text-gray-900 transition-colors">
      <main className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full sm:w-64 p-2 border border-gray-300 rounded bg-white dark:bg-white/10 text-gray-900 dark:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            Error: {error}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center p-6 bg-gray-200 rounded-lg">
            No users found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-white dark:bg-[#121212]"> {}
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UserCard from '../components/atoms/UserCard';
import { getUsers } from '../services/api';

const DashboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const navigate = useNavigate();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Set document title
  useEffect(() => {
    document.title = 'User Management';
  }, []);

  // Fetch users with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', debouncedSearchTerm],
    queryFn: () => getUsers(debouncedSearchTerm),
  });

  return (
    <div className="min-h-screen text-gray-900 transition-colors">
      <main className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-6">
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
            Error: {error instanceof Error ? error.message : 'An unknown error occurred'}
          </div>
        ) : data?.users.length === 0 ? (
          <div className="text-center p-6 bg-gray-200 dark:bg-gray-700 rounded-lg">
            No users found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.users.map((user: any) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
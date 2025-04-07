import React, { useState } from 'react';
import UserCard from './UserCard';
import { users as initialUsers } from '../data/users';

const UserGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState(initialUsers);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6">
      <div className="mb-8 mt-6">
        <input
          type="text"
          placeholder="Search users..."
          className="w-56 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserGrid;
import React from 'react';
import { User } from '../../stores/userStore';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const getInitials = () => {
    const last = user.lastName ? user.lastName.charAt(0) : '';
    return `${user.firstName.charAt(0)}${last}`;
  };

  return (
    <div className="bg-white dark:bg-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 h-67  flex flex-col font-roboto">
      <div className="flex justify-center mb-1.5 ">
        <div className="w-20 h-20 rounded-full bg-[var(--primary)] text-white dark:test-white flex items-center justify-center text-2xl font-bold">
          {getInitials()}
        </div>
      </div>

      <div className="text-left mb-3">
        <div className="UserName mb-0.5">
          <h2 className="text-lg font-bold dark:text-[var(--primary)]">{`${user.firstName} ${user.lastName ?? ''}`}</h2> 
        </div>
        <div className="text-sm text-gray-500 dark:text-white">
          <p className="mb-0.5">Email: {user.email}</p>
          <p className="mb-0.5">Status: {user.status}</p>
          <p className="mb-2">Date of Birth: {user.dateOfBirth}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="bg-[var(--primary)] text-white px-4 py-1.5 rounded hover:bg-[#2841B0] transition-colors">
          Edit
        </button>
        <button className="bg-red-500 dark:bg-red-700 text-white px-4 py-1.5 rounded hover:bg-red-600 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;

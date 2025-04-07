import React from 'react';

const UserCard = ({ user }) => {
  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col font-roboto">
      {/* Centered Initials */}
      <div className="flex justify-center mb-1.5">
        <div className="w-20 h-20 rounded-full bg-[#3251D0] text-white flex items-center justify-center text-2xl font-bold">
          {getInitials()}
        </div>
      </div>

      {/* Left-aligned Name and Info */}
      <div className="text-left mb-3">
        <div className='UserName mb-0.5'>
          <h2 className="text-lg font-bold">{`${user.firstName} ${user.lastName}`}</h2>
        </div>
        <div className="text-sm text-gray-500">
          <p className="mb-0.5">Email: {user.email}</p>
          <p className="mb-0.5">Status: {user.status}</p>
          <p className="mb-2">Date of Birth: {user.dateOfBirth}</p>
        </div>
      </div>

      {/* Right-aligned Buttons */}
      <div className="flex justify-end gap-3">
        <button className="bg-[#3251D0] text-white px-4 py-1.5 rounded hover:bg-[#2841B0] transition-colors flex items-center justify-center text-sm">
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition-colors flex items-center justify-center text-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
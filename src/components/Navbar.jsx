import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#3251D0] p-4 text-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-medium">User Management</h1>
      <div className="flex gap-4">
        <button className="bg-white text-[#3251D0] px-4 py-2 rounded-md hover:bg-[#E5E7EB] transition-colors font-medium">
          Create User
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-medium">
          Logout
        </button>
        <button className="bg-transparent text-white p-2 rounded-full hover:bg-blue-600 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
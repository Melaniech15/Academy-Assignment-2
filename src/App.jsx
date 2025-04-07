import React from 'react';
import Navbar from './components/Navbar';
import UserGrid from './components/UserGrid';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <UserGrid />
      </main>
    </div>
  );
}

export default App;
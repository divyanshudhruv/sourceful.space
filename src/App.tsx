import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
}

export default App;
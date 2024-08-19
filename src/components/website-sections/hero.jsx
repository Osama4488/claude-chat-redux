import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative bg-cover bg-center bg-no-repeat h-screen" style={{ backgroundImage: "url('https://via.placeholder.com/1500')" }}>
      {/* Transparent Header */}
      <header className="absolute top-0 left-0 right-0 bg-transparent p-6">
        <nav className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Your Logo</div>
          <div>
            <a href="#" className="text-white px-4 py-2">Home</a>
            <a href="#" className="text-white px-4 py-2">About</a>
            <a href="#" className="text-white px-4 py-2">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
        <p className="text-lg mb-8">Explore the world with our exclusive tours and travel packages.</p>
        <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300">Get Started</a>
      </div>
    </div>
  );
};

export default HeroSection;

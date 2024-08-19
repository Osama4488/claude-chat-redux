import React from 'react';

const HeroSection = () => {
  return (
    <div className="flex h-screen bg-white container">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center  p-8">
        <div className=" ">
          <h1 className="text-4xl font-bold mb-4">Discover Your Next Adventure</h1>
          <p className="text-lg mb-8">Explore the world with our exclusive tours and travel packages.</p>
          <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300">
            Get Started
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center">
        <img src="https://via.placeholder.com/400" alt="Placeholder" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default HeroSection;

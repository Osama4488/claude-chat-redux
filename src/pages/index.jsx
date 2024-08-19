import React from 'react';
import HeroSection from '../components/website-sections/hero'; // Adjust the path as needed

const YourComponent = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">


<HeroSection />
      {/* Hero Section */}
    

      {/* Features Section */}
      <section className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Feature One</h2>
            <p className="text-gray-600">Description of feature one goes here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Feature Two</h2>
            <p className="text-gray-600">Description of feature two goes here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Feature Three</h2>
            <p className="text-gray-600">Description of feature three goes here.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 text-white py-4 w-full text-center">
        <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default YourComponent;

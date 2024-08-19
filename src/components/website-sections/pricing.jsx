// PricingComponent.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';

const PricingComponent = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Our Pricing</h2>
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setIsMonthly(true)}
            className={`px-4 py-2 font-semibold rounded-l-lg ${isMonthly ? 'bg-orange-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-4 py-2 font-semibold rounded-r-lg ${!isMonthly ? 'bg-orange-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            Yearly
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Basic Plan</h3>
            <p className="text-gray-600 mb-4">Perfect for individuals looking to get started.</p>
            <p className="text-2xl font-bold mb-4">
              {isMonthly ? '$19/month' : '$199/year'}
            </p>
            <button
              style={{ backgroundColor: '#FF5722' }} // Orange background
              className="text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Standard Plan</h3>
            <p className="text-gray-600 mb-4">Ideal for small teams and growing businesses.</p>
            <p className="text-2xl font-bold mb-4">
              {isMonthly ? '$39/month' : '$399/year'}
            </p>
            <button
              style={{ backgroundColor: '#FF5722' }} // Orange background
              className="text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
            <p className="text-gray-600 mb-4">For businesses that need advanced features and support.</p>
            <p className="text-2xl font-bold mb-4">
              {isMonthly ? '$59/month' : '$599/year'}
            </p>
            <button
              style={{ backgroundColor: '#FF5722' }} // Orange background
              className="text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;

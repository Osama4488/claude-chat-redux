import React, { useState } from 'react';
import Button from '@mui/material/Button';

const PricingComponent = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div className="container md:px-[100px] px-4 py-16">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <span className="text-purple-600">Pricing Plans</span><br />
          You can afford
        </h2>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <button
            onClick={() => setIsMonthly(true)}
            className={`px-4 py-2 font-semibold rounded-lg ${isMonthly ? 'bg-[#FF2210] text-white' : 'bg-gray-300 text-black'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-4 py-2 font-semibold rounded-lg ${!isMonthly ? 'bg-[#FF2210] text-white' : 'bg-gray-300 text-black'}`}
          >
            Yearly
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Basic Plan</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">Perfect for individuals looking to get started.</p>
            <ul className="list-disc list-inside mb-4 text-gray-700 text-sm sm:text-base">
              <li>1 User</li>
              <li>10 Projects</li>
              <li>Email Support</li>
            </ul>
            <p className="text-lg sm:text-2xl font-bold mb-4">
              {isMonthly ? '$19/month' : '$199/year'}
            </p>
            <button
              className="text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 bg-[#FF2210] w-full"
            >
              Sign Up
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Standard Plan</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">Ideal for small teams and growing businesses.</p>
            <ul className="list-disc list-inside mb-4 text-gray-700 text-sm sm:text-base">
              <li>5 Users</li>
              <li>50 Projects</li>
              <li>Priority Support</li>
            </ul>
            <p className="text-lg sm:text-2xl font-bold mb-4">
              {isMonthly ? '$39/month' : '$399/year'}
            </p>
            <button
              className="text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 bg-[#FF2210] w-full"
            >
              Sign Up
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Premium Plan</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">For businesses that need advanced features and support.</p>
            <ul className="list-disc list-inside mb-4 text-gray-700 text-sm sm:text-base">
              <li>Unlimited Users</li>
              <li>Unlimited Projects</li>
              <li>24/7 Support</li>
            </ul>
            <p className="text-lg sm:text-2xl font-bold mb-4">
              {isMonthly ? '$59/month' : '$599/year'}
            </p>
            <button
              className="text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 bg-[#FF2210] w-full"
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

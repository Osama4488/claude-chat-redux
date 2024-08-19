import React from 'react';
import Link from 'next/link';

const YourComponent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Website Under Maintenance
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          We are currently performing scheduled maintenance. We will be back shortly.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          In the meantime, you can check out our{' '}
          <Link href="/login">
            <a className="text-blue-500 hover:underline">app</a>
          </Link>.
        </p>
        <p className="text-sm md:text-base lg:text-lg text-gray-600">
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
};

export default YourComponent;

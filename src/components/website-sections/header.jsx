import React from 'react';

const Header = () => {
  return (
    <header className="bg-transparent w-full py-4 flex items-center justify-between">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="text-black text-2xl font-bold">
          <a href="#">Your Logo</a>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <a href="#" className="text-black text-lg hover:text-orange-500">
            Home
          </a>
          <a href="#" className="text-black text-lg hover:text-orange-500">
            About
          </a>
          <a href="#" className="text-black text-lg hover:text-orange-500">
            Services
          </a>
          <a href="#" className="text-black text-lg hover:text-orange-500">
            Contact
          </a>
        </nav>

        {/* Sign Up and Login */}
        <div className="flex space-x-4">
          <a
            href="/signup"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
          >
            Sign Up
          </a>
          <a href="/login" className="text-black text-lg hover:text-orange-500">
            Login
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

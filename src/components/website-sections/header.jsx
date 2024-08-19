import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-transparent w-full py-4 flex items-center justify-between">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="text-black text-2xl font-bold">
          <Link legacyBehavior href="/">
            <a>Your Logo</a>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link legacyBehavior href="/">
            <a className="text-black text-lg hover:text-orange-500">Home</a>
          </Link>
          <Link legacyBehavior href="/about">
            <a className="text-black text-lg hover:text-orange-500">About</a>
          </Link>
          <Link legacyBehavior href="/services">
            <a className="text-black text-lg hover:text-orange-500">Services</a>
          </Link>
          <Link legacyBehavior href="/contact">
            <a className="text-black text-lg hover:text-orange-500">Contact</a>
          </Link>
        </nav>

        {/* Sign Up and Login */}
        <div className="flex space-x-4">
          <Link legacyBehavior href="/signup">
            <a className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
              Sign Up
            </a>
          </Link>
          <Link legacyBehavior href="/login">
            <a className="text-black text-lg hover:text-orange-500">Login</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

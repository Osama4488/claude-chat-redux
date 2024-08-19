import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-transparent w-full py-4 flex items-center justify-between">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="text-black text-2xl font-bold">
          <Link href="/">
            <a>Your Logo</a>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link href="/">
            <a className="text-black text-lg hover:text-orange-500">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-black text-lg hover:text-orange-500">About</a>
          </Link>
          <Link href="/services">
            <a className="text-black text-lg hover:text-orange-500">Services</a>
          </Link>
          <Link href="/contact">
            <a className="text-black text-lg hover:text-orange-500">Contact</a>
          </Link>
        </nav>

        {/* Sign Up and Login */}
        <div className="flex space-x-4">
          <Link href="/signup">
            <a className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
              Sign Up
            </a>
          </Link>
          <Link href="/login">
            <a className="text-black text-lg hover:text-orange-500">Login</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice"; // Adjust the import path as necessary
import { useRouter } from "next/router";
function Header() {
  const router= useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login")
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          <Link className="hover:text-gray-400" href="/">
            MyWebsite
          </Link>
        </div>

        <nav className="hidden md:flex space-x-4">
          <Link className="hover:text-gray-400" href="/">
            Home
          </Link>

          <Link className="hover:text-gray-400" href="/about">
            About
          </Link>

          <Link className="hover:text-gray-400" href="/services">
            Services
          </Link>

          <Link className="hover:text-gray-400" href="/contact">
            Contact
          </Link>
          <button onClick={handleLogout} className="hover:text-gray-400">
            Logout
          </button>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-gray-700">
          <Link className="hover:text-gray-400" href="/">
            Home
          </Link>

          <Link className="hover:text-gray-400" href="/about">
            About
          </Link>

          <Link className="hover:text-gray-400" href="/services">
            Services
          </Link>

          <Link className="hover:text-gray-400" href="/contact">
            Contact
          </Link>
          <button onClick={handleLogout} className="hover:text-gray-400">
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;

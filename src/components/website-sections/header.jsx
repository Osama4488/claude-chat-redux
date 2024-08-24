import React, { useState } from 'react';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../Button';

const Header = () => {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-transparent w-full py-4 flex items-center justify-between">
      <div className="container flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-black text-2xl font-bold">
          <Link legacyBehavior href="/">
            <a>Your Logo</a>
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 right-0 md:top-auto md:left-auto md:right-auto bg-white md:bg-transparent p-4 md:p-0 w-full md:w-auto`}
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <Link legacyBehavior href="/">
              <a className="header-links">Home</a>
            </Link>

            <Button
              aria-controls="contact-menu"
              aria-haspopup="true"
              onClick={handleClick2}
              className="flex items-center space-x-1 text-black text-lg hover:text-orange-500"
            >
              <span className="header-links">Contact</span>
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="contact-menu"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleClose2}
              PaperProps={{
                style: {
                  backgroundColor: '#FF2210',
                  color: '#fff',
                },
              }}
            >
              <MenuItem onClick={handleClose2} className="same-size-link">Contact Option 1</MenuItem>
              <MenuItem onClick={handleClose2} className="same-size-link">Contact Option 2</MenuItem>
              <MenuItem onClick={handleClose2} className="same-size-link">Contact Option 3</MenuItem>
            </Menu>

            <Link legacyBehavior href="/about">
              <a className="header-links">About</a>
            </Link>

            <Button
              aria-controls="services-menu"
              aria-haspopup="true"
              onClick={handleClick1}
              className="flex items-center space-x-1 text-black text-lg hover:text-orange-500"
            >
              <span className="text-lg">Services</span>
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="services-menu"
              anchorEl={anchorEl1}
              keepMounted
              open={Boolean(anchorEl1)}
              onClose={handleClose1}
              PaperProps={{
                style: {
                  backgroundColor: '#FF2210',
                  color: '#fff',
                },
              }}
            >
              <MenuItem onClick={handleClose1} className="same-size-link">Service 1</MenuItem>
              <MenuItem onClick={handleClose1} className="same-size-link">Service 2</MenuItem>
              <MenuItem onClick={handleClose1} className="same-size-link">Service 3</MenuItem>
            </Menu>
          </div>

          {/* Mobile Sign Up and Login */}
          <div className="flex flex-col space-y-4 mt-4 md:hidden">
            <Link legacyBehavior href="/login">
              <a className="border-2 border-orange-500 text-black bg-white py-2 px-4 rounded-[15px] hover:bg-orange-100 transition duration-300">
                Login
              </a>
            </Link>
            <CustomButton href="/signup">
              Get started for free
            </CustomButton>
          </div>
        </nav>

        {/* Desktop Sign Up and Login */}
        <div className="hidden md:flex space-x-4">
          <Link legacyBehavior href="/login">
            <a className="border-2 border-orange-500 text-black bg-white py-2 px-4 rounded-[15px] hover:bg-orange-100 transition duration-300">
              Login
            </a>
          </Link>
          <CustomButton href="/signup">
            Get started for free
          </CustomButton>
        </div>
      </div>
    </header>
  );
};

export default Header;

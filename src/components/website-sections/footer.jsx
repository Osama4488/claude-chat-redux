import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0C1025] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul>
              <li><a href="#" className="hover:text-orange-500">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500">Press</a></li>
              <li><a href="#" className="hover:text-orange-500">Blog</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul>
              <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-bold mb-4">Products</h4>
            <ul>
              <li><a href="#" className="hover:text-orange-500">Product 1</a></li>
              <li><a href="#" className="hover:text-orange-500">Product 2</a></li>
              <li><a href="#" className="hover:text-orange-500">Product 3</a></li>
              <li><a href="#" className="hover:text-orange-500">Product 4</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <ul>
              <li><a href="#" className="hover:text-orange-500">Facebook</a></li>
              <li><a href="#" className="hover:text-orange-500">Twitter</a></li>
              <li><a href="#" className="hover:text-orange-500">Instagram</a></li>
              <li><a href="#" className="hover:text-orange-500">LinkedIn</a></li>
            </ul>
          </div>

          {/* Logo and Additional Information */}
          <div className="flex flex-col items-center md:items-end">
            <img src="https://via.placeholder.com/150" alt="Dummy Logo" className="mb-4" />
            <p className="mb-4 text-center md:text-right">Your Company&apos;s mission statement or any other information you want to include here.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-orange-500"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white hover:text-orange-500"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white hover:text-orange-500"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white hover:text-orange-500"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

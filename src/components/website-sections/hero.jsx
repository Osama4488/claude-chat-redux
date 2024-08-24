import React from 'react';
import { FaLock, FaUserCircle, FaShieldAlt } from 'react-icons/fa';
import CustomButton from '../Button';

const HeroSection = () => {
  return (
  <>
    <div className="flex flex-col md:flex-row bg-white container pt-[50px] md:pt-[100px]">
      {/* Left Section */}
      <div className="w-full md:w-[60%] flex flex-col justify-start p-4 md:p-8">
        <h1 className="text-[30px] md:text-[45px] font-normal mb-4 leading-[35px] md:leading-[50px] text-[#131A3A] text-left">
          The AI code assistant that <span className="text-blue-500">you</span> control
        </h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-8">
          {/* Item 1 */}
          <div className="flex items-center">
            <FaLock className="mr-2 text-2xl text-[#131A3A]" />
            <span className="text-lg text-[#131A3A]">Private</span>
          </div>
          {/* Item 2 */}
          <div className="flex items-center">
            <FaUserCircle className="mr-2 text-2xl text-[#131A3A]" />
            <span className="text-lg text-[#131A3A]">Personalized</span>
          </div>
          {/* Item 3 */}
          <div className="flex items-center">
            <FaShieldAlt className="mr-2 text-2xl text-[#131A3A]" />
            <span className="text-lg text-[#131A3A]">Protected</span>
          </div>
        </div>
        <p className="text-base md:text-lg mb-8">
          Tabnines AI code assistant streamlines code generation and automates mundane tasks so developers can spend more time on the work they love.
        </p>
        <CustomButton href="/signup">
          Get started for free
        </CustomButton>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[40%] flex justify-center md:justify-start items-center md:items-start mb-8 md:mb-0">
        <img src="/img/hero-img.png" alt="Placeholder" className="max-w-full h-auto" />
      </div>
    </div>
   <div className='container mt-[50px]'>
   <img src="/img/hero-btm-img.png" alt="Placeholder" className="max-w-full h-auto" />
   </div>
  </>
  );
};

export default HeroSection;

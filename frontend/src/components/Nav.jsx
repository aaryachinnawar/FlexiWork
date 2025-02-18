import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import logo from '../assets/logo.svg'; // Update path to your logo



const Nav = () => {

  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[1402px] h-[70px] bg-[#F8F2E4] rounded-[6px] flex items-center justify-between px-8 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        {/* <img 
          className="w-[68px] h-10 object-contain" 
          alt="Logo" 
          src={logo} 
        /> */}
        <span className="font-Abhaya_Libre_ExtraBold text-[32px] tracking-[-1.28px] text-black">
          FreeLanceNeo
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-16 absolute left-1/2 -translate-x-1/2">
        <span className="font-Akatab-ExtraBold font-extrabold text-xl text-black cursor-pointer" onClick={() => navigate('/')}>
          HOME
        </span>
        <span className="font-Akatab-ExtraBold font-extrabold text-xl text-black cursor-pointer">
          FIND TALENT
        </span>
        <span className="font-Akatab-ExtraBold font-extrabold text-xl text-black cursor-pointer">
          FIND WORK
        </span>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-8">
        <button className="font-Akatab-ExtraBold font-extrabold text-xl text-[#71A894]" onClick={() => navigate('/login')}>
          LOGIN
        </button>
        <button className="w-[140px] h-[50px] bg-[#71A894] rounded-lg flex items-center justify-center font-Akatab-ExtraBold font-extrabold text-xl text-white hover:bg-hover-green transition-colors"
         onClick={() => navigate('/signup')}>
          SIGNUP
        </button>
      </div>
    </div>
  );
};

export default Nav;
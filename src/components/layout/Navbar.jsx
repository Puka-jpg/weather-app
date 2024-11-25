import React from 'react';
import Logo from '../ui/Logo';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 hidden md:block">
            Weather Dashboard
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
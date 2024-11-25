import React from 'react';
import { Cloud, Sun } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10 animate-pulse">
        <Sun className="absolute text-yellow-400 w-8 h-8" />
        <Cloud className="absolute text-blue-500 w-10 h-10 transform translate-x-1 translate-y-1" />
      </div>
      <span className="text-xl font-semibold text-gray-800">WeatherApp</span>
    </div>
  );
};

export default Logo;
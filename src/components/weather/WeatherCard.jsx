import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, X, Thermometer } from 'lucide-react';

const WeatherCard = ({ city, temperature, condition, humidity, windSpeed, onDelete }) => {
  // Get background color based on temperature
  const getTemperatureColor = (temp) => {
    if (temp >= 80) return 'from-orange-400 to-red-500';
    if (temp >= 70) return 'from-yellow-400 to-orange-500';
    if (temp >= 60) return 'from-green-400 to-teal-500';
    return 'from-blue-400 to-blue-600';
  };

  // Enhanced weather icon logic
  const getWeatherIcon = (condition) => {
    const iconProps = {
      className: "w-16 h-16",
      strokeWidth: 1.5
    };

    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun {...iconProps} className={`${iconProps.className} text-yellow-400`} />;
      case 'rainy':
      case 'rain':
        return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-400`} />;
      default:
        return <Cloud {...iconProps} className={`${iconProps.className} text-gray-400`} />;
    }
  };

  return (
    <div className="relative w-80 transform transition-all duration-300 hover:scale-105">
      {/* Main Card */}
      <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${getTemperatureColor(temperature)} p-6 text-white`}>
          {/* Delete Button */}
          <button 
            onClick={onDelete}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex justify-between items-center">
            {/* City Name */}
            <div>
              <h2 className="text-2xl font-bold mb-1">{city}</h2>
              <p className="text-sm opacity-90">{condition}</p>
            </div>
            {/* Weather Icon */}
            {getWeatherIcon(condition)}
          </div>
        </div>

        {/* Temperature Display */}
        <div className="p-6">
          <div className="flex justify-center items-center mb-6">
            <Thermometer className="w-8 h-8 text-gray-400 mr-2" />
            <span className="text-5xl font-bold text-gray-700">
              {temperature}°F
            </span>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-semibold">{humidity}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <Wind className="w-5 h-5 mr-2 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Wind</p>
                <p className="font-semibold">{windSpeed} mph</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
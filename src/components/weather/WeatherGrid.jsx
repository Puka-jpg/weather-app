import React from 'react';
import WeatherCard from './WeatherCard';
import LocalWeather from './LocalWeather';

const WeatherGrid = ({ cities, onDeleteCity }) => {
  return (
    <div className="mt-8">
      {/* Local Weather Section */}
      <div className="mb-8">
        <LocalWeather />
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {cities.map((weather, index) => (
          <WeatherCard
            key={index}
            {...weather}
            onDelete={() => onDeleteCity(weather.city)}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherGrid;
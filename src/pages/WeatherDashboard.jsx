import React, { useState, useEffect } from 'react';
import WeatherGrid from '../components/weather/WeatherGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AddCitySection from '../components/weather/AddCitySection';

const WeatherDashboard = () => {
  const [citiesWeather, setCitiesWeather] = useState(() => {
    const savedCities = localStorage.getItem('cities');
    return savedCities ? JSON.parse(savedCities) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(citiesWeather));
  }, [citiesWeather]);

  const fetchWeatherData = async (cityName) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=imperial`
      );

      if (!response.ok) {
        throw new Error(response.status === 404 ? 'City not found' : 'Failed to fetch weather data');
      }

      const data = await response.json();
      return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed)
      };
    } catch (error) {
      throw error;
    }
  };

  const handleAddCity = async (cityName) => {
    try {
      setIsLoading(true);
      setError(null);

      if (citiesWeather.some(city => city.city.toLowerCase() === cityName.toLowerCase())) {
        throw new Error('City already exists');
      }

      const weatherData = await fetchWeatherData(cityName);
      setCitiesWeather(prev => [...prev, weatherData]);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = (cityToDelete) => {
    setCitiesWeather(prevCities => 
      prevCities.filter(city => city.city !== cityToDelete)
    );
  };

  return (
    <>
      <div className="mb-6">
        <AddCitySection onAddCity={handleAddCity} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <LoadingSpinner size="medium" />
            <span className="text-gray-700">Loading weather data...</span>
          </div>
        </div>
      )}

      <WeatherGrid 
        cities={citiesWeather} 
        onDeleteCity={deleteCity}
        isLoading={isLoading}
      />
    </>
  );
};

export default WeatherDashboard;
import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

const LocalWeather = () => {
  const [localWeather, setLocalWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLocalWeather = async (position) => {
    try {
      const { latitude, longitude } = position.coords;
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`
      );
      
      if (!response.ok) throw new Error('Weather data fetch failed');
      
      const data = await response.json();
      setLocalWeather({
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed)
      });
    } catch (err) {
      setError('Unable to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      getLocalWeather,
      (err) => {
        console.error('Geolocation Error:', err);
        let errorMessage = 'Location access denied. Please enable location services and refresh.';
        
        switch (err.code) {
          case 1:
            errorMessage = 'Please enable location access in your browser settings.';
            break;
          case 2:
            errorMessage = 'Unable to determine your location. Please try again.';
            break;
          case 3:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Initial location request
  useEffect(() => {
    requestLocation();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <div className="flex flex-col items-center justify-center h-32">
          <LoadingSpinner size="medium" />
          <span className="mt-2 text-gray-600">Getting your location...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="text-red-500 w-8 h-8 mb-2" />
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button 
              onClick={requestLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.open('https://support.brave.com/hc/en-us/articles/360018205431-How-do-I-change-site-permissions-', '_blank')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors w-full"
            >
              How to Enable Location
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!localWeather) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-blue-500" />
        <h2 className="text-xl font-semibold">Your Local Weather</h2>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-bold text-gray-800">{localWeather.temperature}°F</p>
          <p className="text-gray-600">{localWeather.city}</p>
          <p className="text-gray-500">{localWeather.condition}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Humidity: {localWeather.humidity}%</p>
          <p className="text-gray-600">Wind: {localWeather.windSpeed} mph</p>
        </div>
      </div>
    </div>
  );
};

export default LocalWeather;
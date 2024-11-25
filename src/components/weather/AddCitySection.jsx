import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

const AddCitySection = ({ onAddCity }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [cityName, setCityName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const cities = [
    "New York", "London", "Tokyo", "Paris", "Dubai",
    "Singapore", "Hong Kong", "Los Angeles", "Chicago",
    "Toronto", "Sydney", "Mumbai", "Delhi", "Berlin",
    "Madrid", "Rome", "Amsterdam", "Moscow", "Beijing",
    "Seoul"
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCityName(value);

    if (value.trim()) {
      const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCity = (city) => {
    setCityName(city);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      setLoading(true);
      await onAddCity(cityName.trim());
      setCityName('');
      setSuggestions([]);
      setShowAddForm(false);
      setLoading(false);
    }
  };
  return (
    <div className="relative z-50"> {/* Added z-50 to parent */}
      <button 
        onClick={() => setShowAddForm(!showAddForm)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full
          transition-all duration-300
          ${showAddForm 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
          } text-white
        `}
      >
        {loading ? (
          <LoadingSpinner size="small" />
        ) : showAddForm ? (
          <>
            <X size={20} />
            <span>Cancel</span>
          </>
        ) : (
          <>
            <Plus size={20} />
            <span>Add City</span>
          </>
        )}
      </button>

      {/* Search Form - Repositioned */}
      {showAddForm && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl" 
             style={{ position: 'absolute', top: '100%', zIndex: 1000 }}>
          <div className="fixed top-0 left-0 w-full h-full bg-transparent" onClick={() => setShowAddForm(false)} />
          <form onSubmit={handleSubmit} className="p-3 relative">
            <div className="relative">
              <input
                type="text"
                value={cityName}
                onChange={handleInputChange}
                placeholder="Enter city name..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-blue-400 
                          focus:border-transparent"
                autoFocus
              />
              <Search 
                className="absolute left-3 top-2.5 text-gray-400" 
                size={20} 
              />
              
              {cityName && (
                <button
                  type="button"
                  onClick={() => setCityName('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="mt-2 border-t max-h-48 overflow-y-auto bg-white relative">
                {suggestions.map((city, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors
                              flex items-center gap-2"
                    onClick={() => handleSelectCity(city)}
                  >
                    <Search size={16} className="text-gray-400" />
                    <span className="text-gray-700">{city}</span>
                  </div>
                ))}
              </div>
            )}

            {cityName && (
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg
                         hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              >
                {loading ? <LoadingSpinner size="small" /> : 'Add City'}
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCitySection;
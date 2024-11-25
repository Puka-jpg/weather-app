import React from 'react';
import Layout from './components/layout/Layout';
import WeatherDashboard from './pages/WeatherDashboard';

const App = () => {
  // Create a reference to WeatherDashboard
  const dashboardRef = React.useRef();

  // Function to pass to Layout
  const handleAddCity = async (cityName) => {
    if (dashboardRef.current) {
      return dashboardRef.current.handleAddCity(cityName);
    }
  };

  return (
    <Layout onAddCity={handleAddCity}>
      <WeatherDashboard ref={dashboardRef} />
    </Layout>
  );
};

export default App;
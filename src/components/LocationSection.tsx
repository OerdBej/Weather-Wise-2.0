import React from "react";
import { useLocation } from "../context/LocationContext";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
// Sun icon removed as requested
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import AirIcon from "@mui/icons-material/Air";
import { useNavigate } from "react-router-dom";

const LocationSection: React.FC = () => {
  const { city, cityError, errorMessage, isLoading, setCity, searchLocation } = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchLocation();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  // Weather particles animation removed as requested
  // Focus animation now uses CSS :focus-within instead of React state

  // Focus animation for search box - using CSS :focus-within instead of state

  // Navigate to features
  const navigateToFeature = (path: string) => {
    navigate(path);
  };

  return (
    <div className="location-section">
      <div className="location-header">
        <h1>Weather Wise</h1>
        <p>Get accurate weather forecasts and activity recommendations tailored to your favorite sports</p>
      </div>
      <form onSubmit={handleSubmit} className="searchBox">
        <input
          className="searchInput"
          value={city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}

          placeholder="Enter your city (e.g. Berlin, London, New York)"
          disabled={isLoading}
        />
        <button 
          className="searchButton" 
          onClick={searchLocation} 
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
        </button>
      </form>
      
      {cityError && (
        <div className="location-error">
          <p className="error-message">{errorMessage || "There was a problem finding your location, please try again!"}</p>
        </div>
      )}
      
      <div className="features-container">
        <div className="feature-card" onClick={() => navigateToFeature("/sport")}>
          <DirectionsRunIcon className="feature-icon" />
          <h3 className="feature-title">Sport Recommendations</h3>
          <p className="feature-desc">Get personalized recommendations for your favorite outdoor activities based on current weather conditions.</p>
        </div>
        <div className="feature-card" onClick={() => navigateToFeature("/current-weather")}>
          <DeviceThermostatIcon className="feature-icon" />
          <h3 className="feature-title">Detailed Weather</h3>
          <p className="feature-desc">View comprehensive weather data including temperature, humidity, wind speed, and more.</p>
        </div>
        <div className="feature-card" onClick={() => navigateToFeature("/rating")}>
          <AirIcon className="feature-icon" />
          <h3 className="feature-title">Air Quality</h3>
          <p className="feature-desc">Check real-time air quality indexes to plan your outdoor activities safely.</p>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;

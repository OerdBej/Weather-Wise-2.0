import React, { useEffect } from "react";
import { useWeather } from "../context/WeatherContext";
import { sportsOptions } from "../utils/sportsSelector";
import "./SelectSport.css";

const SelectSport: React.FC = () => {
  const { selectSport, sportSelected } = useWeather();
  
  // Force immediate navigation to rating when component loads if we already have a sport
  useEffect(() => {
    // Always set a default sport
    const defaultSport = localStorage.getItem('selectedSport') || 'Cycling';
    localStorage.setItem('selectedSport', defaultSport);
    
    // Check if we have location data stored - we need this for the rating to work
    const savedLocation = localStorage.getItem('weatherLocation');
    if (!savedLocation) {
      console.error('No location data found! Cannot calculate ratings');
      // We could redirect to home here, but let's allow manual sport selection
    }
  }, []);

  // Handle sport selection with explicit console logging
  const handleSportSelect = (sportName: string) => {
    console.log('Sport selected:', sportName);
    // This selectSport function will calculate ratings and navigate to the rating page
    // Ensure we have a location first
    const savedLocation = localStorage.getItem('weatherLocation');
    if (!savedLocation) {
      console.error('No location data found! Cannot calculate ratings');
      alert('Please select a location first on the home page');
      return;
    }
    
    // This will calculate ratings and navigate to the rating page
    selectSport(sportName);
  };

  return (
    <div className="select-sport-container">
      <h1 className="select-sport-title">Choose your sport</h1>
      
      <div className="sport-icons-container">
        {sportsOptions.map((sport, i) => (
          <div 
            className={`sport-icon-wrapper ${sport.name === sportSelected ? 'active' : ''}`} 
            key={i}
            onClick={() => handleSportSelect(sport.name)}
          >
            <div className="sport-icon">
              <img src={sport.img} alt={sport.name} />
            </div>
            <p className="sport-name">{sport.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectSport;

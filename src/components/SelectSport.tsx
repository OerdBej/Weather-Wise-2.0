import React from "react";
import { useWeather } from "../context/WeatherContext";
import { sportsOptions } from "../utils/sportsSelector";
import "./SelectSport.css";

const SelectSport: React.FC = () => {
  const { selectSport, sportSelected } = useWeather();

  return (
    <div className="select-sport-container">
      <h1 className="select-sport-title">Choose your sport</h1>
      
      <div className="sport-icons-container">
        {sportsOptions.map((sport, i) => (
          <div 
            className={`sport-icon-wrapper ${sport.name === sportSelected ? 'active' : ''}`} 
            key={i}
            onClick={() => selectSport(sport.name)}
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

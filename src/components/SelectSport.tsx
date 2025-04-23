import React from "react";
import { useWeather } from "../context/WeatherContext";
import { sportsOptions } from "../utils/sportsSelector";

const SelectSport: React.FC = () => {
  const { selectSport } = useWeather();

  return (
    <div className="select-sport-header">
      <h1>Choose your sport</h1>
      {sportsOptions.map((el, i) => (
        <div className="sport-btn-container" key={i}>
          <img src={el.img} alt={el.name} onClick={() => selectSport(el.name)} />
          <p>{el.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SelectSport;

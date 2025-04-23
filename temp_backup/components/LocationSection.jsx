//useContext hook allows for the use of MyContext
import React, { useContext } from "react";
import { MyContext } from "../context/MyProvider.js";
import SearchIcon from "@mui/icons-material/Search";

const LocationSection = () => {
  const context = useContext(MyContext);

  return (
    <div className="location-section">
      <div className="location-header">
        <h1>Weather Wise</h1>
        <p>Please enter your location</p>
      </div>
      <div className="searchBox">
        <input
          className="searchInput"
          value={context.city}
          onChange={context.handleChange}
          placeholder="Location"
        />
        <button className="searchButton" onClick={context.handleClick}>
          <SearchIcon />
        </button>
      </div>
      <div className="location-error">
        <p>
          {context.cityError
            ? "There was a problem finding your location, please try again!"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default LocationSection;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sunImg from "../assets/sunImg.png";
import rainImg from "../assets/rainImg.png";
import windImg from "../assets/windImg.png";
import humidityImg from "../assets/humidityImg.png";
import uvindexImg from "../assets/uv-indexImg.png";

import { getCityLoc, getWeatherAndPollution } from "../utils/apiCalls";
import { getCyclingStatus } from "../utils/sportsLogic";

export const MyContext = React.createContext();

//This finds the current date and hour.
let today = new Date();
let currentHour = today.getHours();

//Date information for the UI current weather.
const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const d = new Date();
let day = weekday[d.getDay()];

const MyProvider = (props) => {
  //The states shows the user input recorded by the form
  let [city, setCity] = useState("");
  //This state saves the data from the geolocation API call
  let [location, setLocation] = useState({});
  //This state shows when the city has been loaded and can be used to display information to the user.
  let [showCity, setShowCity] = useState(false);

  // If there is a error loading the city from user input
  let [cityError, setCityError] = useState(false);

  //This state saves the data from the weather API call
  let [weather, setWeather] = useState({});

  //This state converts the wind speed from m/s to km/h
  let [crtWindSpeed, setCrtWindSpeed] = useState(0);

  //This state shows when the weather API is finished
  let [apiLoaded, setApiLoaded] = useState(false);

  //This state updates the rating for cycling
  //Todo should I put a number here to get it ready for a number?
  let [cyclingRating, setCyclingRating] = useState();

  //This state updates when the user selects a sport
  let [sportSelected, setSportSelected] = useState("");

  //This state will be updated by the API call for air pollution
  let [airPollution, setAirPollution] = useState({});
  let [airPollutionDes, setAirPollutionDes] = useState("");

  //This state sets the color of the rating circle
  // let [rateColour, setRateColour] = useState("");

  const navigate = useNavigate();

  //This handles the event change in the input for the city
  //todo change name to something more unique
  const handleChange = (event) => {
    setCity(event.currentTarget.value);
  };

  //This handles the click from the location search
  //Todo change name to something more unique
  const handleClick = async () => {
    try {
      await geoLocCall();
      navigate("/sport");
      setCity("");
      setCityError(false);
    } catch (err) {
      console.log(`This is from the handle click fn: ${err.message}`);
      setCityError(true);
      setCity("");
    }
  };

  //API Call
  const geoLocCall = async () => {
    try {
      const data = await getCityLoc(city);
      if (data.length === 0)
        throw new Error("There is a problem locating the city");
      setLocation(data);
      setShowCity(true);
      const [forecastData, pollutionData] = await getWeatherAndPollution(
        data[0].lat,
        data[0].lon
      );
      if (forecastData === undefined || pollutionData === undefined)
        throw new Error("Problem with getting weather forecast and pollution");
      setWeather(forecastData);
      setAirPollution(pollutionData.list[0].main.aqi);
      setApiLoaded(true);
      setCrtWindSpeed((forecastData.current.wind_speed * 3.6).toFixed(0));
    } catch (err) {
      //console.error(`There is an issue with the API call: ${err.message}`);
      throw new Error(err.message);
    }
  };

  //Air Pollution Quality
  const handleAirPollution = () => {
    const qualitativeName = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    let AirPollutionDes = qualitativeName[airPollution - 1];
    setAirPollutionDes(AirPollutionDes);
  };

  //This function handles the click from the sport selected, it will take one parameter which is the sport selected.
  const handlClickSport = (sport) => {
    setSportSelected(sport);
    handleMultiSport();
    navigate("/rating");
  };

  //This function handles
  const handleMultiSport = () => {
    handleAirPollution();
    let totalRate = getCyclingStatus(
      weather.current.feels_like,
      crtWindSpeed,
      weather.hourly[0].pop,
      weather.current.uvi
    );
    setCyclingRating(totalRate);
  };

  // const handleColorSelect = () => {
  //     if (cyclingRating <= 3) {
  //     setRateColour("Red");
  //   } else if (cyclingRating > 3 && cyclingRating <= 7) {
  //     setRateColour("yellow");
  //   } else {
  //     setRateColour("green");
  //   }
  // }

  //This is the method that handles the navigation to the current weather
  const handleNavCurrentWeather = () => navigate("/current-weather");

  return (
    <MyContext.Provider
      value={{
        city: city,
        location: location,
        showCity: showCity,
        weather: weather,
        apiLoaded: apiLoaded,
        cyclingRating: cyclingRating,
        handleChange: handleChange,
        handleClick: handleClick,
        geoLocCall: geoLocCall,
        handlClickSport: handlClickSport,
        currentHour: currentHour,
        handleNavCurrentWeather: handleNavCurrentWeather,
        day: day,
        sunImg: sunImg,
        rainImg: rainImg,
        windImg: windImg,
        humidityImg: humidityImg,
        uvindexImg: uvindexImg,
        sportSelected: sportSelected,
        airPollution: airPollution,
        airPollutionDes: airPollutionDes,
        crtWindSpeed: crtWindSpeed,
        cityError: cityError,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;

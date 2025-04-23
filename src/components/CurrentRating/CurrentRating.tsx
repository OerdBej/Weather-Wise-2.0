import React, { useEffect, useState } from "react";
import { useWeather } from "../../context/WeatherContext";
import ProgressBar from "../StatusBar/ProgressBar";
import "../CurrentRating/CurrentRating.css";
import airquality from "../../assets/airquality.png";
import heat from "../../assets/heat.png";

const CurrentRating: React.FC = () => {
  const { 
    weather, 
    sportSelected, 
    cyclingRating, 
    windSpeedKmh, 
    airPollutionDes, 
    airPollution, 
    navigateToCurrentWeather
  } = useWeather();
  
  // Removed unused circleColor state since we're using the new rating class system
  const [rainImg, setRainImg] = useState<string>("");
  const [windImg, setWindImg] = useState<string>("");
  const [uvindexImg, setUvindexImg] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string>(sportSelected || "Cycling");
  const [ratingValue, setRatingValue] = useState<number | null>(cyclingRating);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    // Set appropriate images based on conditions
    import('../../assets/rainImg.png').then(module => setRainImg(module.default));
    import('../../assets/windImg.png').then(module => setWindImg(module.default));
    import('../../assets/uv-indexImg.png').then(module => setUvindexImg(module.default));
  }, []);
  
  // Update rating value when cyclingRating changes
  useEffect(() => {
    if (cyclingRating !== null) {
      setIsAnimating(true);
      // Add a slight delay for animation effect
      setTimeout(() => {
        setRatingValue(cyclingRating);
        setIsAnimating(false);
      }, 300);
    }
  }, [cyclingRating]);
  
  // Update selected sport when sportSelected changes
  useEffect(() => {
    if (sportSelected) {
      setSelectedSport(sportSelected);
    }
  }, [sportSelected]);

  // Sport selection handled by the separate SelectSport component

  const state = {
    size: 180, // Increased size for better visibility
    strokeWidth: 12,
    circleOneStroke: "", // No longer needed with new coloring system
    circleTwoStroke: "gray",
  };

  return (
    <div className="current-rating-main-container">
      <div className="current-rating-second-container">
        
        <div className="current-rating-grid-container">
          <div className="current-rating-grid-header">
            <h1>{selectedSport} Rating</h1>
          </div>
          {cyclingRating !== null && cyclingRating >= 0 && weather ? (
            <>
              <div className={`circle-container ${isAnimating ? 'animating' : ''}`}>
                <ProgressBar
                  progress={Number(ratingValue || cyclingRating)}
                  {...state}
                />
              </div>
              <div className="rating-params-header">
                <h2>Weather Factors</h2>
              </div>
              <div className="rating-params-temp">
                <p>
                  1. Real feel temperature:
                  {weather.current.feels_like.toFixed(0)}°C
                </p>
              </div>
              <div className="rating-params-temp-img">
                <img src={heat} alt="heat" />
              </div>
              <div className="rating-params-wind">
                <p>
                  2. Wind speed: {windSpeedKmh}km/h
                </p>
              </div>
              <div className="rating-params-wind-img">
                <img src={windImg} alt="wind" />
              </div>
              <div className="rating-params-pop">
                <p>
                  3. Rain probability: {(weather.hourly[0].pop * 100).toFixed(0)}%
                </p>
              </div>
              <div className="rating-params-rain-img">
                <img src={rainImg} alt="rain" />
              </div>
              <div className="rating-params-uvi">
                <p>4. UV index: {weather.current.uvi}</p>
              </div>
              <div className="rating-params-uvi-img">
                <img src={uvindexImg} alt="visibility" />
              </div>
              <div className="rating-params-air-pollution">
                <p>5. Air quality: {airPollutionDes}</p>
              </div>
              <div className="rating-params-air-quality-img">
                <img src={airquality} alt="visibility" />
              </div>
              <div className="rate-btn">
                <button onClick={navigateToCurrentWeather}>
                  Check Weather
                </button>
              </div>
              <div className="alerts">
                <h2>Alerts</h2>
              </div>
              {Number(weather.current.feels_like.toFixed(0)) >= 30 ? (
                <div className="real-feel-error-heat">
                  <p>Remember to drink lots of water, it's hot.</p>
                </div>
              ) : (
                <></>              
              )}
              {windSpeedKmh >= 20 ? (
                <div className="real-feel-error-wind">
                  <p>Take a windproof shell</p>
                </div>
              ) : (
                <></>              
              )}
              {Number((weather.hourly[0].pop * 100).toFixed(0)) >= 40 ? (
                <div className="real-feel-error-pop">
                  <p>Grab a waterproof jacket</p>
                </div>
              ) : (
                <></>              
              )}
              {weather.current.uvi >= 5 ? (
                <div className="real-feel-error-uvi">
                  <p>Wear sunscreen UVI is high</p>
                </div>
              ) : (
                <></>              
              )}
              {airPollution !== null && airPollution >= 3 ? (
                <div className="real-feel-error-pollution">
                  <p>Maybe exercise indoors today</p>
                </div>
              ) : (
                <></>              
              )}
            </>
          ) : cyclingRating !== null && cyclingRating < 0 ? (
            <div className="rating-not-loaded">
              <h3>WOW it's wild out there</h3>
              <p>
                Sorry we don't recommend you exercise outside today, try another
                location to check out our rating
              </p>
            </div>
          ) : (
            <div className="rating-not-loaded">
              <h3>The rating is not loaded</h3>
              <p>Please check you have input a location</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentRating;

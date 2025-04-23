import React, { useEffect, useState } from 'react';
import { useWeather } from "../../context/WeatherContext";
import { useLocation } from "../../context/LocationContext";
import ProgressBar from "../StatusBar/ProgressBar";
import eyeImg from "../../assets/eyeImg.png";
import airquality from "../../assets/airquality.png";
import heat from "../../assets/heat.png";
import "../CurrentWeather/CurrentWeather.css";

const CurrentWeather: React.FC = () => {
  const { 
    weather, 
    windSpeedKmh, 
    apiLoaded,
    sportSelected,
    cyclingRating,
    airPollutionDes,
    airPollution
  } = useWeather();
  const { location } = useLocation();
  
  const [humidityImg, setHumidityImg] = useState<string>("");
  const [sunImg, setSunImg] = useState<string>("");
  const [rainImg, setRainImg] = useState<string>("");
  const [windImg, setWindImg] = useState<string>("");
  const [uvindexImg, setUvindexImg] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [currentHour, setCurrentHour] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number | null>(cyclingRating);

  useEffect(() => {
    // Import images
    import('../../assets/humidityImg.png').then(module => setHumidityImg(module.default));
    import('../../assets/sunImg.png').then(module => setSunImg(module.default));
    import('../../assets/rainImg.png').then(module => setRainImg(module.default));
    import('../../assets/windImg.png').then(module => setWindImg(module.default));
    import('../../assets/uv-indexImg.png').then(module => setUvindexImg(module.default));
    
    // Get current day and hour
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    setCurrentDay(days[now.getDay()]);
    setCurrentHour(now.getHours().toString().padStart(2, '0'));
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
  
  // Progress bar configuration
  const progressBarState = {
    size: 180, // Increased size for better visibility
    strokeWidth: 12,
    circleOneStroke: "", 
    circleTwoStroke: "gray",
  };

  return (
    <div className="current-weather-main-container">
      <div className="current-weather-second-container">
        {apiLoaded && weather && location ? (
          <>
            {/* Location and Temperature header section */}
            <header className="weather-header">
              <div className="weather-temp-location">
                <h1 className="location-name">{location.name} {location.country}</h1>
                <div className="weather-day-info">
                  <p>{currentDay}, {currentHour}H</p>
                </div>
                <div className="temperature-display">
                  <p className="temp-value">{weather.current.temp}°</p>
                  <div className="feels-like">
                    <p>Feels like {weather.current.feels_like}°C</p>
                  </div>
                </div>
                <div className="weather-description">
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`} 
                    alt={weather.current.weather[0].description} 
                  />
                  <p>{weather.current.weather[0].description}</p>
                </div>
              </div>
              
              {/* Sport rating circle */}
              {cyclingRating !== null && cyclingRating >= 0 && (
                <div className="sport-rating-summary">
                  <h2>{sportSelected || "Sport"} Rating</h2>
                  <div className={`circle-container ${isAnimating ? 'animating' : ''}`}>
                    <ProgressBar
                      progress={Number(ratingValue || cyclingRating)}
                      {...progressBarState}
                    />
                  </div>
                </div>
              )}
            </header>

            {/* Weather parameters section */}
            <section className="weather-conditions-section">
              <h2>Weather Conditions</h2>
              <div className="weather-params-container">
                <div className="weather-param-card">
                  <p>Rain Probability</p>
                  <p>{((weather.hourly[0].pop) * 100)}%</p>
                  <img src={weather.hourly[0].pop <= 0.2 ? sunImg : rainImg} alt="Rain probability" />
                </div>
                <div className="weather-param-card">
                  <p>Visibility</p>
                  <p>{((weather.current.visibility) / 1000)} km</p>
                  <img src={eyeImg} alt="visibility" />
                </div>
                <div className="weather-param-card">
                  <p>Wind Speed</p>
                  <p>{windSpeedKmh} km/h</p>
                  <img src={windImg} alt="wind" />
                </div>
                <div className="weather-param-card">
                  <p>Humidity</p>
                  <p>{weather.current.humidity}%</p>
                  <img src={humidityImg} alt="humidity" />
                </div>
                <div className="weather-param-card">
                  <p>UV Index</p>
                  <p>{weather.current.uvi}</p>
                  <img src={uvindexImg} alt="UV Index" />
                </div>
                <div className="weather-param-card">
                  <p>Air Quality</p>
                  <p>{airPollutionDes}</p>
                  <img src={airquality} alt="Air Quality" />
                </div>
              </div>
            </section>
            
            {/* Sport suitability section */}
            {cyclingRating !== null && cyclingRating >= 0 && (
              <section className="sport-suitability-section">
                <h2>{sportSelected || "Sport"} Suitability Factors</h2>
                <div className="rating-params-container">
                  <div className="rating-param-card">
                    <p>Temperature Feel</p>
                    <p>{weather.current.feels_like.toFixed(0)}°C</p>
                    <img src={heat} alt="heat" />
                  </div>
                  <div className="rating-param-card">
                    <p>Wind Impact</p>
                    <p>{windSpeedKmh} km/h</p>
                    <img src={windImg} alt="wind" />
                  </div>
                  <div className="rating-param-card">
                    <p>Rain Chance</p>
                    <p>{(weather.hourly[0].pop * 100).toFixed(0)}%</p>
                    <img src={rainImg} alt="rain" />
                  </div>
                  <div className="rating-param-card">
                    <p>UV Exposure</p>
                    <p>{weather.current.uvi}</p>
                    <img src={uvindexImg} alt="UV Index" />
                  </div>
                  <div className="rating-param-card">
                    <p>Air Quality</p>
                    <p>{airPollutionDes}</p>
                    <img src={airquality} alt="Air Quality" />
                  </div>
                </div>
              </section>
            )}
            
            {/* Alerts section */}
            <section className="alerts-section">
              <h2>Weather Alerts & Tips</h2>
              <div className="alerts-container">
                {Number(weather.current.feels_like.toFixed(0)) >= 30 && (
                  <div className="alert-card alert-heat">
                    <p>Remember to drink lots of water, it's hot.</p>
                  </div>
                )}
                
                {windSpeedKmh >= 20 && (
                  <div className="alert-card alert-wind">
                    <p>Take a windproof shell</p>
                  </div>
                )}
                
                {Number((weather.hourly[0].pop * 100).toFixed(0)) >= 40 && (
                  <div className="alert-card alert-pop">
                    <p>Grab a waterproof jacket</p>
                  </div>
                )}
                
                {weather.current.uvi >= 5 && (
                  <div className="alert-card alert-uvi">
                    <p>Wear sunscreen UVI is high</p>
                  </div>
                )}
                
                {airPollution !== null && airPollution >= 3 && (
                  <div className="alert-card alert-pollution">
                    <p>Maybe exercise indoors today</p>
                  </div>
                )}

                {/* If no alerts are active, show a positive message */}
                {!(Number(weather.current.feels_like.toFixed(0)) >= 30) && 
                  !(windSpeedKmh >= 20) && 
                  !(Number((weather.hourly[0].pop * 100).toFixed(0)) >= 40) && 
                  !(weather.current.uvi >= 5) && 
                  !(airPollution !== null && airPollution >= 3) && (
                    <div className="alert-card alert-good">
                      <p>Great conditions for {sportSelected || "your activity"}!</p>
                    </div>
                  )}
              </div>
            </section>
          </>
        ) : cyclingRating !== null && cyclingRating < 0 ? (
          <div className="weather-not-loaded">
            <h3>WOW it's wild out there</h3>
            <p>
              Sorry we don't recommend you exercise outside today, try another
              location to check out our rating
            </p>
          </div>
        ) : (
          <div className="weather-not-loaded">
            <h3>The weather is not loaded</h3>
            <p>Please check you have input a location</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;

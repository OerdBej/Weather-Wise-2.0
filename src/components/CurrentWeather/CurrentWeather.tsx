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
      {apiLoaded && weather && location ? (
        <div className="current-weather-content">
          {/* Main header with location and current weather */}
          <div className="weather-header-wrapper">
            <div className="weather-hero">
              <div className="weather-hero-left">
                <h1 className="location-name">{location.name}</h1>
                <div className="weather-day-info">
                  <p>{currentDay}, {currentHour}H</p>
                </div>
                <div className="temperature-display">
                  <p className="temp-value">{weather.current.temp.toFixed(0)}°</p>
                  <div className="feels-like">
                    <p>Feels like {weather.current.feels_like.toFixed(0)}°C</p>
                  </div>
                </div>
                <div className="weather-description">
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} 
                    alt={weather.current.weather[0].description} 
                  />
                  <p>{weather.current.weather[0].description}</p>
                </div>
              </div>
              {/* Sport rating circle */}
              {cyclingRating !== null && cyclingRating >= 0 && (
                <div className="weather-hero-right">
                  <div className="sport-rating-summary">
                    <h2>{sportSelected || "Sport"} Rating</h2>
                    <div className={`circle-container ${isAnimating ? 'animating' : ''}`}>
                      <ProgressBar
                        progress={Number(ratingValue || 0)}
                        size={progressBarState.size}
                        strokeWidth={progressBarState.strokeWidth}
                        circleOneStroke={progressBarState.circleOneStroke}
                        circleTwoStroke={
                          ratingValue !== null ? 
                            ratingValue >= 7 ? '#ffd700' : 
                            ratingValue >= 4 ? '#ffa500' : 
                            '#ff4500' : 
                            '#ffd700'
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Weather Info Cards */}
          <div className="weather-info-area">
            <div className="weather-grid-container">
              {/* Weather Conditions Section */}
              <div className="weather-grid-section current-conditions">
                <h2>Current Conditions</h2>
                <div className="weather-cards-grid">
                  <div className="weather-card">
                    <div className="card-icon">
                      <img src={heat} alt="Temperature" />
                    </div>
                    <div className="card-content">
                      <h3>Temperature</h3>
                      <p>{weather.current.temp.toFixed(0)}°C</p>
                    </div>
                  </div>
                  
                  <div className="weather-card">
                    <div className="card-icon">
                      <img src={humidityImg} alt="Humidity" />
                    </div>
                    <div className="card-content">
                      <h3>Humidity</h3>
                      <p>{weather.current.humidity}%</p>
                    </div>
                  </div>
                  
                  <div className="weather-card">
                    <div className="card-icon">
                      <img src={windImg} alt="Wind" />
                    </div>
                    <div className="card-content">
                      <h3>Wind</h3>
                      <p>{windSpeedKmh} km/h</p>
                    </div>
                  </div>
                  
                  <div className="weather-card">
                    <div className="card-icon">
                      <img src={rainImg} alt="Rain" />
                    </div>
                    <div className="card-content">
                      <h3>Rain Chance</h3>
                      <p>{(weather.hourly[0].pop * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  
                  <div className="weather-card">
                    <div className="card-icon">
                      <img src={uvindexImg} alt="UV Index" />
                    </div>
                    <div className="card-content">
                      <h3>UV Index</h3>
                      <p>{weather.current.uvi.toFixed(1)}</p>
                    </div>
                  </div>
                  
                  <div className="weather-card">
                    <div className="card-icon">
                      <img src={eyeImg} alt="Visibility" />
                    </div>
                    <div className="card-content">
                      <h3>Visibility</h3>
                      <p>{(weather.current.visibility / 1000).toFixed(1)} km</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sport Rating Factors */}
              {cyclingRating !== null && cyclingRating >= 0 && (
                <div className="weather-grid-section sport-suitability">
                  <h2>{sportSelected || "Sport"} Suitability</h2>
                  <div className="weather-cards-grid">
                    <div className="weather-card">
                      <div className="card-icon">
                        <img src={heat} alt="Temperature Feel" />
                      </div>
                      <div className="card-content">
                        <h3>Temperature Feel</h3>
                        <p>{weather.current.feels_like.toFixed(0)}°C</p>
                      </div>
                    </div>
                    
                    <div className="weather-card">
                      <div className="card-icon">
                        <img src={windImg} alt="Wind Impact" />
                      </div>
                      <div className="card-content">
                        <h3>Wind Impact</h3>
                        <p>{windSpeedKmh} km/h</p>
                      </div>
                    </div>
                    
                    <div className="weather-card">
                      <div className="card-icon">
                        <img src={rainImg} alt="Rain Impact" />
                      </div>
                      <div className="card-content">
                        <h3>Rain Impact</h3>
                        <p>{(weather.hourly[0].pop * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                    
                    <div className="weather-card">
                      <div className="card-icon">
                        <img src={airquality} alt="Air Quality" />
                      </div>
                      <div className="card-content">
                        <h3>Air Quality</h3>
                        <p>{airPollutionDes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Weather Alerts Section */}
              <div className="weather-grid-section alerts-section">
                <h2>Weather Alerts & Tips</h2>
                <div className="alerts-grid">
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
              </div>
            </div>
          </div>
        </div>
      ) : cyclingRating !== null && cyclingRating < 0 ? (
        <div className="weather-placeholder">
          <div className="weather-placeholder-content">
            <h2>WOW it's wild out there</h2>
            <p>
              Sorry we don't recommend you exercise outside today, try another
              location to check out our rating
            </p>
          </div>
        </div>
      ) : (
        <div className="weather-placeholder">
          <div className="weather-placeholder-content">
            <h2>Please search for a city</h2>
            <p>Enter a city name in the search bar above to view weather information</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;

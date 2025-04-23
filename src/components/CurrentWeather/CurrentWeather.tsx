import React, { useEffect, useState } from 'react';
import { useWeather } from "../../context/WeatherContext";
import { useLocation } from "../../context/LocationContext";
import eyeImg from "../../assets/eyeImg.png";
import "../CurrentWeather/CurrentWeather.css";

const CurrentWeather: React.FC = () => {
  const { weather, windSpeedKmh, apiLoaded } = useWeather();
  const { location } = useLocation();
  
  const [humidityImg, setHumidityImg] = useState<string>("");
  const [sunImg, setSunImg] = useState<string>("");
  const [rainImg, setRainImg] = useState<string>("");
  const [windImg, setWindImg] = useState<string>("");
  const [uvindexImg, setUvindexImg] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [currentHour, setCurrentHour] = useState<string>("");

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
    setCurrentHour(now.getHours().toString());
  }, []);

  return (
    <div className="current-weather-main-container">
      <div className="current-weather-second-container">
        <div className="current-weather-grid-container">
          <div className="current-weather-grid-header">
            <h1>Current Weather</h1>
          </div>
          <>
            {apiLoaded && weather && location ? (
              <>
                <div className="current-weather-temp">
                  <p>{weather.current.temp}°</p>
                  <p>{location.name} {location.country}</p>
                  <p>Feels like temperature {weather.current.feels_like}°C</p>
                  <p>{currentDay}, {currentHour}H</p>
                </div>
                <div className='current-weather-icon-des'>
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`} 
                    alt={weather.current.weather[0].description} 
                  />
                  <p>{weather.current.weather[0].description}</p>
                </div>
                <div className='current-weather-pop'>
                  <p>Possibility of rain</p>
                  <p>{((weather.hourly[0].pop) * 100)}%</p>
                  <>
                    {weather.hourly[0].pop <= 0.2 ? 
                      <img src={sunImg} alt="Sun" /> : 
                      <img src={rainImg} alt="Rain" />
                    }
                  </>
                </div>
                <div className="current-weather-vis">
                  <p>Visibility</p>
                  <p>{((weather.current.visibility) / 1000)} km</p>
                  <img src={eyeImg} alt="visibility" />
                </div>
                <div className="current-weather-wind">
                  <p>Wind Speed</p>
                  <p>{windSpeedKmh} km/h</p>
                  <img src={windImg} alt="wind" />
                </div>
                <div className="current-weather-hum">
                  <p>Humidity</p>
                  <p>{weather.current.humidity}%</p>
                  <img src={humidityImg} alt="humidity" />
                </div>
                <div className="current-weather-uvi">
                  <p>UV Index</p>
                  <p>{weather.current.uvi}</p>
                  <img src={uvindexImg} alt="UV Index" />
                </div>
              </>
            ) : (
              <div className='weather-not-loaded'>
                <h3>The weather is not loaded</h3>
                <p>Please check you have input a location.</p>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

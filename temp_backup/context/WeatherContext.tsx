import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Weather, AirPollution, AirQualityDescription } from '../types/weather';
import { getWeatherAndPollution } from '../utils/apiCalls';
import { getCyclingStatus } from '../utils/sportsLogic';
import { useLocation } from './LocationContext';

interface WeatherContextType {
  weather: Weather | null;
  airPollution: number | null;
  airPollutionDes: AirQualityDescription | '';
  cyclingRating: number | null;
  windSpeedKmh: number;
  sportSelected: string;
  apiLoaded: boolean;
  selectSport: (sport: string) => void;
  navigateToCurrentWeather: () => void;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { location } = useLocation();
  const navigate = useNavigate();
  
  const [weather, setWeather] = useState<Weather | null>(null);
  const [airPollution, setAirPollution] = useState<number | null>(null);
  const [airPollutionDes, setAirPollutionDes] = useState<AirQualityDescription | ''>('');
  const [cyclingRating, setCyclingRating] = useState<number | null>(null);
  const [windSpeedKmh, setWindSpeedKmh] = useState(0);
  const [sportSelected, setSportSelected] = useState('');
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location) {
        try {
          setApiLoaded(false);
          const [forecastData, pollutionData] = await getWeatherAndPollution(
            location.lat,
            location.lon
          );
          
          if (!forecastData || !pollutionData?.list?.[0]?.main?.aqi) {
            throw new Error('Invalid weather or pollution data received');
          }

          setWeather(forecastData);
          setAirPollution(pollutionData.list[0].main.aqi);
          setWindSpeedKmh(Number((forecastData.current.wind_speed * 3.6).toFixed(0)));
          setApiLoaded(true);
        } catch (err) {
          console.error('Error fetching weather data:', err);
          setWeather(null);
          setAirPollution(null);
          setWindSpeedKmh(0);
          setApiLoaded(false);
        }
      }
    };

    fetchWeatherData();
  }, [location]);

  const updateAirPollutionDescription = () => {
    if (airPollution === null) return;
    const qualitativeName: AirQualityDescription[] = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    setAirPollutionDes(qualitativeName[airPollution - 1]);
  };

  const selectSport = (sport: string) => {
    setSportSelected(sport);
    updateAirPollutionDescription();
    
    if (weather) {
      try {
        const totalRate = getCyclingStatus(
          weather.current.feels_like,
          windSpeedKmh,
          weather.hourly[0].pop,
          weather.current.uvi
        );
        setCyclingRating(typeof totalRate === 'number' ? totalRate : null);
      } catch (err) {
        console.error('Error calculating cycling status:', err);
        setCyclingRating(null);
      }
    }
    
    navigate('/rating');
  };

  const navigateToCurrentWeather = () => navigate('/current-weather');

  return (
    <WeatherContext.Provider
      value={{
        weather,
        airPollution,
        airPollutionDes,
        cyclingRating,
        windSpeedKmh,
        sportSelected,
        apiLoaded,
        selectSport,
        navigateToCurrentWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

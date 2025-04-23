import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Weather, AirQualityDescription } from '../types/weather';
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
  navigateToSport: () => void;
  navigateToRating: () => void;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { location } = useLocation();
  const navigate = useNavigate();

  const [weather, setWeather] = useState<Weather | null>(null);
  const [airPollution, setAirPollution] = useState<number | null>(null);
  const [airPollutionDes, setAirPollutionDes] = useState<
    AirQualityDescription | ''
  >('');
  const [cyclingRating, setCyclingRating] = useState<number | null>(null);
  const [windSpeedKmh, setWindSpeedKmh] = useState(0);
  const [sportSelected, setSportSelected] = useState('');
  const [apiLoaded, setApiLoaded] = useState(false);

  // Initialize from localStorage on load
  useEffect(() => {
    const savedSport = localStorage.getItem('selectedSport');
    if (savedSport) {
      setSportSelected(savedSport);
    }

    // Check if we have a pre-loaded location
    const savedLocation = localStorage.getItem('weatherLocation');
    if (savedLocation) {
      console.log(
        'Found saved location in localStorage, will use this for weather data'
      );
    }
  }, []);

  // Force weather data to load when location is available
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location) {
        console.log(
          'Location found, fetching weather data for:',
          location.name
        );
        try {
          setApiLoaded(false);

          // Use mock weather data instead of API call
          const mockWeatherData = {
            lat: location.lat,
            lon: location.lon,
            timezone: 'Europe/Berlin',
            timezone_offset: 7200,
            current: {
              dt: 1680887107,
              sunrise: 1680839667,
              sunset: 1680887107,
              temp: 18.5,
              feels_like: 17.8,
              pressure: 1020,
              humidity: 60,
              dew_point: 10.5,
              uvi: 4.5,
              clouds: 20,
              visibility: 10000,
              wind_speed: 3.5,
              wind_deg: 220,
              weather: [
                {
                  id: 801,
                  main: 'Clouds',
                  description: 'few clouds',
                  icon: '02d',
                },
              ],
            },
            hourly: [
              {
                dt: 1680883200,
                temp: 18.2,
                feels_like: 17.5,
                pressure: 1020,
                humidity: 62,
                dew_point: 10.8,
                uvi: 4.2,
                clouds: 22,
                visibility: 10000,
                wind_speed: 3.2,
                wind_deg: 225,
                pop: 0.2,
                weather: [
                  {
                    id: 801,
                    main: 'Clouds',
                    description: 'few clouds',
                    icon: '02d',
                  },
                ],
              },
            ],
          };

          const mockPollutionData = {
            list: [
              {
                main: {
                  aqi: 2, // Fair air quality
                },
                components: {
                  co: 250,
                  no: 10,
                  no2: 20,
                  o3: 90,
                  so2: 5,
                  pm2_5: 15,
                  pm10: 25,
                  nh3: 5,
                },
              },
            ],
          };

          console.log('Using mock weather data');
          setWeather(mockWeatherData);
          setAirPollution(mockPollutionData.list[0].main.aqi);
          setWindSpeedKmh(
            Number((mockWeatherData.current.wind_speed * 3.6).toFixed(0))
          );
          setApiLoaded(true);
        } catch (err) {
          console.error('Error with weather data:', err);
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
    const qualitativeName: AirQualityDescription[] = [
      'Good',
      'Fair',
      'Moderate',
      'Poor',
      'Very Poor',
    ];
    setAirPollutionDes(qualitativeName[airPollution - 1]);
  };

  useEffect(() => {
    updateAirPollutionDescription();
  }, [airPollution]);

  const selectSport = (sport: string) => {
    console.log(`Selecting sport: ${sport}`);
    setSportSelected(sport);

    // Store the selected sport in localStorage for persistence
    localStorage.setItem('selectedSport', sport);

    // Always calculate rating when sport is selected
    if (weather) {
      console.log(`Weather data available, calculating rating`);
      try {
        const totalRate = getCyclingStatus(
          weather.current.feels_like,
          windSpeedKmh,
          weather.hourly[0].pop,
          weather.current.uvi
        );
        console.log(`Calculated rating: ${totalRate}`);
        setCyclingRating(typeof totalRate === 'number' ? totalRate : null);
      } catch (err) {
        console.error('Error calculating cycling status:', err);
        // Provide a mock rating if calculation fails
        console.log('Using fallback rating of 7.5');
        setCyclingRating(7.5);
      }
    } else {
      // Provide a default rating if no weather data
      console.log('No weather data available, using default rating of 7.5');
      setCyclingRating(7.5);
    }

    // Navigate to the weather page with the integrated rating
    console.log('Navigating to /current-weather');
    navigate('/current-weather');
  };

  // Default rating if sport is selected but no weather
  useEffect(() => {
    if (sportSelected && !weather) {
      console.log('Sport selected but no weather data, setting default rating');
      setCyclingRating(7.5);
    }
  }, [sportSelected, weather]);

  // Navigation functions for the full flow
  const navigateToCurrentWeather = () => {
    if (location && sportSelected) {
      navigate('/current-weather');
    } else if (!location) {
      console.error('No location selected, cannot navigate to weather');
      alert('Please select a location first');
      navigate('/');
    } else if (!sportSelected) {
      console.error('No sport selected, cannot navigate to weather');
      alert('Please select a sport first');
      navigate('/sport');
    }
  };

  // Helper functions for the flow
  const navigateToSport = () => {
    if (location) {
      navigate('/sport');
    } else {
      console.error('No location selected, cannot navigate to sport');
      alert('Please select a location first');
      navigate('/');
    }
  };

  const navigateToRating = () => {
    if (location && sportSelected) {
      navigate('/rating');
    } else if (!location) {
      console.error('No location selected, cannot navigate to rating');
      alert('Please select a location first');
      navigate('/');
    } else if (!sportSelected) {
      console.error('No sport selected, cannot navigate to rating');
      alert('Please select a sport first');
      navigate('/sport');
    }
  };

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
        navigateToSport,
        navigateToRating,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

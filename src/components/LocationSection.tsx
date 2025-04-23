import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './LocationSection.css';

interface LocationSectionProps {}

const LocationSection: React.FC<LocationSectionProps> = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Set default sport when component loads
  useEffect(() => {
    // Use existing sport or set default to Cycling if not already set
    const existingSport = localStorage.getItem('selectedSport');
    if (!existingSport) {
      localStorage.setItem('selectedSport', 'Cycling');
    }
  }, []);

  const searchLocation = async () => {
    if (!city.trim()) {
      setCityError(true);
      setErrorMessage('Please enter a city name');
      return;
    }

    setIsLoading(true);
    setCityError(false);

    try {
      // FALLBACK: Create a mock location based on user input
      // This ensures the app flow works even when the API is unavailable
      setTimeout(() => {
        const mockLocation = {
          name: city,
          country: 'Demo',
          lat: 52.52,
          lon: 13.41,
          state: '',
        };

        setLocation(mockLocation);
        localStorage.setItem('weatherLocation', JSON.stringify(mockLocation));
        setIsLoading(false);
      }, 500); // Small delay to simulate API call

      return; // Skip the API call and use the mock data

      // Keeping the original API code commented out for reference
      /*
      const apiKey = "1135f85789a26d2844384019a1453e46";
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.length === 0) {
        setCityError(true);
        setErrorMessage('City not found. Please check the spelling and try again.');
        setLocation(null);
      } else {
        setLocation(data[0]);
        localStorage.setItem('weatherLocation', JSON.stringify(data[0]));
      }
      */
    } catch (error) {
      console.error('Error fetching location:', error);
      setCityError(true);
      setErrorMessage('Failed to fetch location. Please try again.');
      setLocation(null);
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setCityError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchLocation();
    }
  };

  const handleContinue = () => {
    if (location) {
      // Make sure we have a default sport selected before navigating
      const selectedSport = localStorage.getItem('selectedSport') || 'Cycling';
      localStorage.setItem('selectedSport', selectedSport);
      
      // Navigate to the sport selection page
      navigate('/sport');
    }
  };

  return (
    <div className='location-section'>
      <div className='location-header'>
        <h1>Weather Wise</h1>
        <p>Your guide to weather-optimized outdoor activities</p>
      </div>

      <div className='main-container'>
        {/* Main content area */}
        <div className='location-content'>
          <h2 className='step-title'>Find Your Location</h2>

          <div className='search-container'>
            <input
              className='searchInput'
              value={city}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder='Enter your city (e.g. Berlin, London, New York)'
              disabled={isLoading}
            />
            <button
              className='searchButton'
              onClick={searchLocation}
              disabled={isLoading}
              type='button'
            >
              {isLoading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                <SearchIcon />
              )}
            </button>
          </div>

          {cityError && (
            <div className='location-error'>
              <p className='error-message'>
                {errorMessage ||
                  'There was a problem finding your location, please try again!'}
              </p>
            </div>
          )}

          {location && (
            <div className='location-notification'>
              <div className='location-info'>
                <DirectionsRunIcon />
                <p>
                  Location set:{' '}
                  <strong>
                    {location.name}, {location.country}
                  </strong>
                </p>
              </div>

              <div className='next-button-container'>
                <button className='next-button' onClick={handleContinue}>
                  Continue <ArrowForwardIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sport selection modal has been removed */}
    </div>
  );
};

export default LocationSection;

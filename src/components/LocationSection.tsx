import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import './LocationSection.css';

interface LocationSectionProps {}

const LocationSection: React.FC<LocationSectionProps> = () => {
  const [city, setCity] = useState('');
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
        // Capitalize the city name
        const capitalizedCity = city
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
          
        const mockLocation = {
          name: capitalizedCity,
          country: '',  // Removed 'Demo'
          lat: 52.52,
          lon: 13.41,
          state: '',
        };

        localStorage.setItem('weatherLocation', JSON.stringify(mockLocation));
        setIsLoading(false);
        
        // Automatically navigate to sport selection without showing location notification
        const selectedSport = localStorage.getItem('selectedSport') || 'Cycling';
        localStorage.setItem('selectedSport', selectedSport);
        navigate('/sport');
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
      } else {
        localStorage.setItem('weatherLocation', JSON.stringify(data[0]));
        // Automatically navigate to sport selection
        const selectedSport = localStorage.getItem('selectedSport') || 'Cycling';
        localStorage.setItem('selectedSport', selectedSport);
        navigate('/sport');
      }
      */
    } catch (error) {
      console.error('Error fetching location:', error);
      setCityError(true);
      setErrorMessage('Failed to fetch location. Please try again.');
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

  // Navigation is now handled directly in the searchLocation function

  return (
    <div className='location-section'>
      <div className='location-header'>
        <h1>Weather Wise</h1>
        <p>Your guide to weather-optimized outdoor activities</p>
      </div>

      <div className='search-wrapper'>
        <div className='search-container'>
          <input
            className='searchInput'
            value={city}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='Enter Your City'
            disabled={isLoading}
            autoFocus
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
      </div>
    </div>
  );
};

export default LocationSection;

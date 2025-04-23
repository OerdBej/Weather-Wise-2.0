import React, { createContext, useContext, useState } from 'react';
import { Location } from '../types/weather';

interface LocationContextType {
  city: string;
  location: Location | null;
  showCity: boolean;
  cityError: boolean;
  errorMessage: string;
  isLoading: boolean;
  isMockMode: boolean;
  setCity: (city: string) => void;
  searchLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | null>(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState('');
  const [showCity, setShowCity] = useState(false);
  // Initialize location from localStorage if available
  const [location, setLocation] = useState<Location | null>(() => {
    const savedLocation = localStorage.getItem('weatherLocation');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });
  const [cityError, setCityError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Switch back to mock mode since we're having API key issues
  const isMockMode = true;

  const searchLocation = async () => {
    // Don't proceed if the city field is empty
    if (!city.trim()) {
      setCityError(true);
      setErrorMessage('Please enter a city name');
      return;
    }

    setIsLoading(true);
    setCityError(false);
    setErrorMessage('');

    try {
      // Always use mock data to ensure the app works
      const mockLocation = {
        name: city,
        country: 'Demo',
        lat: 52.52,
        lon: 13.41,
        state: '',
        local_names: {},
      };

      console.log('Using mock location data:', mockLocation);
      setLocation(mockLocation);
      setShowCity(true);
      setCity('');
      setCityError(false);

      // Save to localStorage for other components
      localStorage.setItem('weatherLocation', JSON.stringify(mockLocation));

      // No navigation - let the caller control this
    } catch (err) {
      console.error('Error with location:', err);
      setCityError(true);
      setErrorMessage('Failed to process location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        city,
        location,
        showCity,
        cityError,
        errorMessage,
        isLoading,
        isMockMode,
        setCity,
        searchLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Location } from '../types/weather';
import { getCityLoc } from '../utils/apiCalls';

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

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [showCity, setShowCity] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Switch back to mock mode since we're having API key issues
  const isMockMode = true;
  const navigate = useNavigate();

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
      // Check for API key
      if (!import.meta.env.VITE_APIKEY) {
        throw new Error('API key is missing. Please add it to your .env file.');
      }

      const data = await getCityLoc(city);
      
      if (!data || data.length === 0) {
        throw new Error(`Could not find location data for "${city}". Please check the spelling or try another city.`);
      }
      
      console.log('Location data received:', data[0]);
      setLocation(data[0]);
      setShowCity(true);
      setCity('');
      setCityError(false);
      navigate('/sport');
    } catch (err) {
      console.error('Error searching location:', err);
      setCityError(true);
      setErrorMessage(err instanceof Error ? err.message : 'An unknown error occurred');
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

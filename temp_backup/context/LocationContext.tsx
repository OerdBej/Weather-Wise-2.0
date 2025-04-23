import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Location } from '../types/weather';
import { getCityLoc } from '../utils/apiCalls';

interface LocationContextType {
  city: string;
  location: Location | null;
  showCity: boolean;
  cityError: boolean;
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
  const navigate = useNavigate();

  const searchLocation = async () => {
    try {
      const data = await getCityLoc(city);
      if (data.length === 0) {
        throw new Error('There is a problem locating the city');
      }
      setLocation(data[0]);
      setShowCity(true);
      setCity('');
      setCityError(false);
      navigate('/sport');
    } catch (err) {
      console.error('Error searching location:', err);
      setCityError(true);
      setCity('');
    }
  };

  return (
    <LocationContext.Provider
      value={{
        city,
        location,
        showCity,
        cityError,
        setCity,
        searchLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

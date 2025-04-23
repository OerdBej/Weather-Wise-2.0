import { Location, Weather, AirPollution } from '../types/weather';
import { mockLocations, getMockWeather, getMockAirPollution } from './mockData';

// Check if API key is available from env file
const apiKey = import.meta.env.VITE_APIKEY;

// Since we're having issues with the API key, always use mock data
const USE_MOCK_DATA = true;

console.warn('API Key issue detected - using mock data instead. For real weather data, add your own OpenWeatherMap API key to .env file.');

// Log app mode for debugging
console.info('Running in MOCK DATA mode with simulated weather data.');


/**
 * Generic API call function with proper error handling
 */
const getApiJson = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

/**
 * Get city location data from OpenWeatherMap API or mock data
 */
export const getCityLoc = async (city: string): Promise<Location[]> => {
  if (!city.trim()) {
    throw new Error('City name is required');
  }
  
  // Use mock data if no API key is provided
  if (USE_MOCK_DATA) {
    console.log('Using mock location data for:', city);
    const lowerCity = city.toLowerCase().trim();
    
    // Direct match - highest priority
    if (mockLocations[lowerCity]) {
      return mockLocations[lowerCity];
    }
    
    // Partial match - check if any city name contains the search or vice versa
    for (const [key, locations] of Object.entries(mockLocations)) {
      if (key.includes(lowerCity) || lowerCity.includes(key)) {
        return locations;
      }
    }
    
    // Try matching just the first part of city name (e.g., "new" matches "new york")
    if (lowerCity.length > 2) {
      for (const [key, locations] of Object.entries(mockLocations)) {
        if (key.startsWith(lowerCity) || lowerCity.startsWith(key)) {
          return locations;
        }
      }
    }
    
    // Try matching by city name within locations array
    for (const locations of Object.values(mockLocations)) {
      for (const location of locations) {
        if (location.name.toLowerCase().includes(lowerCity)) {
          return [location];
        }
      }
    }
    
    // If the entered city is not in our mock database
    throw new Error(`City "${city}" not found. We have 60+ major cities including: Tirana, Berlin, London, Paris, New York, and many more.`);
  }
  
  // Use real API
  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${apiKey}`;
    const data = await getApiJson<Location[]>(url);
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format from geocoding API');
    }
    
    return data;
  } catch (error) {
    console.error(`Failed to get location for city "${city}":`, error);
    throw error;
  }
};

/**
 * Get weather and pollution data from OpenWeatherMap API or mock data
 */
export const getWeatherAndPollution = async (lat: number, long: number): Promise<[Weather, AirPollution]> => {
  if (isNaN(lat) || isNaN(long)) {
    throw new Error('Invalid coordinates');
  }
  
  // Use mock data if requested
  if (USE_MOCK_DATA) {
    console.log('Using mock weather and pollution data for coordinates:', lat, long);
    
    // Create a 500ms delay to simulate a real API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockWeather = getMockWeather(lat, long);
    const mockPollution = getMockAirPollution();
    
    return [mockWeather, mockPollution];
  }
  
  // Use real API - with free tier endpoints
  try {
    // Free tier uses 2.5 API instead of 3.0
    const urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    const urlPollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${apiKey}`;

    return await Promise.all([
      getApiJson<Weather>(urlWeather),
      getApiJson<AirPollution>(urlPollution)
    ]);
  } catch (error) {
    console.error(`Failed to get weather data for coordinates (${lat}, ${long}):`, error);
    throw error;
  }
};

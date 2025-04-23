import { Location, Weather, AirPollution } from '../types/weather';

// Mock location data for common cities
export const mockLocations: Record<string, Location[]> = {
  // European Cities
  'berlin': [{ name: 'Berlin', country: 'DE', lat: 52.5244, lon: 13.4105 }],
  'london': [{ name: 'London', country: 'GB', lat: 51.5085, lon: -0.1257 }],
  'paris': [{ name: 'Paris', country: 'FR', lat: 48.8534, lon: 2.3488 }],
  'rome': [{ name: 'Rome', country: 'IT', lat: 41.9028, lon: 12.4964 }],
  'madrid': [{ name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 }],
  'amsterdam': [{ name: 'Amsterdam', country: 'NL', lat: 52.3676, lon: 4.9041 }],
  'vienna': [{ name: 'Vienna', country: 'AT', lat: 48.2082, lon: 16.3738 }],
  'brussels': [{ name: 'Brussels', country: 'BE', lat: 50.8503, lon: 4.3517 }],
  'stockholm': [{ name: 'Stockholm', country: 'SE', lat: 59.3293, lon: 18.0686 }],
  'oslo': [{ name: 'Oslo', country: 'NO', lat: 59.9139, lon: 10.7522 }],
  'tirana': [{ name: 'Tirana', country: 'AL', lat: 41.3275, lon: 19.8187 }],
  'athens': [{ name: 'Athens', country: 'GR', lat: 37.9838, lon: 23.7275 }],
  'lisbon': [{ name: 'Lisbon', country: 'PT', lat: 38.7223, lon: -9.1393 }],
  'dublin': [{ name: 'Dublin', country: 'IE', lat: 53.3498, lon: -6.2603 }],
  'copenhagen': [{ name: 'Copenhagen', country: 'DK', lat: 55.6761, lon: 12.5683 }],
  'prague': [{ name: 'Prague', country: 'CZ', lat: 50.0755, lon: 14.4378 }],
  'warsaw': [{ name: 'Warsaw', country: 'PL', lat: 52.2297, lon: 21.0122 }],
  'budapest': [{ name: 'Budapest', country: 'HU', lat: 47.4979, lon: 19.0402 }],
  'helsinki': [{ name: 'Helsinki', country: 'FI', lat: 60.1699, lon: 24.9384 }],
  'belgrade': [{ name: 'Belgrade', country: 'RS', lat: 44.7866, lon: 20.4489 }],
  
  // North American Cities
  'new york': [{ name: 'New York', country: 'US', lat: 40.7143, lon: -74.006 }],
  'los angeles': [{ name: 'Los Angeles', country: 'US', lat: 34.0522, lon: -118.2437 }],
  'chicago': [{ name: 'Chicago', country: 'US', lat: 41.8781, lon: -87.6298 }],
  'toronto': [{ name: 'Toronto', country: 'CA', lat: 43.6532, lon: -79.3832 }],
  'mexico city': [{ name: 'Mexico City', country: 'MX', lat: 19.4326, lon: -99.1332 }],
  'miami': [{ name: 'Miami', country: 'US', lat: 25.7617, lon: -80.1918 }],
  'vancouver': [{ name: 'Vancouver', country: 'CA', lat: 49.2827, lon: -123.1207 }],
  'san francisco': [{ name: 'San Francisco', country: 'US', lat: 37.7749, lon: -122.4194 }],
  'seattle': [{ name: 'Seattle', country: 'US', lat: 47.6062, lon: -122.3321 }],
  'boston': [{ name: 'Boston', country: 'US', lat: 42.3601, lon: -71.0589 }],
  
  // Asia & Oceania
  'tokyo': [{ name: 'Tokyo', country: 'JP', lat: 35.6895, lon: 139.6917 }],
  'sydney': [{ name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 }],
  'singapore': [{ name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 }],
  'hong kong': [{ name: 'Hong Kong', country: 'HK', lat: 22.3193, lon: 114.1694 }],
  'beijing': [{ name: 'Beijing', country: 'CN', lat: 39.9042, lon: 116.4074 }],
  'shanghai': [{ name: 'Shanghai', country: 'CN', lat: 31.2304, lon: 121.4737 }],
  'seoul': [{ name: 'Seoul', country: 'KR', lat: 37.5665, lon: 126.9780 }],
  'mumbai': [{ name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 }],
  'delhi': [{ name: 'Delhi', country: 'IN', lat: 28.6139, lon: 77.2090 }],
  'bangkok': [{ name: 'Bangkok', country: 'TH', lat: 13.7563, lon: 100.5018 }],
  'auckland': [{ name: 'Auckland', country: 'NZ', lat: -36.8509, lon: 174.7645 }],
  'melbourne': [{ name: 'Melbourne', country: 'AU', lat: -37.8136, lon: 144.9631 }],
  
  // Africa & Middle East
  'cairo': [{ name: 'Cairo', country: 'EG', lat: 30.0444, lon: 31.2357 }],
  'dubai': [{ name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 }],
  'cape town': [{ name: 'Cape Town', country: 'ZA', lat: -33.9249, lon: 18.4241 }],
  'nairobi': [{ name: 'Nairobi', country: 'KE', lat: -1.2921, lon: 36.8219 }],
  'casablanca': [{ name: 'Casablanca', country: 'MA', lat: 33.5731, lon: -7.5898 }],
  'istanbul': [{ name: 'Istanbul', country: 'TR', lat: 41.0082, lon: 28.9784 }],
  'tel aviv': [{ name: 'Tel Aviv', country: 'IL', lat: 32.0853, lon: 34.7818 }],
  
  // South American Cities
  'rio de janeiro': [{ name: 'Rio de Janeiro', country: 'BR', lat: -22.9068, lon: -43.1729 }],
  'buenos aires': [{ name: 'Buenos Aires', country: 'AR', lat: -34.6037, lon: -58.3816 }],
  'santiago': [{ name: 'Santiago', country: 'CL', lat: -33.4489, lon: -70.6693 }],
  'lima': [{ name: 'Lima', country: 'PE', lat: -12.0464, lon: -77.0428 }],
  'bogota': [{ name: 'Bogota', country: 'CO', lat: 4.7110, lon: -74.0721 }]
};

// Function to get mock weather data based on location
export const getMockWeather = (lat: number, lon: number): Weather => {
  // Get current month (0-11, where 0 is January)
  const currentMonth = new Date().getMonth();
  
  // Calculate seasonal effect (northern vs southern hemisphere)
  const isNorthernHemisphere = lat > 0;
  const seasonalOffset = isNorthernHemisphere 
    ? Math.sin((currentMonth / 12) * 2 * Math.PI) * 10 // Northern seasonal variation
    : Math.sin(((currentMonth + 6) / 12) * 2 * Math.PI) * 10; // Southern (inverted seasons)
  
  // Base temperature based on latitude - warmer at equator, cooler at poles
  // For April (spring in northern hemisphere), let's set a more reasonable base
  let baseTemp = 22 - Math.abs(lat) / 3 + seasonalOffset;
  
  // Make sure temperatures in populated areas aren't unreasonably cold
  if (Math.abs(lat) < 60) { // Most populated areas
    baseTemp = Math.max(baseTemp, 5); // Minimum reasonable temperature
  }
  
  // Add some east-west variation based on longitude
  const lonFactor = Math.sin(lon / 30) * 2;
  
  // Add small random variation
  const tempVariation = Math.random() * 4 - 2 + lonFactor;
  
  // Calculate final temperatures
  const currentTemp = baseTemp + tempVariation;
  const feelsLike = currentTemp - (Math.random() * 2);
  
  // Make wind stronger at higher latitudes
  const windSpeed = 3 + Math.abs(lat) / 10 + Math.random() * 3;
  
  // Higher humidity near the equator
  const humidity = 50 + (90 - Math.abs(lat)) / 2 + Math.random() * 20;
  
  return {
    current: {
      temp: parseFloat(currentTemp.toFixed(1)),
      feels_like: parseFloat(feelsLike.toFixed(1)),
      wind_speed: parseFloat(windSpeed.toFixed(1)),
      wind_deg: Math.floor(Math.random() * 360),
      humidity: Math.min(100, Math.floor(humidity)),
      visibility: 10000 - Math.floor(Math.random() * 3000),
      uvi: parseFloat((Math.random() * 8 + 1).toFixed(1)),
      weather: [
        {
          main: Math.random() > 0.7 ? 'Clouds' : 'Clear',
          description: Math.random() > 0.7 ? 'scattered clouds' : 'clear sky',
          icon: Math.random() > 0.7 ? '03d' : '01d'
        }
      ]
    },
    hourly: Array(24).fill(null).map((_, i) => {
      const hourTemp = currentTemp + Math.sin(i / 4) * 3;
      return {
        dt: Math.floor(Date.now() / 1000) + i * 3600,
        temp: parseFloat(hourTemp.toFixed(1)),
        feels_like: parseFloat((hourTemp - 1).toFixed(1)),
        pop: parseFloat((Math.random() * 0.5).toFixed(2)),
        weather: [
          {
            main: Math.random() > 0.7 ? 'Clouds' : 'Clear',
            description: Math.random() > 0.7 ? 'scattered clouds' : 'clear sky',
            icon: Math.random() > 0.7 ? '03d' : '01d' 
          }
        ]
      };
    })
  };
};

// Function to get mock air pollution data
export const getMockAirPollution = (): AirPollution => {
  const aqi = Math.floor(Math.random() * 3) + 1; // 1-3 for generally good air quality
  
  return {
    list: [
      {
        main: {
          aqi
        },
        components: {
          co: 350 + Math.random() * 200,
          no: 5 + Math.random() * 10,
          no2: 10 + Math.random() * 20,
          o3: 50 + Math.random() * 30,
          so2: 5 + Math.random() * 10,
          pm2_5: 10 + Math.random() * 15,
          pm10: 15 + Math.random() * 20,
          nh3: 2 + Math.random() * 5
        }
      }
    ]
  };
};

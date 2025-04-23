export interface Location {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

export interface WeatherCurrent {
  temp: number;
  feels_like: number;
  wind_speed: number;
  wind_deg: number;
  humidity: number;
  visibility: number;
  uvi: number;
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

export interface WeatherHourly {
  dt: number;
  temp: number;
  feels_like: number;
  pop: number;
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

export interface Weather {
  current: WeatherCurrent;
  hourly: WeatherHourly[];
}

export interface AirPollution {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }>;
}

export type AirQualityDescription = 'Good' | 'Fair' | 'Moderate' | 'Poor' | 'Very Poor';

export interface WeatherError {
  code: string;
  message: string;
}


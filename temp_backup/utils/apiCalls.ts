import { Location, Weather, AirPollution } from '../types/weather';

const getApiJson = <T>(url: string): Promise<T> => 
  fetch(url).then((response) => response.json());

export const getCityLoc = (city: string): Promise<Location[]> => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${import.meta.env.VITE_APIKEY}`;
  return fetch(url).then((response) => response.json());
};

export const getWeatherAndPollution = (lat: number, long: number): Promise<[Weather, AirPollution]> => {
  const urlWeather = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=metric&appid=${import.meta.env.VITE_APIKEY}`;

  const urlPollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_APIKEY}`;

  return Promise.all([
    getApiJson<Weather>(urlWeather), 
    getApiJson<AirPollution>(urlPollution)
  ]);
};

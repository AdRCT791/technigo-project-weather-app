import { API_KEY, UNITS } from './config.js';

export const getWeatherCurrent = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const getWeatherForecast = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}`
  );
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  return response.json();
};

export const getLocationName = async (lat, lon) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  return response.json();
};

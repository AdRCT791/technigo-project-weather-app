import { convertUnixToTime, getUserLocation } from './utils.js';
import {
  getWeatherCurrent,
  getWeatherForecast,
  getLocationName,
} from './api.js';

//  DOM Constants
const weatherCardHeader = document.getElementById('weather-header');
const weatherCurrentInfo = document.getElementById('weather-current-info');

document.addEventListener('DOMContentLoaded', async () => {
  // State
  let userLocation;
  let locationName;
  let currentWeatherData;
  let forecastWeatherData;

  try {
    // get data with API functions
    userLocation = await getUserLocation();
    locationName = await getLocationName(userLocation.lat, userLocation.lon);
    currentWeatherData = await getWeatherCurrent(
      userLocation.lat,
      userLocation.lon
    );
    forecastWeatherData = await getWeatherForecast(
      userLocation.lat,
      userLocation.lon
    );

    // Console log to see JSON data
    console.log(userLocation);
    console.log(locationName[0]);
    console.log(currentWeatherData);
    console.log(forecastWeatherData);
  } catch (error) {
    console.error('Error getting location', error.message);
  }

  // Rendering
  const displayLocation = () => {
    const title = document.createElement('h2');
    title.innerText = locationName[0].name.toUpperCase();
    weatherCardHeader.append(title);
    const span = document.createElement('span');
    span.innerText = `Sunrise: ${convertUnixToTime(
      currentWeatherData.sys.sunrise
    )}`;
    weatherCurrentInfo.append(span);
  };

  displayLocation();
});

import {
  convertUnixToTime,
  convertUnixToDate,
  getUserLocation,
  capitalizeFirstLetter,
} from './utils.js';
import {
  getWeatherCurrent,
  getWeatherForecast,
  getLocationName,
} from './api.js';
import { weatherConditions, funnyWeatherQuotes } from './const.js';

//  DOM Constants
const weatherCardHeader = document.getElementById('weather-header');
const weatherCurrentInfo = document.getElementById('weather-current-info');
const weatherQuote = document.getElementById('weather-quote');

document.addEventListener('DOMContentLoaded', async () => {
  // State
  let userLocation;
  let locationName;
  let currentWeatherData;
  let forecastWeatherData;
  let weather;

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

    console.log(currentWeatherData);

    // Create a weather Object to gather all useful data we want to display
    weather = {
      location: locationName[0].name,
      currentDate: convertUnixToDate(currentWeatherData.dt),
      sunrise: convertUnixToTime(currentWeatherData.sys.sunrise),
      sunset: convertUnixToTime(currentWeatherData.sys.sunset),
      feelsLike: currentWeatherData.main.feels_like,
      temperature: currentWeatherData.main.temp,
      description: currentWeatherData.weather[0].main,
    };
    console.log(weather);
  } catch (error) {
    console.error('Error getting location', error.message);
  }

  // Rendering
  const displayLocation = ({ location }) => {
    const title = document.createElement('span');
    title.innerText = location.toUpperCase();
    title.classList.add('location');
    weatherCardHeader.append(title);
  };

  const displayCurrentWeather = (weather) => {
    weatherCurrentInfo.innerHTML = '';
    const span = document.createElement('span');
    span.innerText = `${weather.description} | ${weather.temperature}°`;
    weatherCurrentInfo.append(span);
    const keys = ['sunrise', 'sunset'];
    keys.forEach((key) => {
      const span = document.createElement('span');
      span.innerHTML = `${capitalizeFirstLetter(key)} ${weather[key]}`;
      weatherCurrentInfo.append(span);
    });
  };

  const displayWeatherQuote = (weather) => {
    const weatherDescription = weather.description.toLowerCase();
    const index = weatherConditions.indexOf(weatherDescription);
    if (index !== -1) {
      weatherQuote.innerHTML = '';
      const p = document.createElement('p');
      p.innerText = funnyWeatherQuotes[index];
      p.classList.add('quote');
      weatherQuote.appendChild(p);
    } else {
      console.log('No matching quote found.');
    }
  };

  displayLocation(weather);
  displayCurrentWeather(weather);
  displayWeatherQuote(weather);
});

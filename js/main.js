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
import {
  weatherConditions,
  funnyWeatherQuotes,
  weatherIcons,
} from './const.js';

//  DOM Constants
const weatherCardHeader = document.getElementById('weather-header');
const weatherCurrentInfo = document.getElementById('weather-current-info');
const weatherQuote = document.getElementById('weather-quote');
const forecastWrapper = document.getElementById('weather-forecast');

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
      forecast: forecastWeatherData.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
      ),
    };
    console.log(weather);
  } catch (error) {
    console.error('Error getting location', error.message);
  }

  // Rendering functions
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
    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('icon-wrapper');
    if (index !== -1) {
      weatherQuote.innerHTML = '';
      const p = document.createElement('p');
      p.innerText = funnyWeatherQuotes[index];
      p.classList.add('quote');

      const icon = document.createElement('img');
      icon.src = weatherIcons[index];
      icon.alt = weatherConditions[index];
      iconWrapper.appendChild(icon);
      weatherQuote.append(iconWrapper, p);
    } else {
      console.log('No matching quote found.');
    }
  };

  const displayForecastWeather = ({ forecast }) => {
    forecast.forEach((day) => {
      const temp = Math.round(day.main.temp);
      const dateString = day.dt_txt.slice(0, 10);
      const date = new Date(dateString);
      const dayOfWeek = date.toLocaleDateString(undefined, {
        weekday: 'short',
      });

      const dayWrapper = document.createElement('div');
      dayWrapper.classList.add('day-wrapper');
      const spanDate = document.createElement('span');
      const spanTemp = document.createElement('span');
      spanDate.innerText = dayOfWeek;
      spanTemp.innerText = `${temp}°`;
      dayWrapper.append(spanDate, spanTemp);
      forecastWrapper.appendChild(dayWrapper);
    });
  };

  // Invoking render functions
  displayLocation(weather);
  displayCurrentWeather(weather);
  displayWeatherQuote(weather);
  displayForecastWeather(weather);
});

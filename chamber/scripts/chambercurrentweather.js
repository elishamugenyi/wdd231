const apiKey = '12f341f073de512a02800a32c662071f';
const entebbeLat = 0.05;
const entebbeLon = 32.46;

const entebbeCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${entebbeLat}&lon=${entebbeLon}&units=metric&appid=${apiKey}`;
const entebbeForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${entebbeLat}&lon=${entebbeLon}&units=metric&appid=${apiKey}`;

async function fetchWeatherData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function displayCurrentWeather(data) {
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('figcaption');

    currentTemp.innerHTML = `Current Temperature: ${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute('loading', 'lazy');
    captionDesc.textContent = `${desc}`;
}

function displayEntebbeForecast(data) {
    const forecastContainer = document.querySelector('#forecast');
    forecastContainer.innerHTML = '';

    if (data.list && Array.isArray(data.list)) {
        const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        dailyData.slice(0, 3).forEach(day => {
            const forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');

            const date = moment(day.dt_txt).format('MMMM Do, YYYY');
            const temp = `${day.main.temp}&deg;C`;
            const icon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
            const desc = day.weather[0].description;

            forecastCard.innerHTML = `
                <h3>${date}</h3>
                <img src="${icon}" alt="${desc}" loading="lazy" width="200" height="200">
                <p>${desc}</p>
                <p>Temperature: ${temp}</p>
            `;

            forecastContainer.appendChild(forecastCard);
        });
    } else {
        console.error('Invalid forecast data structure', data);
    }
}

function displayEntebbeTime() {
    const localTime = document.querySelector('#localTime');
    const entebbeTime = moment().tz("Africa/Kampala").format('HH:mm:ss');
    localTime.textContent = `Local Time in Entebbe: ${entebbeTime}`;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData(entebbeCurrentWeatherUrl)
        .then(displayCurrentWeather)
        .catch(error => console.error('Error fetching Entebbe current weather data:', error));

    fetchWeatherData(entebbeForecastUrl)
        .then(displayEntebbeForecast)
        .catch(error => console.error('Error fetching Entebbe forecast data:', error));

    displayEntebbeTime();
    setInterval(displayEntebbeTime, 1000);
});
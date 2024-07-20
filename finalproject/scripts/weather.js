/*function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    const info = 'data/hotel.json';
    const cards = document.querySelector('#hotels');
    const filterButton = document.getElementById('country');
    const tabLinks = document.querySelectorAll('.tablinks'); // Select all tab buttons

    let hotels = []; // Define hotels in the outer scope

    // Function to fetch data
    async function fetchMembers() {
        try {
            const response = await fetch(info);
            hotels = await response.json(); // Update hotels variable
            displayMembers(hotels);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }
    fetchMembers();

    // Function to display members
    const displayMembers = (hotels) => {
        hotels.forEach(hotel => {
            // Create elements to hold business descriptions
            let card = document.createElement('section');
            card.classList.add('hotel-card'); // Add a class for styling

            let name = document.createElement('h3');
            let city = document.createElement('p');
            let phone = document.createElement('p');
            let price = document.createElement('p');
            let portrait = document.createElement('img');

            // Build the h2 content
            name.textContent = `${hotel.name}`;

            // Build the p content
            city.textContent = `City: ${hotel.city}`;
            phone.textContent = `Contact: ${hotel.phone}`;
            price.textContent = `Price: ${hotel.price}`;

            // Build the portrait
            portrait.setAttribute('src', `images/${hotel.image}`);
            portrait.setAttribute('alt', `Portrait of ${hotel.name}`); 
            portrait.setAttribute('loading', 'lazy');
            portrait.setAttribute('width', '300');
            portrait.setAttribute('height', '250');

            // Append created elements to the section
            card.appendChild(portrait);
            card.appendChild(name);
            card.appendChild(city);
            card.appendChild(phone);
            card.appendChild(price);

            card.setAttribute('data-country', hotel.country); // Set custom attribute for filtering

            cards.appendChild(card);
        });
    }

    // Function to filter the hotels.
    filterButton.addEventListener('change', () => {
        const selectedCountry = filterButton.value;

        const cardElements = document.querySelectorAll('#hotels');
        cardElements.forEach(card => {
            if (selectedCountry === 'all' || card.getAttribute('data-country') === selectedCountry) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });

    // Add event listeners to tab buttons
    tabLinks.forEach(button => {
        button.addEventListener('click', (event) => {
            openTab(event, button.textContent.toLowerCase().replace(' ', '-'));

            // Remove active class from all buttons
            tabLinks.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
        });
    });
});

// Function to open tab content
function openTab(evt, tabName) {
    const tabcontent = document.querySelectorAll('.tabcontent');
    tabcontent.forEach(content => {
        content.style.display = 'none'; // Hide all tab contents
    });

    const tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach(link => {
        link.classList.remove('active'); // Remove active class from all buttons
    });

    document.getElementById(tabName).style.display = 'block'; // Show the clicked tab content
    evt.currentTarget.classList.add('active'); // Add active class to the clicked button
}*/

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
    const weatherContainer = document.querySelector('#weather'); // this is the container in my html with id weather-icon
    weatherContainer.innerHTML = ''; // Clear previous content

    const section = document.createElement('section');
    section.classList.add('current-weather');

    const weatherIcon = document.createElement('img');
    const currentTemp = document.createElement('p');
    const weatherDesc = document.createElement('p');
    const captionDesc = document.createElement('figcaption');

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;

    currentTemp.innerHTML = `Current Temperature: ${data.main.temp}&deg;C`;
    weatherDesc.innerHTML = `The Weather Today is:  ${desc}`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute('loading', 'lazy');
    weatherIcon.setAttribute('width','60');
    weatherIcon.setAttribute('height','70');
    //captionDesc.textContent = `${desc}`;

    section.appendChild(currentTemp);
    section.appendChild(weatherDesc);
    section.appendChild(weatherIcon);
    section.appendChild(captionDesc);

    weatherContainer.appendChild(section);
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
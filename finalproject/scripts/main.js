/*document.addEventListener('DOMContentLoaded', () => {
    const info = 'data/hotel.json';
    const cards = document.querySelector('#hotels');
    const filterButton = document.getElementById('country');

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

    // Function to display hotels
    const displayMembers = (hotels) => {
        hotels.forEach(hotel => {
            // Create elements to hold business descriptions
            let card = document.createElement('section');

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
            card.appendChild(name);
            card.appendChild(city);
            card.appendChild(phone);
            card.appendChild(price);
            card.appendChild(portrait);

            card.setAttribute('data-country', hotel.country); // Set custom attribute for filtering

            cards.appendChild(card);
        });
    }

    // Function to filter the hotels.
    filterButton.addEventListener('change', () => {
        const selectedCountry = filterButton.value;

        const cardElements = document.querySelectorAll('#hotels > section');
        cardElements.forEach(card => {
            if (selectedCountry === 'all' || card.getAttribute('data-country') === selectedCountry) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });
});
function openTab(evt, tabName) {
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
}*/

/*document.addEventListener('DOMContentLoaded', () => {
    const info = 'data/hotel.json';
    const cards = document.querySelector('#hotelList');
    const filterButton = document.getElementById('country');

    if (!cards) {
        console.error('Error: No element with id "hotelList" found.');
        return;
    }

    if (!filterButton) {
        console.error('Error: No element with id "country" found.');
        return;
    }

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

    // Function to display hotels
    const displayMembers = (hotels) => {
        hotels.forEach(hotel => {
            // Create elements to hold business descriptions
            let card = document.createElement('section');

            let name = document.createElement('h3');
            let city = document.createElement('p');
            let phone = document.createElement('p');
            let price = document.createElement('p');
            let portrait = document.createElement('img');

            // Build the h3 content
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
            card.appendChild(name);
            card.appendChild(city);
            card.appendChild(phone);
            card.appendChild(price);
            card.appendChild(portrait);

            card.setAttribute('data-country', hotel.country); // Set custom attribute for filtering

            cards.appendChild(card);
        });
    }

    // Function to filter the hotels.
    filterButton.addEventListener('change', () => {
        const selectedCountry = filterButton.value;

        const cardElements = document.querySelectorAll('#hotelList > section');
        cardElements.forEach(card => {
            if (selectedCountry === 'all' || card.getAttribute('data-country') === selectedCountry) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });
});*/

document.addEventListener('DOMContentLoaded', () => {
    async function fetchHotels() {
        try {
            const response = await fetch('data/hotel.json');
            const hotels = await response.json();
            return hotels;
        } catch (error) {
            console.error('Error fetching hotels:', error);
            return [];
        }
    }

    async function searchHotels() {
        const country = document.getElementById('country').value.toLowerCase();
        const city = document.getElementById('city').value.toLowerCase();
        const price = parseFloat(document.getElementById('price').value);

        const hotels = await fetchHotels();
        const results = hotels.filter(hotel => {
            const hotelCountry = hotel.country.toLowerCase();
            const hotelCity = hotel.city.toLowerCase();
            const hotelPrice = parseFloat(hotel.price.replace('$', ''));

            return (
                (country ? hotelCountry.includes(country) : true) &&
                (city ? hotelCity.includes(city) : true) &&
                (price ? hotelPrice <= price : true)
            );
        });

        displayResults(results);
    }

    function displayResults(results) {
        const hotelResults = document.getElementById('hotelResults');
        hotelResults.innerHTML = '';

        if (results.length === 0) {
            hotelResults.innerHTML = '<p>No hotels found.</p>';
            return;
        }

        results.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';

            hotelCard.innerHTML = `
                <h3>${hotel.name}</h3>
                <p>City: ${hotel.city}</p>
                <p>Country: ${hotel.country}</p>
                <p>Contact: ${hotel.phone}</p>
                <p>Price: ${hotel.price}</p>
                <img src="images/${hotel.image}" alt="Image of ${hotel.name}" loading="lazy" width="300" height="250">
            `;

            hotelResults.appendChild(hotelCard);
        });
    }
    document.getElementById('searchButton').addEventListener('click', searchHotels);
});

function openTab(evt, tabName) {
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
document.addEventListener('DOMContentLoaded', () => {
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
}

document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const modal = document.getElementById("bookingModal");
    const btn = document.getElementById("bookNowBtn");
    const span = document.getElementsByClassName("close")[0];

    //hide the modal initially
    modal.style.display = "none";

    //open the modal when button is clicked.
    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
        // Handle form submission
        document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the default way
    
            // Get form data
            const formData = {
                fullName: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value
            };
    
            // Store form data in localStorage
            localStorage.setItem('formData', JSON.stringify(formData));
    
            // Redirect to thank you page
            window.location.href = 'mybookings.html';
    
            //clear form after submission.
            form.reset();
        });
});
document.addEventListener('DOMContentLoaded', () => {
    const flightSearchForm = document.getElementById('flightSearchForm');
    const flightResults = document.getElementById('flightResults');

    flightSearchForm.onsubmit = function(event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(flightSearchForm);
        const searchParams = new URLSearchParams(formData).toString();

        // Fetch flight offers (replace 'your-api-endpoint' with the actual endpoint)
        fetch(`your-api-endpoint?${searchParams}`)
            .then(response => response.json())
            .then(data => {
                displayFlightResults(data);
            })
            .catch(error => {
                console.error('Error fetching flight offers:', error);
            });
    };

    function displayFlightResults(data) {
        // Clear previous results
        flightResults.innerHTML = '';

        // Check if there are any flight offers
        if (data.length === 0) {
            flightResults.innerHTML = '<p>No flight offers found.</p>';
            return;
        }

        // Display flight offers
        data.forEach(offer => {
            const offerDiv = document.createElement('div');
            offerDiv.classList.add('flight-offer');
            offerDiv.innerHTML = `
                <p>Origin: ${offer.originLocationCode}</p>
                <p>Destination: ${offer.destinationLocationCode}</p>
                <p>Departure Date: ${offer.departureDate}</p>
                <p>Return Date: ${offer.returnDate}</p>
                <p>Adults: ${offer.adults}</p>
                <p>Children: ${offer.children}</p>
                <p>Infants: ${offer.infants}</p>
                <p>Travel Class: ${offer.travelClass}</p>
                <p>Included Airlines: ${offer.includedAirlineCodes}</p>
            `;
            flightResults.appendChild(offerDiv);
        });
    }
});


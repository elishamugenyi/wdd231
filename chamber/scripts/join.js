document.addEventListener('DOMContentLoaded', function() {
    // Set current timestamp in the hidden field
    //document.getElementById('timestamp').value = new Date().toISOString();
    // Set current timestamp in the hidden field
    /*const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    } else {
        console.error("Element with ID 'timestamp' not found.");
    }*/

    // Modal handling for membership levels
    const modalTrigger = document.querySelector('#membershipModalTrigger');
    const modal = document.getElementById('membershipModal');

    modalTrigger.addEventListener('click', function() {
        modal.showModal();
    });

    const closeModalBtn = modal.querySelector('button');
    closeModalBtn.addEventListener('click', function() {
        modal.close();
    });

    // Form submission handling
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(form);
        const entries = formData.entries();

        // Constructing the query string for displaying on thankyou.html
        let queryString = '';
        for (const [key, value] of entries) {
            queryString += `${key}=${encodeURIComponent(value)}&`;
        }
        // Remove the last '&' character
        queryString = queryString.slice(0, -1);

        // Redirect to thankyou.html with query string
        window.location.href = `thankyou.html?${queryString}`;

        // Clear the form after submission
        form.reset();
    });

    
});

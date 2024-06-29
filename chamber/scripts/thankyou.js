document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formData = document.getElementById('formData');

    // Iterate over each parameter in the query string
    for (const [key, value] of urlParams) {
        const p = document.createElement('p');
        p.textContent = `${key}: ${value}`;
        formData.appendChild(p);
    }
});
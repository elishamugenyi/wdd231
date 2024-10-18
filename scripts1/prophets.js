//declare variable url that holds the url with the json data for prophets.

const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData () {
    const response = await fetch(url);
    const data = await response.json();

    //console.table(data.prophets); //console statment to just read the table
    displayProphets(data.prophets); // note that we reference the prophets array of the JSON data object, not just the object
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
      // Create elements to add to the div.cards element
      let card = document.createElement('section');

      let fullName = document.createElement('h2'); // fill in the blank
      let birthdate = document.createElement('p');//element that will hold the birthdate info, just like other info.
      let birthplace = document.createElement('p');
      let death = document.createElement('p');
      let service = document.createElement('P');
      let order = document.createElement('P');
      let numberofChildren = document.createElement('P');
      let portrait = document.createElement('img');
      
  
      // Build the h2 content out to show the prophet's full name
      fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank

      //Build the p content to show the information of each prophet.
      birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
      birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;
      death.textContent = `Date of Death: ${prophet.death}`;
      service.textContent = `lenght of Service: ${prophet.length}`;
      order.textContent = `Heirarchical Order: ${prophet.order}`;
      numberofChildren.textContent = `Number of Children: ${prophet.numofchildren}`;

     
      // Build the image portrait by setting all the relevant attributes
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');
  
      // Append the section(card) with the created elements
      card.appendChild(fullName); //fill in the blank
      card.appendChild(birthdate);
      card.appendChild(birthplace);
      card.appendChild(death);
      card.appendChild(service);
      card.appendChild(order);
      card.appendChild(numberofChildren);
      card.appendChild(portrait);
 
      cards.appendChild(card);
      
    }); // end of arrow function and forEach loop
  }
//  Fetch and display chamber members
async function getMembers(membersDirectory) {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error('Network response was not ok');
    const members = await response.json();
    displayMembers(members, membersDirectory);
  } catch (error) {
    membersDirectory.innerHTML = `<p>Failed to load members: ${error.message}</p>`;
  }
}

function displayMembers(members, membersDirectory) {
  membersDirectory.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    let membershipText = '';
    switch (member.membershipLevel) {
      case 3: membershipText = 'Gold Member'; break;
      case 2: membershipText = 'Silver Member'; break;
      default: membershipText = 'Member';
    }

    const img = document.createElement('img');
    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;
    img.loading = 'lazy';

    const info = document.createElement('div');

    const name = document.createElement('h3');
    name.textContent = member.name;

    const level = document.createElement('p');
    level.textContent = membershipText;
    level.classList.add('membership-level');

    const desc = document.createElement('p');
    desc.textContent = member.description;

    const address = document.createElement('p');
    address.textContent = member.address;

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${member.phone}`;

    const website = document.createElement('a');
    website.href = member.website;
    website.textContent = 'Visit Website';
    website.target = '_blank';
    website.rel = 'noopener';

    info.append(name, level, desc, address, phone, website);
    card.append(img, info);
    membersDirectory.appendChild(card);
  });
}

// ✅ View toggle
function setGridView(membersDirectory, gridBtn, listBtn) {
  membersDirectory.classList.add('grid-view');
  membersDirectory.classList.remove('list-view');
  gridBtn?.setAttribute('aria-pressed', 'true');
  listBtn?.setAttribute('aria-pressed', 'false');
}
const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
});


function setListView(membersDirectory, gridBtn, listBtn) {
  membersDirectory.classList.add('list-view');
  membersDirectory.classList.remove('grid-view');
  listBtn?.setAttribute('aria-pressed', 'true');
  gridBtn?.setAttribute('aria-pressed', 'false');
}

// ✅ Fetch current weather for Lagos
async function fetchWeather() {
  const apiKey = '2d4da22b568436fcf7b5811f5290e5bf'; 
  const lat = 6.52;  
  const lon = 3.39; 
  const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=6.52&lon=3.39&exclude=minutely,hourly,alerts&units=imperial&appid=2d4da22b568436fcf7b5811f5290e5bf';

  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw new Error(`Weather fetch failed: ${response.status}`);
    
    const data = await response.json();

    if (!data.current) {
      throw new Error('No current weather data found');
    }

    const current = data.current;

    document.getElementById('currentWeather').innerHTML = `
      ${current.weather[0].description}<br>
      Temp: ${current.temp}°F
    `;

    // Continue with forecast display...

  } catch (error) {
    
    document.getElementById('currentWeather').textContent = "Unable to fetch weather.";
  }
}

// ✅ Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  const membersDirectory = document.getElementById('membersDirectory');
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');

  if (membersDirectory && gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => setGridView(membersDirectory, gridBtn, listBtn));
    listBtn.addEventListener('click', () => setListView(membersDirectory, gridBtn, listBtn));
    
    getMembers(membersDirectory);
    setGridView(membersDirectory, gridBtn, listBtn); // ← ✅ now safe to call
  } else {
    console.error("One or more DOM elements are missing.");
  }

  fetchWeather(); 
});

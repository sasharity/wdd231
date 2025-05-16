const membersDirectory = document.getElementById('membersDirectory');
const gridBtn = document.getElementById('gridViewBtn');
const listBtn = document.getElementById('listViewBtn');

// Fetch and display chamber members
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error('Network response was not ok');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersDirectory.innerHTML = `<p>Failed to load members: ${error.message}</p>`;
  }
}

function displayMembers(members) {
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

// View toggle
function setGridView() {
  membersDirectory.classList.add('grid-view');
  membersDirectory.classList.remove('list-view');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
}

function setListView() {
  membersDirectory.classList.add('list-view');
  membersDirectory.classList.remove('grid-view');
  listBtn.setAttribute('aria-pressed', 'true');
  gridBtn.setAttribute('aria-pressed', 'false');
}

gridBtn.addEventListener('click', setGridView);
listBtn.addEventListener('click', setListView);

// ✅ Fetch current weather for Lagos
async function fetchWeather() {
  const apiKey = "be250fefa01b1695cb50715cd0b1496d";
  const lat = 6.4541;
  const lon = 3.3947;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather fetch failed.");
    const data = await response.json();

    const weatherDesc = data.weather[0].description;
    const temp = data.main.temp.toFixed(1);
    const high = data.main.temp_max.toFixed(1);
    const low = data.main.temp_min.toFixed(1);
    const humidity = data.main.humidity;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('currentWeather').innerHTML = `
      ${weatherDesc.toUpperCase()}<br>
      🌡 Temp: ${temp}°C (H: ${high}°C, L: ${low}°C)<br>
      💧 Humidity: ${humidity}%<br>
      🌅 Sunrise: ${sunrise}<br>
      🌇 Sunset: ${sunset}
    `;
  } catch (err) {
    document.getElementById('currentWeather').textContent = "Unable to fetch weather.";
  }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  getMembers();
  setGridView();
  fetchWeather();
});

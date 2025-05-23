const spotlightContainer = document.querySelector('.spotlights');

async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();

    const levelMap = {
      3: "gold",
      2: "silver",
      1: "bronze"
    };

    const qualified = data.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight');

      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} logo">
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        <p class="level">${levelMap[member.membershipLevel]} Member</p>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Spotlight loading failed:', error);
  }
}

loadSpotlights();
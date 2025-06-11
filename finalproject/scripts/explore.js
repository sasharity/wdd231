const cardsContainer = document.querySelector('#places-grid');
const modal = document.querySelector('#modal');
const modalDetails = document.querySelector('#modalDetails');
const closeModalBtn = document.querySelector('#closeModal');

async function loadData() {
  try {
    const response = await fetch('data/lagos-places.json');
    const data = await response.json();
    displayCards(data.places);
  } catch (error) {
    cardsContainer.innerHTML = '<p>Failed to load data.</p>';
    console.error('Error fetching JSON:', error);
  }
}

function displayCards(items) {
  items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p>${item.type}</p>
      <p>${item.location}</p>
    `;

    card.addEventListener('click', () => {
      showModal(item);
    });

    cardsContainer.appendChild(card);
  });
}

function showModal(item) {
  modalDetails.innerHTML = `
    <h3>${item.name}</h3>
    <p><strong>Type:</strong> ${item.type}</p>
    <p><strong>Location:</strong> ${item.location}</p>
    <p>${item.description}</p>
  `;
  modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

loadData();

// Optional: update footer year
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

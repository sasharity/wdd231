document.addEventListener("DOMContentLoaded", () => {
  fetch("data/discover.json")
    .then(res => res.json())
    .then(data => {
      const section = document.querySelector(".discover-grid");
      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure><img src="${item.image}" alt="${item.name}"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        section.appendChild(card);
      });
    });
});

const messageArea = document.createElement("div");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  messageArea.textContent = daysPassed === 0
    ? "Back so soon! Awesome!"
    : `You last visited ${daysPassed} day${daysPassed > 1 ? "s" : ""} ago.`;
}
document.querySelector("main").prepend(messageArea);
localStorage.setItem("lastVisit", now);

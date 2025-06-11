// nav.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector("#menu-toggle");
  const navLinks = document.querySelector("nav ul");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
});

const currentPage = location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});


window.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Last Modified Date
  const lastModSpan = document.getElementById('lastModified');
  if (lastModSpan) {
    lastModSpan.textContent = document.lastModified;
  }
});

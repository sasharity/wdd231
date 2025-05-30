
    // Set timestamp on form load
    document.getElementById("timestamp").value = new Date().toISOString();

    // Open modals on anchor click
    document.querySelectorAll('.membership-cards a').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const modal = document.querySelector(link.getAttribute('href'));
        modal.showModal();
      });
    });
const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Shared by every page of the site
// Mobile menu toggle
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

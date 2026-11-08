// Native details keep navigation and FAQs usable without JavaScript.
// This small enhancement dismisses the mobile menu and restores focus on Escape.
const menu = document.querySelector('.mobile-menu');
if (menu) {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
    if (event.matches) menu.open = false;
  });
}

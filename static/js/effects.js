const header = document.getElementById('main-header');

if (header) {
  const nav = document.getElementById('header-nav-menu');
  const offset = header.offsetHeight + 20;

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

document.querySelector('.about__tech-stack')?.addEventListener('click', (event) => {
  const tag = event.target.closest('.about__tech-item');
  if (!tag) return;
  const query = encodeURIComponent(tag.textContent.trim());
  window.open(`https://www.google.com/search?q=${query}`, '_blank');
});
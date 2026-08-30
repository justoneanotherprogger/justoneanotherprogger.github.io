/**
 * Облако тегов — staggered-анимации (раскладка — CSS flex)
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container) return;

  const tags = Array.from(container.querySelectorAll('.about__tech-item'));
  if (tags.length === 0) return;

  // Сортируем по весу (крупные первыми)
  tags.sort((a, b) => {
    const wa = parseInt((Array.from(a.classList).find(c => c.startsWith('tag-w')) || 'tag-w3').replace('tag-w', ''));
    const wb = parseInt((Array.from(b.classList).find(c => c.startsWith('tag-w')) || 'tag-w3').replace('tag-w', ''));
    return wb - wa;
  });

  // Применяем staggered-анимацию
  tags.forEach((tag, i) => {
    tag.style.animation = `tagAppear 0.4s ease-out ${i * 0.07}s both, tagFloat ${3 + Math.random() * 2}s ease-in-out ${0.5 + i * 0.1}s infinite`;
  });
}

document.addEventListener('DOMContentLoaded', initTagCloud);

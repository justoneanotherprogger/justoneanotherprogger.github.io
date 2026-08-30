/**
 * Облако тегов — тяжёлые в центре, лёгкие по краям
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container) return;

  const tags = Array.from(container.querySelectorAll('.about__tech-item'));
  if (tags.length === 0) return;

  // Средние высоты строк по весам (из CSS font-size × line-height)
  const sizeMap = { 1: 16, 2: 18, 3: 21, 4: 24, 5: 28 };

  const tagData = tags.map((tag, i) => {
    const wc = Array.from(tag.classList).find(c => c.startsWith('tag-w'));
    const w = wc ? parseInt(wc.replace('tag-w', '')) : 3;
    // ширина приблизительная — длина текста × размер
    const estWidth = tag.textContent.trim().length * sizeMap[w] * 0.55;
    return { element: tag, weight: w, estWidth, height: sizeMap[w] + 8 };
  });

  // Контейнер
  const W = 420, H = 340;
  container.style.position = 'relative';
  container.style.width = `${W}px`;
  container.style.height = `${H}px`;
  container.style.maxWidth = '100%';

  const cx = W / 2, cy = H / 2;

  // Сортируем: тяжёлые первые (в центре)
  tagData.sort((a, b) => b.weight - a.weight);

  // Размещаем: тяжёлые ближе к центру, лёгкие по краям + хаос
  tagData.forEach((tag, i) => {
    const angle = Math.random() * Math.PI * 2; // полный хаос по углу
    const maxR = Math.min(W, H) * 0.38;
    // Вес определяет базовый радиус, random заполняет пространство
    const baseR = (1 - tag.weight / 6) * maxR;
    const r = baseR + Math.random() * baseR * 0.6;

    let x = cx + r * Math.cos(angle) - tag.estWidth / 2;
    let y = cy + r * Math.sin(angle) - tag.height / 2;

    // Ограничиваем
    x = Math.max(4, Math.min(x, W - tag.estWidth - 4));
    y = Math.max(4, Math.min(y, H - tag.height - 4));

    tag.x = x;
    tag.y = y;
  });

  // Простое отталкивание (без замеров)
  const GAP = 4;
  for (let iter = 0; iter < 80; iter++) {
    for (let i = 0; i < tagData.length; i++) {
      for (let j = i + 1; j < tagData.length; j++) {
        const a = tagData[i], b = tagData[j];
        const ox = Math.min(a.x + a.estWidth + GAP, b.x + b.estWidth + GAP) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.height + GAP, b.y + b.height + GAP) - Math.max(a.y, b.y);

        if (ox > 0 && oy > 0) {
          const dx = (b.x + b.estWidth / 2) - (a.x + a.estWidth / 2);
          const dy = (b.y + b.height / 2) - (a.y + a.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = dx / dist, ny = dy / dist;
          const f = Math.max(ox, oy) * 0.8;
          // Тяжёлые меньше сдвигаются, лёгкие уступают
          const tw = a.weight + b.weight;
          a.x -= nx * f * (b.weight / tw);
          a.y -= ny * f * (b.weight / tw);
          b.x += nx * f * (a.weight / tw);
          b.y += ny * f * (a.weight / tw);
        }
      }
    }
  }

  // Применяем
  tagData.forEach((tag, i) => {
    const el = tag.element;
    tag.x = Math.max(2, Math.min(tag.x, W - tag.estWidth - 2));
    tag.y = Math.max(2, Math.min(tag.y, H - tag.height - 2));

    el.style.position = 'absolute';
    el.style.left = `${tag.x}px`;
    el.style.top = `${tag.y}px`;
    el.style.whiteSpace = 'nowrap';

    el.style.animation = `tagAppear 0.4s ease-out ${i * 0.07}s both, tagFloat ${3 + Math.random() * 2}s ease-in-out ${0.5 + i * 0.1}s infinite`;
  });
}

document.addEventListener('DOMContentLoaded', initTagCloud);

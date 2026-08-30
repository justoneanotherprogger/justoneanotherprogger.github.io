/**
 * Динамическое облако тегов — отталкивание + динамический размер
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container) return;

  const tags = Array.from(container.querySelectorAll('.about__tech-item'));
  if (tags.length === 0) return;

  // Измеряем теги в потоке (пока не тронуты)
  const tagData = tags.map((tag, index) => {
    const weightClass = Array.from(tag.classList).find(c => c.startsWith('tag-w'));
    const weight = weightClass ? parseInt(weightClass.replace('tag-w', '')) : 3;
    const rect = tag.getBoundingClientRect();
    return { element: tag, weight, index, width: rect.width, height: rect.height, x: 0, y: 0 };
  });

  // Считаем общую площадь тегов с зазорами
  const GAP = 6;
  const totalArea = tagData.reduce((sum, t) => sum + (t.width + GAP) * (t.height + GAP), 0);

  // Контейнер — квадрат,足够大的 чтобы вместить всё с запасом
  const side = Math.ceil(Math.sqrt(totalArea * 1.4));
  const W = Math.max(side, 350);
  const H = Math.max(side, 400);

  container.style.position = 'relative';
  container.style.width = `${W}px`;
  container.style.height = `${H}px`;
  container.style.margin = '0 auto';

  const cx = W / 2, cy = H / 2;

  // Начальные позиции: случайно вокруг центра, крупные ближе
  tagData.forEach(tag => {
    const angle = Math.random() * Math.PI * 2;
    const spread = (1 - tag.weight / 6) * Math.min(W, H) * 0.3 + Math.random() * 20;
    tag.x = cx + Math.cos(angle) * spread - tag.width / 2;
    tag.y = cy + Math.sin(angle) * spread - tag.height / 2;
  });

  // Сортируем по весу
  tagData.sort((a, b) => b.weight - a.weight);

  // Итерации отталкивания + притяжение к центру
  const ITERS = 200;
  const GRAVITY = 0.02;

  for (let iter = 0; iter < ITERS; iter++) {
    for (let i = 0; i < tagData.length; i++) {
      for (let j = i + 1; j < tagData.length; j++) {
        const a = tagData[i], b = tagData[j];

        // Центры
        const ax = a.x + a.width / 2, ay = a.y + a.height / 2;
        const bx = b.x + b.width / 2, by = b.y + b.height / 2;

        // Коллизия?
        const ox = Math.min(a.x + a.width + GAP, b.x + b.width + GAP) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.height + GAP, b.y + b.height + GAP) - Math.max(a.y, b.y);

        if (ox > 0 && oy > 0) {
          let dx = bx - ax, dy = by - ay;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.1) {
            const r = Math.random() * Math.PI * 2;
            dx = Math.cos(r); dy = Math.sin(r);
          } else {
            dx /= dist; dy /= dist;
          }

          const force = Math.max(ox, oy) * 1.2;
          const tw = a.weight + b.weight;

          a.x -= dx * force * (b.weight / tw);
          a.y -= dy * force * (b.weight / tw);
          b.x += dx * force * (a.weight / tw);
          b.y += dy * force * (a.weight / tw);
        }
      }
    }

    // Притяжение к центру (гравитация)
    tagData.forEach(tag => {
      const ax = tag.x + tag.width / 2;
      const ay = tag.y + tag.height / 2;
      tag.x += (cx - ax) * GRAVITY;
      tag.y += (cy - ay) * GRAVITY;
    });
  }

  // Финальное применение
  tagData.forEach((tag, index) => {
    const el = tag.element;

    tag.x = Math.max(0, Math.min(tag.x, W - tag.width));
    tag.y = Math.max(0, Math.min(tag.y, H - tag.height));

    el.style.position = 'absolute';
    el.style.left = `${tag.x}px`;
    el.style.top = `${tag.y}px`;
    el.style.whiteSpace = 'nowrap';

    el.style.opacity = '0';
    el.style.transform = 'scale(0)';
    el.style.animation = `tagAppear 0.4s ease-out ${index * 0.06}s forwards`;

    const floatDelay = 0.5 + index * 0.08;
    const floatDuration = 3 + Math.random() * 2;
    el.style.animation += `, tagFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`;
  });
}

document.addEventListener('DOMContentLoaded', initTagCloud);

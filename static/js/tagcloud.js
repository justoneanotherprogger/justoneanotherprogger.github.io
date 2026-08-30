/**
 * Динамическое облако тегов — физическое отталкивание
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container) return;

  const tags = Array.from(container.querySelectorAll('.about__tech-item'));
  if (tags.length === 0) return;

  // Измеряем теги
  const tagData = tags.map((tag, index) => {
    const weightClass = Array.from(tag.classList).find(c => c.startsWith('tag-w'));
    const weight = weightClass ? parseInt(weightClass.replace('tag-w', '')) : 3;
    const rect = tag.getBoundingClientRect();
    return { element: tag, weight, index, width: rect.width, height: rect.height, x: 0, y: 0 };
  });

  // Параметры контейнера
  const W = 350, H = 400;
  container.style.position = 'relative';
  container.style.width = `${W}px`;
  container.style.height = `${H}px`;
  const cx = W / 2, cy = H / 2;

  // Сортируем по весу (крупные первые)
  tagData.sort((a, b) => b.weight - a.weight);

  // Начальные позиции: случайный разброс вокруг центра
  // Крупные ближе к центру, мелкие дальше
  tagData.forEach((tag, i) => {
    const angle = Math.random() * Math.PI * 2;
    const maxSpread = 80;
    const spread = maxSpread * (1 - tag.weight / 6) + Math.random() * 30;
    tag.x = cx + Math.cos(angle) * spread - tag.width / 2;
    tag.y = cy + Math.sin(angle) * spread - tag.height / 2;
  });

  // Физика: отталкивание при коллизиях
  const GAP = 3;
  const ITERS = 120;

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
          // Направление от a к b
          let dx = bx - ax, dy = by - ay;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.1) {
            // Совпадают почти полностью — рандомный вектор
            const randAngle = Math.random() * Math.PI * 2;
            dx = Math.cos(randAngle);
            dy = Math.sin(randAngle);
          } else {
            dx /= dist;
            dy /= dist;
          }

          // Сила отталкивания пропорциональна площади перекрытия
          const force = Math.sqrt(ox * oy);

          // Тяжёлые теги меньше сдвигаются
          const totalWeight = a.weight + b.weight;
          const aRatio = b.weight / totalWeight;
          const bRatio = a.weight / totalWeight;

          a.x -= dx * force * aRatio;
          a.y -= dy * force * aRatio;
          b.x += dx * force * bRatio;
          b.y += dy * force * bRatio;
        }
      }
    }
  }

  // Применяем позиции
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

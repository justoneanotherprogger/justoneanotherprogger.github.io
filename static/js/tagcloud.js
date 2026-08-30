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
    return {
      element: tag,
      weight,
      index,
      width: rect.width,
      height: rect.height,
      x: 0,
      y: 0,
    };
  });

  // Параметры контейнера
  const containerWidth = 350;
  const containerHeight = 400;
  container.style.position = 'relative';
  container.style.width = `${containerWidth}px`;
  container.style.height = `${containerHeight}px`;

  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  // Все теги начинают в центре
  tagData.forEach(tag => {
    tag.x = centerX - tag.width / 2;
    tag.y = centerY - tag.height / 2;
  });

  // Сортируем по весу — крупные стабильнее
  tagData.sort((a, b) => b.weight - a.weight);

  // Физика: отталкивание при коллизиях
  const GAP = 4;
  const ITERATIONS = 50;

  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (let i = 0; i < tagData.length; i++) {
      for (let j = i + 1; j < tagData.length; j++) {
        const a = tagData[i];
        const b = tagData[j];

        // Проверяем коллизию
        const overlapX = Math.min(a.x + a.width + GAP, b.x + b.width + GAP) - Math.max(a.x, b.x);
        const overlapY = Math.min(a.y + a.height + GAP, b.y + b.height + GAP) - Math.max(a.y, b.y);

        if (overlapX > 0 && overlapY > 0) {
          // Есть коллизия — отталкиваем
          const pushX = overlapX / 2;
          const pushY = overlapY / 2;

          // Менее весомый тег отодвигается сильнее
          const ratio = b.weight / (a.weight + b.weight);

          a.x -= pushX * ratio;
          a.y -= pushY * ratio;
          b.x += pushX * (1 - ratio);
          b.y += pushY * (1 - ratio);
        }
      }
    }
  }

  // Применяем позиции и ограничиваем границами
  tagData.forEach((tag, index) => {
    const el = tag.element;

    // Ограничиваем
    tag.x = Math.max(0, Math.min(tag.x, containerWidth - tag.width));
    tag.y = Math.max(0, Math.min(tag.y, containerHeight - tag.height));

    el.style.position = 'absolute';
    el.style.left = `${tag.x}px`;
    el.style.top = `${tag.y}px`;
    el.style.whiteSpace = 'nowrap';

    // Анимация появления
    el.style.opacity = '0';
    el.style.transform = 'scale(0)';
    el.style.animation = `tagAppear 0.4s ease-out ${index * 0.06}s forwards`;

    // Плавание
    const floatDelay = 0.4 + index * 0.08;
    const floatDuration = 3 + Math.random() * 2;
    el.style.animation += `, tagFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`;
  });
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', initTagCloud);

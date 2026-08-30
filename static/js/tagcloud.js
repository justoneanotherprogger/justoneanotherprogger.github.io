/**
 * Динамическое облако тегов — спиральное расположение + анимации
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container) return;

  const tags = Array.from(container.querySelectorAll('.about__tech-item'));
  if (tags.length === 0) return;

  // Измеряем теги в потоке
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
    };
  });

  // Сортируем по весу (крупные в центре)
  tagData.sort((a, b) => b.weight - a.weight);

  // Параметры контейнера
  const containerWidth = 350;
  const containerHeight = 400;
  container.style.position = 'relative';
  container.style.width = `${containerWidth}px`;
  container.style.height = `${containerHeight}px`;

  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  // Размещаем теги — каждый следующий на расстоянии от предыдущего
  const placed = []; // уже размещённые теги

  tagData.forEach((tag, index) => {
    const el = tag.element;
    el.style.position = 'absolute';
    el.style.whiteSpace = 'nowrap';

    // Начинаем с центра, идём по спирали
    let angle = index * 0.9; // шаг угла
    let radius = 0;
    let x, y;
    let found = false;

    // Ищем позицию без коллизий
    for (let r = 0; r < 200; r += 5) {
      const testX = centerX + r * Math.cos(angle) - tag.width / 2;
      const testY = centerY + r * Math.sin(angle) - tag.height / 2;

      // Проверяем границы
      if (testX < 0 || testX + tag.width > containerWidth) continue;
      if (testY < 0 || testY + tag.height > containerHeight) continue;

      // Проверяем коллизии с размещёнными тегами
      let collision = false;
      for (const p of placed) {
        if (
          testX < p.x + p.width + 4 &&
          testX + tag.width + 4 > p.x &&
          testY < p.y + p.height + 4 &&
          testY + tag.height + 4 > p.y
        ) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        x = testX;
        y = testY;
        found = true;
        break;
      }
    }

    // Если не нашли позицию — ставим в центр с randomness
    if (!found) {
      x = centerX + (Math.random() - 0.5) * 100 - tag.width / 2;
      y = centerY + (Math.random() - 0.5) * 100 - tag.height / 2;
    }

    // Ограничиваем
    x = Math.max(0, Math.min(x, containerWidth - tag.width));
    y = Math.max(0, Math.min(y, containerHeight - tag.height));

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    placed.push({ x, y, width: tag.width, height: tag.height });

    // Анимация появления
    el.style.opacity = '0';
    el.style.transform = 'scale(0)';
    el.style.animation = `tagAppear 0.4s ease-out ${index * 0.08}s forwards`;

    // Плавание
    const floatDelay = 0.5 + index * 0.1;
    const floatDuration = 3 + Math.random() * 2;
    el.style.animation += `, tagFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`;
  });
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', initTagCloud);

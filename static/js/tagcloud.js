/**
 * Динамическое облако тегов — спиральное расположение + анимации
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container) return;

  const tags = Array.from(container.querySelectorAll('.about__tech-item'));
  if (tags.length === 0) return;

  // Сначала измеряем все теги (пока они в потоке)
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

  // Сортируем по весу (крупные первые — в центре)
  tagData.sort((a, b) => b.weight - a.weight);

  // Задаём контейнеру фиксированную высоту до позиционирования
  const containerWidth = 350;
  const containerHeight = 400;
  container.style.position = 'relative';
  container.style.width = `${containerWidth}px`;
  container.style.height = `${containerHeight}px`;

  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  // Размещаем теги по спирали
  tagData.forEach((tag, index) => {
    const el = tag.element;

    // Делаем абсолютно позиционированным
    el.style.position = 'absolute';
    el.style.whiteSpace = 'nowrap';

    // Формула спирали — tighter spacing
    const angle = index * 1.1;
    const radius = 15 + index * 30;

    // Вычисляем координаты (от центра контейнера)
    let x = centerX + radius * Math.cos(angle) - tag.width / 2;
    let y = centerY + radius * Math.sin(angle) - tag.height / 2;

    // Ограничиваем границами
    x = Math.max(5, Math.min(x, containerWidth - tag.width - 5));
    y = Math.max(5, Math.min(y, containerHeight - tag.height - 5));

    // Применяем позицию
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

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

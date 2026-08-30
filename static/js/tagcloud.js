/**
 * Динамическое облако тегов — спиральное расположение + анимации
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container) return;

  const tags = Array.from(container.querySelectorAll('.about__tech-item'));
  if (tags.length === 0) return;

  // Получаем данные о весе из CSS-классов
  const tagData = tags.map((tag, index) => {
    const weightClass = Array.from(tag.classList).find(c => c.startsWith('tag-w'));
    const weight = weightClass ? parseInt(weightClass.replace('tag-w', '')) : 3;
    return { element: tag, weight, index };
  });

  // Сортируем по весу (крупные первые — они будут в центре)
  tagData.sort((a, b) => b.weight - a.weight);

  // Параметры спирали
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const maxRadius = Math.min(containerWidth, containerHeight) / 2 - 50;

  // Размещаем теги по спирали
  tagData.forEach((tag, index) => {
    const angle = index * 0.8; // шаг угла
    const radiusStep = maxRadius / tagData.length;
    const radius = radiusStep * index; // расстояние от центра

    // Вычисляем координаты
    const x = centerX + radius * Math.cos(angle) - tag.element.offsetWidth / 2;
    const y = centerY + radius * Math.sin(angle) - tag.element.offsetHeight / 2;

    // Применяем позицию
    tag.element.style.position = 'absolute';
    tag.element.style.left = `${x}px`;
    tag.element.style.top = `${y}px`;

    // Анимация появления с задержкой
    tag.element.style.opacity = '0';
    tag.element.style.transform = 'scale(0)';
    tag.element.style.animation = `tagAppear 0.5s ease-out ${index * 0.1}s forwards`;

    // Добавляем плавание
    tag.element.style.animation += `, tagFloat ${3 + Math.random() * 2}s ease-in-out ${index * 0.1}s infinite`;
  });

  // Делаем контейнер относительным для позиционирования
  container.style.position = 'relative';
  container.style.minHeight = `${maxRadius * 2 + 100}px`;
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', initTagCloud);

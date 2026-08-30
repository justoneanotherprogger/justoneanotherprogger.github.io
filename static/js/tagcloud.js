/**
 * Облако тегов — wordcloud2.js (плотная упаковка)
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container || typeof WordCloud === 'undefined') return;

  // Убираем существующие теги — wordcloud2 создаст свои span'ы
  container.innerHTML = '';
  container.style.position = 'relative';
  container.style.width = '420px';
  container.style.height = '340px';
  container.style.maxWidth = '100%';
  container.style.margin = '0 auto';

  // Данные из оригинального templates
  const tagList = [
    ['Python', 5],
    ['LLM', 5],
    ['AI Agents', 4],
    ['LLM Orchestration', 4],
    ['Prompt Engineering', 4],
    ['Rust', 3],
    ['egui', 3],
    ['AQA', 3],
    ['pytest', 2],
    ['Postman', 2],
    ['Docker', 1],
  ];

  // CSS-классы по весам (из style.css)
  const weightClasses = {
    5: 'about__tech-item tag-w5',
    4: 'about__tech-item tag-w4',
    3: 'about__tech-item tag-w3',
    2: 'about__tech-item tag-w2',
    1: 'about__tech-item tag-w1',
  };

  // Сохраняем оригинальные стили для сброса hover
  const originalStyles = new Map();

  WordCloud(container, {
    list: tagList,
    gridSize: 8, // больше расстояние между тегами
    weightFactor: function(size) {
      return size * 4;
    },
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: function(word, weight) {
      return weight >= 4 ? '700' : '500';
    },
    classes: function(word, weight) {
      return weightClasses[weight] || 'about__tech-item tag-w3';
    },
    color: null,
    backgroundColor: 'transparent',
    shuffle: true,
    shape: 'circle',
    rotateRatio: 0,
    minRotation: 0,
    maxRotation: 0,
    shrinkToFit: true,
    drawOutOfBound: false,
    hover: function(item, dimension, event) {
      const spans = container.querySelectorAll('span');

      if (!item) {
        // Mouse leave — сбрасываем все стили
        spans.forEach(s => {
          const orig = originalStyles.get(s);
          if (orig) {
            s.style.backgroundColor = orig.bg;
            s.style.color = orig.color;
          }
        });
        return;
      }

      // Mouse enter — подсвечиваем
      spans.forEach(s => {
        if (s.textContent === item[0]) {
          // Сохраняем оригинальные стили
          if (!originalStyles.has(s)) {
            originalStyles.set(s, {
              bg: s.style.backgroundColor || '',
              color: s.style.color || '',
            });
          }
          s.style.backgroundColor = 'var(--secondary-color)';
          s.style.color = 'var(--main-color)';
        }
      });
    },
  });
}

document.addEventListener('DOMContentLoaded', initTagCloud);

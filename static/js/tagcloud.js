/**
 * Облако тегов — wordcloud2.js, данные из шаблона
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container || typeof WordCloud === 'undefined') return;

  // Читаем теги из шаблона (data/projects.py → Jinja → DOM)
  const items = Array.from(container.querySelectorAll('.about__tech-item'));
  if (items.length === 0) return;

  const tagList = items.map(li => {
    const name = li.textContent.trim();
    const weightClass = Array.from(li.classList).find(c => c.startsWith('tag-w'));
    const weight = weightClass ? parseInt(weightClass.replace('tag-w', '')) : 3;
    return [name, weight];
  });

  // Очищаем — wordcloud2 создаст свои span'ы
  container.innerHTML = '';
  container.style.cssText = 'position:relative;width:420px;height:340px;max-width:100%;margin:0 auto;';

  // Цвета по весам
  const colors = {
    5: '#f0e6d3', 4: '#c9b896', 3: '#a89878', 2: '#887860', 1: '#685848',
  };

  WordCloud(container, {
    list: tagList,
    gridSize: 6,
    weightFactor: 7,
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 'bold',
    color: function(word, weight) {
      return colors[weight] || '#a89878';
    },
    backgroundColor: 'transparent',
    shuffle: false,
    shape: 'circle',
    rotateRatio: 0,
    minRotation: 0,
    maxRotation: 0,
    shrinkToFit: true,
    drawOutOfBound: false,
  });
}

document.addEventListener('DOMContentLoaded', initTagCloud);

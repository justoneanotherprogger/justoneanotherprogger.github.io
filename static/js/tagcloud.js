/**
 * Облако тегов — wordcloud2.js, полный контроль
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container || typeof WordCloud === 'undefined') return;

  // Очищаем контейнер
  container.innerHTML = '';
  container.style.cssText = 'position:relative;width:420px;height:340px;max-width:100%;margin:0 auto;';

  const tagList = [
    ['Python', 5], ['LLM', 5],
    ['AI Agents', 4], ['LLM Orchestration', 4], ['Prompt Engineering', 4],
    ['Rust', 3], ['egui', 3], ['AQA', 3],
    ['pytest', 2], ['Postman', 2],
    ['Docker', 1],
  ];

  // Цвета по весам (из CSS-переменных)
  const colors = {
    5: '#f0e6d3',
    4: '#c9b896',
    3: '#a89878',
    2: '#887860',
    1: '#685848',
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

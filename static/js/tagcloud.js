/**
 * Облако тегов — реальные замеры + packed layout
 */
function initTagCloud() {
  const container = document.querySelector('.about__tech-stack');
  if (!container) return;

  // Читаем теги из шаблона
  const items = Array.from(container.querySelectorAll('.about__tech-item'));
  if (items.length === 0) return;

  const tagData = items.map(li => {
    const name = li.textContent.trim();
    const wc = Array.from(li.classList).find(c => c.startsWith('tag-w'));
    const weight = wc ? parseInt(wc.replace('tag-w', '')) : 3;
    return { name, weight, element: li };
  });

  // Очищаем контейнер
  container.innerHTML = '';
  container.style.cssText = 'position:relative;width:500px;height:380px;max-width:100%;margin:0 auto;overflow:hidden;';

  // Создаём span'ы, скрываем, замеряем
  const W = 500, H = 380;
  const spans = tagData.map(tag => {
    const span = document.createElement('span');
    span.textContent = tag.name;
    span.className = 'tag-cloud-item';
    span.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-family:Inter,system-ui,sans-serif;';
    // Размер шрифта по весу
    const sizes = { 5: 28, 4: 22, 3: 17, 2: 14, 1: 12 };
    span.style.fontSize = (sizes[tag.weight] || 17) + 'px';
    span.style.fontWeight = tag.weight >= 4 ? '700' : '500';
    container.appendChild(span);
    return { ...tag, span, w: span.offsetWidth, h: span.offsetHeight };
  });

  // Сортируем: крупные первые (они важнее → ближе к центру)
  spans.sort((a, b) => b.weight - a.weight || b.w - a.w);

  // Пакуем: крупные в центре, мелкие вокруг
  const cx = W / 2, cy = H / 2;
  const placed = [];

  spans.forEach((tag, i) => {
    // Ищем позицию: от центра наружу по спирали
    let found = false;
    for (let r = 0; r < 300; r += 3) {
      const angleStep = r < 1 ? 1 : 30 / r; // плотнее в центре, реже к краям
      for (let a = 0; a < Math.PI * 2; a += angleStep) {
        const x = cx + r * Math.cos(a) - tag.w / 2;
        const y = cy + r * Math.sin(a) - tag.h / 2;

        // Проверяем границы
        if (x < 0 || x + tag.w > W || y < 0 || y + tag.h > H) continue;

        // Проверяем коллизии
        let ok = true;
        for (const p of placed) {
          if (x < p.x + p.w + 6 && x + tag.w + 6 > p.x &&
              y < p.y + p.h + 6 && y + tag.h + 6 > p.y) {
            ok = false;
            break;
          }
        }

        if (ok) {
          tag.span.style.left = x + 'px';
          tag.span.style.top = y + 'px';
          tag.span.style.visibility = 'visible';
          tag.span.style.animation = `tagAppear 0.3s ease-out ${i * 0.06}s both`;
          placed.push({ x, y, w: tag.w, h: tag.h });
          found = true;
          break;
        }
      }
      if (found) break;
    }
  });
}

document.addEventListener('DOMContentLoaded', initTagCloud);

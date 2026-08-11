# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

W, H = 1200, 630
BG = (34, 34, 34, 255)
ACCENT = (178, 74, 59, 255)
CREAM = (244, 234, 210, 255)
GRAY = (180, 180, 180, 255)

ROOT = os.path.dirname(os.path.abspath(__file__))
img_dir = os.path.join(ROOT, 'static', 'img')
out = os.path.join(img_dir, 'og-preview.png')

# --- фон: чистый тёмный с мягким вертикальным градиентом (без привязки к проектам) ---
base = Image.new('RGB', (W, H), BG)
draw_bg = ImageDraw.Draw(base, 'RGBA')
# лёгкое свечение сверху-слева, чтобы фон не был плоским
for y in range(H):
    t = y / H
    r = int(34 + 8 * (1 - t))
    g = int(34 + 8 * (1 - t))
    b = int(34 + 10 * (1 - t))
    draw_bg.line([(0, y), (W, y)], fill=(r, g, b, 255))
img = base.convert('RGBA')

# --- вертикальный ряд полос-градиентов слева, как line.png на сайте ---
# line.png = тайл 54px: полоса ~27px (#b24a3b, градиент вправо) + пустой промежуток ~27px
# repeat-y => полоса / промежуток / полоса / промежуток ...
strip_w = 620
tile_h = 54
band_h = 27
strip = Image.new('RGBA', (strip_w, H), (0, 0, 0, 0))
ds = ImageDraw.Draw(strip)
y = 0
while y < H:
    # полоса высотой band_h с горизонтальным градиентом
    for x in range(strip_w):
        a = int(255 * (1 - x / strip_w))
        ds.line([(x, y), (x, y + band_h - 1)], fill=(178, 74, 59, a))
    y += tile_h  # следующий тайл: пропускаем промежуток tile_h - band_h
img.alpha_composite(strip, (0, 0))

# --- фото целиком (без обрезки), прижато к нижнему краю слева ---
face = Image.open(os.path.join(img_dir, 'photo-face.png')).convert('RGBA')
face.thumbnail((560, 560))
fy = H - face.size[1]  # нижний край = низ карточки
img.paste(face, (90, fy), face)

draw = ImageDraw.Draw(img)

fdir = os.path.join(ROOT, 'static', 'fonts', 'Montserrat')

def load(name, size):
    p = os.path.join(fdir, name)
    if not os.path.exists(p):
        raise SystemExit('font missing: ' + p)
    return ImageFont.truetype(p, size)

name_font = load('Montserrat-ExtraBold.ttf', 64)
aqa_font = load('Montserrat-SemiBold.ttf', 34)
craft_font = load('Montserrat-Regular.ttf', 22)

# имя на две строки — «Кирилл» и «Иващенко», крупно
draw.text((660, 190), 'Кирилл', font=name_font, fill=CREAM)
draw.text((660, 268), 'Иващенко', font=name_font, fill=CREAM)
draw.text((660, 370), 'AQA Engineer', font=aqa_font, fill=ACCENT)
draw.text((660, 435), 'Python · автотесты · нейросети', font=craft_font, fill=CREAM)

img.save(out)
print('saved', out)
print('size', img.size)
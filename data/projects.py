from dataclasses import dataclass, field
from typing import Optional


@dataclass
class Project:
    name: str
    text: str
    description: str
    url: str
    image: str
    repo: Optional[str] = None


@dataclass
class Social:
    name: str
    url: str
    icon: Optional[str] = None


@dataclass
class Tech:
    name: str
    weight: int


projects = [
    Project(
        name="Progress Knight Quest Mod",
        text="Мод для Progress Knight Quest",
        description="Модификация кликер-RPG про перерождения с новыми классами, умениями и механиками",
        url="https://justoneanotherprogger.github.io/progress_knight_project/",
        image="/static/img/PKQ-mod.jpg",
        repo="https://github.com/justoneanotherprogger/progress_knight_project",
    ),
    Project(
        name="AITTF",
        text="AI Tabletop Framework",
        description="Веб-фреймворк для настольных ролевых игр, где роль Гейм-Мастера выполняет языковая модель",
        url="https://github.com/justoneanotherprogger/AITTF",
        image="/static/img/aittf-screenshot.jpg",
    ),
]

socials = [
    Social(name="VK", url="https://vk.com/id16681919"),
    Social(name="email", url="mailto:strategovich@gmail.com", icon="/static/icons/mail.svg"),
    # Social(name="Telegram", url="https://t.me/strategovich"),  # пока нет возможности пользоваться
]

tech_stack = [
    Tech(name="Python", weight=5),
    Tech(name="SQLite", weight=3),
    Tech(name="LLM", weight=5),
    Tech(name="LLM Orchestration", weight=4),
    Tech(name="Prompt Engineering", weight=4),
    Tech(name="Agentic Coding", weight=4),
]

about_text = [
    "Люблю автоматизировать рутину и делать вещи, которые работают.",
    "Нейросети — мой главный исследовательский интерес: они мне и соразработчики, и объект изучения.",
    "Сейчас погружаюсь в Data Science — со стороны LLM: копаю, как они устроены и как с ними работать.",
    "Девиз: сначала работающий прототип, потом идеальная архитектура.",
]

site_description = "Сайт-визитка Кирилла Иващенко: AQA-инженер, проекты по геймдеву и LLM-разработке"

# ссылка на резюме (hh.ru и т.п.)
resume_url = "https://hh.ru/resume/182ceffbff05bcbf3b0039ed1f6f686a776f54"

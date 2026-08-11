from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from data.projects import projects, socials, about_text, site_description, tech_stack, resume_url
from data.lina import name, tagline, subtitle, description, interests, imagery, core, agents

BASE_DIR = Path(__file__).parent
TEMPLATES_DIR = BASE_DIR / "templates"
OUTPUT_DIR = BASE_DIR


def build():
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATES_DIR)),
        autoescape=False,
    )

    # Главная страница
    template = env.get_template("index.html")
    html = template.render(
        projects=projects, socials=socials, about=about_text,
        site_description=site_description, tech_stack=tech_stack,
        resume_url=resume_url, agents=agents,
    )
    output_path = OUTPUT_DIR / "index.html"
    output_path.write_text(html, encoding="utf-8")
    print(f"Built {output_path}")

    # Страничка Лины
    lina_template = env.get_template("lina.html")
    lina_html = lina_template.render(
        name=name, tagline=tagline, subtitle=subtitle,
        description=description, interests=interests,
        imagery=imagery, core=core,
    )
    lina_dir = OUTPUT_DIR / "lina"
    lina_dir.mkdir(exist_ok=True)
    lina_output = lina_dir / "index.html"
    lina_output.write_text(lina_html, encoding="utf-8")
    print(f"Built {lina_output}")


if __name__ == "__main__":
    build()
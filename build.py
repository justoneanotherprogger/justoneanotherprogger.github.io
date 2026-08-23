from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from data.projects import projects, socials, about_text, site_description, tech_stack, resume_url

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
        resume_url=resume_url,
    )
    output_path = OUTPUT_DIR / "index.html"
    output_path.write_text(html, encoding="utf-8")
    print(f"Built {output_path}")


if __name__ == "__main__":
    build()

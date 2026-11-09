# NU-Group-Project
Northumbria University, Group LB5, Final year Group Project

## Getting started

Requires Python 3.10+.

```bash
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -e .
flask --app run run --debug
```

Then open http://127.0.0.1:5000.

## Layout

- `run.py` – entry point
- `config.py` – app configuration (set `SECRET_KEY` via environment in production)
- `app/__init__.py` – `create_app()` application factory
- `app/routes/` – blueprints and view functions
- `app/templates/` – Jinja templates (`template.html` is the base layout)
- `app/static/` – CSS and JS

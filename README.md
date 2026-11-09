# NU-Group-Project
Northumbria University, Group LB5, Final year Group Project

## Getting started

Requires Python 3.12+ (3.13 recommended).

```bash
python3.13 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
flask --app wsgi run --debug
```

Then open http://127.0.0.1:5000. The SQLite database is created at `instance/app.db`.

## Tests and security checks

```bash
pytest --cov=app
bandit -c pyproject.toml -r app
```

## Layout

- Presentation - `app/templates/` (Jinja, `template.html` is the base layout), `app/static/` (Bootstrap in `static/vendor/`, our CSS/JS modules)
- Routing - `app/routes/`: `public.py` (pages), `api.py` (`/api`, JSON), `admin.py` (`/admin`, login required)
- Validation - `app/forms/`: Flask-WTF forms (CSRF is enabled app-wide)
- Services - `app/services/`: business logic, no HTTP or SQL (e.g. `passwords.py`, `domains.py`)
- Repositories - `app/repositories/`: the only place that queries the database
- Data - `app/models.py`, `app/db.py`: SQLAlchemy models and session

- `wsgi.py` – entry point for `flask run` and Apache mod_wsgi (`application`)
- `config.py` – configuration (set `SECRET_KEY` via environment in production)

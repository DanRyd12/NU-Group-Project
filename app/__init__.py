import os

from flask import Flask

from config import Config

CONTENT_SECURITY_POLICY = (
    "default-src 'self'; "
    "img-src 'self' data:; "  # Bootstrap embeds small SVG icons as data: URIs
    "object-src 'none'; "
    "base-uri 'self'; "
    "form-action 'self'; "
    "frame-ancestors 'none'"
)


def create_app(config_class=Config):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config_class)

    os.makedirs(app.instance_path, exist_ok=True)
    if not app.config.get("DATABASE_URI"):
        app.config["DATABASE_URI"] = "sqlite:///" + os.path.join(app.instance_path, "app.db")

    from app.db import init_db
    from app.extensions import csrf, login_manager
    init_db(app)
    csrf.init_app(app)
    login_manager.init_app(app)

    from app.routes.admin import admin
    from app.routes.api import api
    from app.routes.public import public
    app.register_blueprint(public)
    app.register_blueprint(api)
    app.register_blueprint(admin)

    @app.after_request
    def set_security_headers(response):
        response.headers["Content-Security-Policy"] = CONTENT_SECURITY_POLICY
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "same-origin"
        return response

    return app

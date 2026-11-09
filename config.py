import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-change-me")
    # Defaults to instance/app.db, outside the web root
    DATABASE_URI = os.environ.get("DATABASE_URI")
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = os.environ.get("SESSION_COOKIE_SECURE") == "1"


class TestingConfig(Config):
    TESTING = True
    SECRET_KEY = "test"
    WTF_CSRF_ENABLED = False

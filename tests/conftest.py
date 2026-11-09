import pytest

from app import create_app
from config import TestingConfig


@pytest.fixture
def app(tmp_path):
    class Config(TestingConfig):
        DATABASE_URI = "sqlite:///" + str(tmp_path / "test.db")

    app = create_app(Config)
    yield app
    app.extensions["db_engine"].dispose()


@pytest.fixture
def client(app):
    return app.test_client()

from sqlalchemy import create_engine, event
from sqlalchemy.orm import DeclarativeBase, scoped_session, sessionmaker


class Base(DeclarativeBase):
    pass


# One session per request, removed on app context teardown
db_session = scoped_session(sessionmaker())


def init_db(app):
    engine = create_engine(app.config["DATABASE_URI"])

    @event.listens_for(engine, "connect")
    def enable_foreign_keys(dbapi_connection, _record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    db_session.remove()
    db_session.configure(bind=engine)
    app.extensions["db_engine"] = engine

    from app import models
    Base.metadata.create_all(engine)

    @app.teardown_appcontext
    def remove_session(_exception=None):
        db_session.remove()

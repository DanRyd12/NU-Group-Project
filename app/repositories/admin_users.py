from sqlalchemy import select

from app.db import db_session
from app.models import AdminUser


def get_by_id(user_id):
    return db_session.get(AdminUser, user_id)


def get_by_username(username):
    return db_session.scalar(select(AdminUser).where(AdminUser.username == username))


def add(user):
    db_session.add(user)
    db_session.commit()
    return user

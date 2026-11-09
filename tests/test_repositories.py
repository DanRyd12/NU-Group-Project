from app.models import AdminUser
from app.repositories import admin_users


def test_add_and_fetch_admin(app):
    with app.app_context():
        user = admin_users.add(AdminUser(username="alice", password_hash="x"))
        assert admin_users.get_by_id(user.id).username == "alice"
        assert admin_users.get_by_username("alice").id == user.id
        assert admin_users.get_by_username("bob") is None

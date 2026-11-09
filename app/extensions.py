from flask_login import LoginManager
from flask_wtf import CSRFProtect

csrf = CSRFProtect()
login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    from app.repositories import admin_users
    return admin_users.get_by_id(int(user_id))

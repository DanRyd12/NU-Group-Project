def test_index_renders(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"vendor/bootstrap/css/bootstrap.min.css" in response.data


def test_security_headers(client):
    response = client.get("/")
    assert "default-src 'self'" in response.headers["Content-Security-Policy"]
    assert response.headers["X-Content-Type-Options"] == "nosniff"


def test_bootstrap_served_locally(client):
    for path in ("css/bootstrap.min.css", "js/bootstrap.bundle.min.js"):
        with client.get("/static/vendor/bootstrap/" + path) as response:
            assert response.status_code == 200


def test_api(client):
    response = client.get("/api/test")
    assert response.get_json() == {"status": "ok"}


def test_admin_requires_login(client):
    assert client.get("/admin/").status_code == 401

# Correct Login details
def test_admin_login(client):
    x = "placeholder"

# Incorrect Login details
def test_admin_garbage_login(client):
    y = "placeholder"

def test_admin_access(client):
    z = "placeholder"
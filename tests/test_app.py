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

def test_quiz_api(client):
    response = client.get("/api/quiz")
    assert response.get_json() == {"status": "ok"}
    assert response.status_code == 200


def test_quiz_api_test_content_type_is_json(client):
    """The response declares itself as JSON so clients (e.g. fetch().json()) can parse it."""
    response = client.get("/api/quiz")
    assert response.mimetype == "application/json"


def test_quiz_api_test_ignores_query_string(client):
    """Unexpected query parameters do not change or break the response."""
    response = client.get("/api/quiz?foo=bar&status=error")
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}


def test_quiz_api_test_rejects_put(client):
    """PUT is not allowed on this read-only endpoint."""
    response = client.put("/api/quiz")
    assert response.status_code == 405


def test_quiz_api_test_rejects_patch(client):
    """PATCH is not allowed on this read-only endpoint."""
    response = client.patch("/api/quiz")
    assert response.status_code == 405


def test_quiz_api_test_rejects_delete(client):
    """DELETE is not allowed on this read-only endpoint."""
    response = client.delete("/api/quiz")
    assert response.status_code == 405


def test_quiz_api_test_does_not_require_login(client):
    """The endpoint is public: an anonymous client gets 200, not 401 or a redirect."""
    response = client.get("/api/quiz")
    assert response.status_code == 200
    assert "Location" not in response.headers

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
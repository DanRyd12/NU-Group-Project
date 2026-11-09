from app.services.domains import registrable_domain
from app.services.passwords import hash_password, verify_password


def test_password_round_trip():
    password_hash = hash_password("correct horse")
    assert password_hash.startswith("$argon2id$")
    assert verify_password(password_hash, "correct horse")
    assert not verify_password(password_hash, "wrong")


def test_verify_rejects_garbage_hash():
    assert not verify_password("not-a-hash", "anything")


def test_registrable_domain():
    assert registrable_domain("https://www.studentfinance.gov.uk/login") == "studentfinance.gov.uk"
    assert registrable_domain("http://studentfinance.gov.uk.evil.com/x") == "evil.com"

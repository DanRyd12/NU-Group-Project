import tldextract

# Bundled Public Suffix List snapshot only: no network calls, no cache writes
_extract = tldextract.TLDExtract(suffix_list_urls=(), cache_dir=None)


def registrable_domain(url):
    """Return e.g. "studentfinance.gov.uk" for "https://www.studentfinance.gov.uk/login"."""
    return _extract(url).top_domain_under_public_suffix

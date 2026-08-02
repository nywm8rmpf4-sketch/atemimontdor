#!/usr/bin/env python3
"""
ATEMI static asset versioner.

Usage:
    python3 version-assets.py

The script computes a SHA-256 content hash for each local static asset and
adds or refreshes ?v=<hash> in HTML and CSS references. Run it after every
content update, before publishing to GitHub Pages.
"""
from pathlib import Path
import hashlib, json, re

ROOT = Path(__file__).resolve().parent
EXTENSIONS = {
    ".css", ".js", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg",
    ".mp3", ".m4a", ".wav", ".ogg", ".mp4", ".webm", ".pdf", ".ico"
}

def digest(path, length=12):
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()[:length]

def strip_v(url):
    parts = url.split("#", 1)
    base = parts[0]
    anchor = "#" + parts[1] if len(parts) == 2 else ""
    if "?" in base:
        stem, query = base.split("?", 1)
        params = [p for p in query.split("&") if p and not p.startswith("v=")]
        base = stem + (("?" + "&".join(params)) if params else "")
    return base + anchor

def add_v(url, version):
    parts = url.split("#", 1)
    base = parts[0]
    anchor = "#" + parts[1] if len(parts) == 2 else ""
    return f"{base}{'&' if '?' in base else '?'}v={version}{anchor}"

manifest = {
    p.name: digest(p)
    for p in ROOT.iterdir()
    if p.is_file() and p.suffix.lower() in EXTENSIONS
}

html_pattern = re.compile(
    r'(?P<attr>\b(?:src|href|poster)=["\'])(?P<url>[^"\']+)(?P<end>["\'])',
    re.I
)

def rewrite_html(text):
    def repl(m):
        url = m.group("url")
        if url.startswith(("http://", "https://", "//", "mailto:", "tel:", "data:", "#", "javascript:")):
            return m.group(0)
        clean = strip_v(url)
        name = Path(clean.split("#", 1)[0].split("?", 1)[0]).name
        if name in manifest:
            return f'{m.group("attr")}{add_v(clean, manifest[name])}{m.group("end")}'
        return m.group(0)
    return html_pattern.sub(repl, text)

css_pattern = re.compile(r'url\((?P<q>["\']?)(?P<url>[^)"\']+)(?P=q)\)', re.I)

for css in ROOT.glob("*.css"):
    text = css.read_text(encoding="utf-8")
    def repl(m):
        url = m.group("url").strip()
        if url.startswith(("http://", "https://", "//", "data:", "#")):
            return m.group(0)
        clean = strip_v(url)
        name = Path(clean.split("#", 1)[0].split("?", 1)[0]).name
        if name in manifest:
            q = m.group("q")
            return f'url({q}{add_v(clean, manifest[name])}{q})'
        return m.group(0)
    css.write_text(css_pattern.sub(repl, text), encoding="utf-8")

# CSS content may have changed after URL rewriting.
for p in ROOT.iterdir():
    if p.is_file() and p.suffix.lower() in {".css", ".js"}:
        manifest[p.name] = digest(p)

for page in ROOT.glob("*.html"):
    page.write_text(rewrite_html(page.read_text(encoding="utf-8")), encoding="utf-8")

(ROOT / "asset-manifest.json").write_text(
    json.dumps(
        {"strategy": "sha256-content-hash-query-string", "generated_assets": dict(sorted(manifest.items()))},
        ensure_ascii=False,
        indent=2
    ),
    encoding="utf-8"
)

print(f"Versioned {len(manifest)} assets.")

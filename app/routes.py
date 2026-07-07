from dataclasses import dataclass
from pathlib import Path

from app.config import STATIC_DIR, TEMPLATES_DIR


@dataclass(frozen=True)
class Route:
    url_path: str
    file_path: Path
    content_type: str


ROUTES = {
    "/": Route("/", TEMPLATES_DIR / "index.html", "text/html; charset=utf-8"),
    "/index.html": Route("/index.html", TEMPLATES_DIR / "index.html", "text/html; charset=utf-8"),
}

SERVICE_SLUGS = {
    "microsoft-365",
    "it-infrastruktur",
    "netzwerk-firewall",
    "server-virtualisierung",
    "backup-sicherheit",
    "monitoring-systemueberwachung",
    "dokumentenmanagement",
    "web-hosting-anwendungen",
    "managed-it-betreuung",
}

for slug in SERVICE_SLUGS:
    url_path = f"/leistungen/{slug}"
    ROUTES[url_path] = Route(
        url_path,
        TEMPLATES_DIR / "leistungen" / "service.html",
        "text/html; charset=utf-8",
    )


def get_route(path: str) -> Route | None:
    return ROUTES.get(path)


def is_static_path(path: Path) -> bool:
    try:
        path.resolve().relative_to(STATIC_DIR.resolve())
    except ValueError:
        return False
    return True

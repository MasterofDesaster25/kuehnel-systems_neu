from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

from app.config import BASE_DIR, HOST, PORT
from app.routes import get_route, is_static_path


class SiteHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def do_GET(self):
        request_path = unquote(urlparse(self.path).path)
        route = get_route(request_path)

        if route is not None:
            self._send_file(route.file_path, route.content_type)
            return

        requested_file = BASE_DIR / request_path.lstrip("/")
        if is_static_path(requested_file):
            return super().do_GET()

        self.send_error(404, "Not found")

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _send_file(self, file_path: Path, content_type: str) -> None:
        if not file_path.is_file():
            self.send_error(404, "Not found")
            return

        content = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)


def run() -> None:
    server = ThreadingHTTPServer((HOST, PORT), SiteHandler)
    public_host = "127.0.0.1" if HOST == "0.0.0.0" else HOST
    print(f"Kuehnel Systems laeuft auf http://{public_host}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import smtplib
import ssl
from email.message import EmailMessage
from pathlib import Path
from urllib.parse import unquote, urlparse

from app.config import (
    BASE_DIR,
    HOST,
    MAIL_FROM,
    MAIL_TO,
    PORT,
    SMTP_HOST,
    SMTP_PASSWORD,
    SMTP_PORT,
    SMTP_USE_TLS,
    SMTP_USER,
)
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

    def do_POST(self):
        request_path = unquote(urlparse(self.path).path)

        if request_path == "/api/contact":
            self._handle_contact()
            return

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

    def _handle_contact(self) -> None:
        if not self._is_mail_configured():
            self._send_json(503, {"message": "Mailversand ist nicht konfiguriert."})
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length > 20_000:
            self._send_json(413, {"message": "Die Anfrage ist zu gross."})
            return

        try:
            payload = json.loads(self.rfile.read(content_length) or b"{}")
        except json.JSONDecodeError:
            self._send_json(400, {"message": "Ungueltige Anfrage."})
            return

        name = str(payload.get("name", "")).strip()
        email = str(payload.get("email", "")).strip()
        topic = str(payload.get("topic", "Sonstiges")).strip() or "Sonstiges"
        message = str(payload.get("message", "")).strip()
        website = str(payload.get("website", "")).strip()

        if website:
            self._send_json(200, {"message": "Danke - Ihre Anfrage wurde gesendet."})
            return

        if not name or not email or not message or "@" not in email:
            self._send_json(400, {"message": "Bitte Name, E-Mail und Nachricht korrekt ausfuellen."})
            return

        mail = EmailMessage()
        mail["Subject"] = f"Projektanfrage: {topic}"
        mail["From"] = MAIL_FROM
        mail["To"] = MAIL_TO
        mail["Reply-To"] = email
        mail.set_content(
            "\n".join(
                [
                    "Neue Anfrage ueber kuehnel-systems.de",
                    "",
                    f"Name: {name}",
                    f"E-Mail: {email}",
                    f"Thema: {topic}",
                    "",
                    "Nachricht:",
                    message,
                ]
            )
        )

        try:
            self._send_mail(mail)
        except (OSError, smtplib.SMTPException):
            self._send_json(502, {"message": "Die Anfrage konnte nicht versendet werden."})
            return

        self._send_json(200, {"message": "Danke - Ihre Anfrage wurde gesendet."})

    def _send_mail(self, mail: EmailMessage) -> None:
        context = ssl.create_default_context()

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as smtp:
            if SMTP_USE_TLS:
                smtp.starttls(context=context)

            if SMTP_USER and SMTP_PASSWORD:
                smtp.login(SMTP_USER, SMTP_PASSWORD)

            smtp.send_message(mail)

    def _is_mail_configured(self) -> bool:
        return bool(SMTP_HOST and MAIL_FROM and MAIL_TO)

    def _send_json(self, status_code: int, payload: dict[str, str]) -> None:
        content = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
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

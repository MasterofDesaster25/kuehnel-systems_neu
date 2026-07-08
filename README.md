# Kuehnel Systems Website

Website fuer Kuehnel Systems mit statischem Frontend und kleinem Python-Webserver.

## Struktur

```text
.
|-- main.py
|-- app/
|   |-- config.py
|   |-- routes.py
|   `-- server.py
|-- templates/
|   |-- index.html
|   `-- leistungen/
|       `-- service.html
|-- static/
|   |-- css/
|   |   `-- styles.css
|   |-- js/
|   |   `-- script.js
|   `-- images/
|-- Dockerfile
|-- docker-compose.yml
`-- README.md
```

## Ordner

- `app/`: Python-Code fuer Konfiguration, Routing und Server.
- `templates/`: HTML-Templates der Website.
- `static/`: CSS, JavaScript und Bilder.
- `main.py`: schlanker Einstiegspunkt zum Starten der App.

## Lokal starten

```bash
python main.py
```

Die Seite laeuft standardmaessig auf `http://127.0.0.1:8000`.

## Mit Docker starten

```bash
docker compose up --build
```

## Kontaktformular / IONOS SMTP

Das Kontaktformular sendet serverseitig ueber `POST /api/contact`. Die SMTP-Daten werden per Umgebungsvariablen gesetzt.

Lege auf dem Server eine lokale `.env` neben der `docker-compose.yml` an:

```env
SMTP_HOST=smtp.ionos.de
SMTP_PORT=587
SMTP_TIMEOUT=10
SMTP_USER=kontakt@kuehnel-systems.de
SMTP_PASSWORD=DEIN_IONOS_MAILBOX_PASSWORT
SMTP_USE_TLS=true
MAIL_FROM=kontakt@kuehnel-systems.de
MAIL_TO=kontakt@kuehnel-systems.de
```

Danach den Container neu bauen und starten:

```bash
docker compose up -d --build
```

## Deployment im Proxmox CT

Voraussetzung im CT: Git und Docker mit Compose-Plugin sind installiert.

```bash
git clone https://github.com/MasterofDesaster25/kuehnel-systems_neu.git
cd kuehnel-systems_neu
docker compose up -d --build
```

Die Website läuft danach auf Port `8000` des CTs. Bei Änderungen reicht:

```bash
git pull && docker compose up -d --build
```

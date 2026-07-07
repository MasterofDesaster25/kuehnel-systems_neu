const services = [
  {
    slug: "microsoft-365",
    title: "Microsoft 365",
    subtitle: "Microsoft 365 ist mehr als Outlook und Teams. Ich strukturiere Tenants so, dass Zusammenarbeit einfach bleibt, Rechte sauber geregelt sind und Daten nicht im Chaos verschwinden.",
    description: [
      "Im Alltag soll Microsoft 365 schnell und selbstverständlich funktionieren: Dateien finden, gemeinsam bearbeiten, Termine planen, E-Mails sauber organisieren und externe Gäste kontrolliert einbinden.",
      "Dafür braucht es im Hintergrund klare Gruppen, verständliche Berechtigungen, MFA, sinnvolle Freigaben und eine Struktur für Teams, SharePoint, Exchange und OneDrive."
    ],
    icon: "grid",
    visualType: "m365",
    info: ["Tenant-Struktur", "Rechte & MFA", "Zusammenarbeit"],
    tasks: ["Tenant-Grundstruktur und Benutzerverwaltung", "Exchange, Teams, SharePoint und OneDrive", "Gruppen- und Berechtigungskonzepte", "MFA und Sicherheitsrichtlinien", "Externe Gäste und Freigaben sauber regeln"],
    benefit: "Ein Microsoft-365-System, das im Alltag einfach funktioniert und gleichzeitig Sicherheit, Ordnung und Übersicht schafft."
  },
  {
    slug: "it-infrastruktur",
    title: "IT-Infrastruktur",
    subtitle: "Eine gute IT-Infrastruktur ist die Grundlage für stabile Arbeit. Clients, Server, Netzwerk und Dienste werden so geplant, dass sie sauber zusammenspielen.",
    description: [
      "Viele Probleme entstehen nicht durch ein einzelnes Gerät, sondern durch fehlende Struktur: unklare Ablagen, gewachsene Server, uneinheitliche Clients oder fehlende Dokumentation.",
      "Ich bringe die Bausteine in eine nachvollziehbare Ordnung, damit tägliche Arbeit, Support und spätere Erweiterungen nicht jedes Mal bei null beginnen."
    ],
    icon: "network",
    visualType: "infrastructure",
    info: ["Clients & Benutzer", "Server & Dienste", "Monitoring"],
    tasks: ["Server, Clients und Benutzerverwaltung", "Active Directory, DNS, DHCP und Gruppenrichtlinien", "Netzwerkdienste und zentrale Ablagen", "Dokumentation und Standardisierung", "Fehleranalyse und Optimierung bestehender Umgebungen"],
    benefit: "Eine stabile Infrastruktur, die nachvollziehbar aufgebaut ist und nicht nur irgendwie läuft."
  },
  {
    slug: "netzwerk-firewall",
    title: "Netzwerk & Firewall",
    subtitle: "Ein Netzwerk muss schnell, sicher und verständlich aufgebaut sein. Firewall, VLANs, VPNs und Routing bekommen klare Regeln.",
    description: [
      "Das Netzwerk entscheidet, welche Geräte, Standorte und Menschen miteinander sprechen dürfen. Ohne klare Trennung wird aus einem kleinen Problem schnell ein großes Risiko.",
      "Ich plane Sicherheitszonen, VPN-Zugänge und Firewall-Regeln so, dass Verbindungen nachvollziehbar sind und der Betrieb nicht durch Zufall funktioniert."
    ],
    icon: "shield",
    visualType: "network",
    info: ["Firewall", "VLANs", "VPN"],
    tasks: ["Firewall-Regeln und Sicherheitszonen", "VLAN-Struktur und Netztrennung", "VPN für Benutzer oder Standorte", "Routing, DNS und DHCP", "Analyse von Verbindungsproblemen"],
    benefit: "Ein sauberes Netzwerk mit klaren Regeln, weniger Ausfällen und besserer Sicherheit."
  },
  {
    slug: "server-virtualisierung",
    title: "Server & Virtualisierung",
    subtitle: "Virtualisierung macht IT flexibler und effizienter. Serverdienste, VMs und Container werden stabil und wartbar aufgebaut.",
    description: [
      "Statt viele einzelne Server unkoordiniert wachsen zu lassen, entsteht eine Plattform, auf der Dienste getrennt und kontrolliert betrieben werden.",
      "Hardware, Hypervisor, virtuelle Maschinen, Container, Backup und Monitoring werden gemeinsam betrachtet, damit die Umgebung erweiterbar bleibt."
    ],
    icon: "server",
    visualType: "virtualization",
    info: ["Hypervisor", "VMs & Container", "Backup"],
    tasks: ["Proxmox, Hyper-V oder VMware", "Virtuelle Maschinen und Container", "Ressourcenplanung", "Backup- und Restore-Konzepte", "Updates, Monitoring und Fehleranalyse"],
    benefit: "Eine flexible Serverumgebung, die sauber dokumentiert, erweiterbar und zuverlässig betreibbar ist."
  },
  {
    slug: "backup-sicherheit",
    title: "Backup & Sicherheit",
    subtitle: "Backups sind erst dann gut, wenn sie im Ernstfall funktionieren. Sicherung, Verschlüsselung und Wiederherstellung werden konkret geplant.",
    description: [
      "Ein Backup-Haken im System reicht nicht. Entscheidend ist, welche Daten gesichert werden, wie lange sie aufbewahrt werden und ob eine Wiederherstellung getestet wurde.",
      "Ich helfe dabei, Risiken sichtbar zu machen, Sicherungswege zu strukturieren und wichtige Systeme grundlegend abzusichern."
    ],
    icon: "lock",
    visualType: "backup",
    info: ["3-2-1", "Verschlüsselung", "Restore"],
    tasks: ["Backup-Strategien nach 3-2-1-Prinzip", "Wiederherstellungstests", "Schutz vor Datenverlust", "Verschlüsselung und Zugriffskontrolle", "Absicherung wichtiger Systeme"],
    benefit: "Mehr Sicherheit, weniger Risiko und ein klarer Plan, wenn etwas ausfällt."
  },
  {
    slug: "monitoring-systemueberwachung",
    title: "Monitoring & Systemüberwachung",
    subtitle: "Probleme sollten sichtbar werden, bevor sie den Betrieb stören. Monitoring schafft Überblick über Systeme, Dienste und Engpässe.",
    description: [
      "Ohne Monitoring merkt man viele Probleme erst, wenn Nutzer sich melden. Dann ist Speicher voll, ein Dienst steht oder eine Verbindung fällt regelmäßig aus.",
      "Mit Dashboards, Metriken und Benachrichtigungen wird sichtbar, was in der IT passiert und wo früh reagiert werden sollte."
    ],
    icon: "pulse",
    visualType: "monitoring",
    info: ["Metriken", "Alerts", "Reaktion"],
    tasks: ["Überwachung von Servern und Diensten", "Dashboards und Metriken", "Benachrichtigungen bei Fehlern", "Speicher-, CPU- und Netzwerk-Auswertung", "Frühzeitige Erkennung von Engpässen"],
    benefit: "Mehr Überblick über die IT und schnellere Reaktion, bevor kleine Probleme groß werden."
  },
  {
    slug: "dokumentenmanagement",
    title: "Dokumentenmanagement",
    subtitle: "Dokumente sollen nicht in E-Mails, Ordnern und Scans verschwinden. Digitale Ablagen werden durchsuchbar und nachvollziehbar.",
    description: [
      "Viele Informationen sind vorhanden, aber schwer zu finden: als Scan, im Postfach, im Download-Ordner oder in einer alten Dateiablage.",
      "Ich unterstütze beim Aufbau digitaler Ablagen mit OCR, Volltextsuche, automatischer Sortierung und passenden Rechten."
    ],
    icon: "file",
    visualType: "documents",
    info: ["Scan & E-Mail", "OCR", "Archiv"],
    tasks: ["Digitale Dokumentenablage", "Scan- und E-Mail-Import", "OCR und Volltextsuche", "Automatische Benennung und Sortierung", "Rechte und Archivstruktur"],
    benefit: "Dokumente werden schneller gefunden, sauber abgelegt und besser nachvollziehbar verwaltet."
  },
  {
    slug: "web-hosting-anwendungen",
    title: "Web, Hosting & Anwendungen",
    subtitle: "Moderne Webauftritte und kleine Anwendungen brauchen eine saubere technische Basis hinter der sichtbaren Oberfläche.",
    description: [
      "Eine Website soll nicht nur gut aussehen, sondern zuverlässig erreichbar, schnell, sicher und wartbar sein.",
      "Ich unterstütze bei Landingpages, Hosting-Strukturen, Domains, SSL, Reverse Proxy, kleinen Anwendungen und technischer Betreuung im Hintergrund."
    ],
    icon: "globe",
    visualType: "web",
    info: ["Domain & SSL", "Reverse Proxy", "App-Betrieb"],
    tasks: ["Webseiten und Landingpages", "Hosting, Domains und SSL", "Reverse Proxy und Deployment", "Kleine Automatisierungen und Schnittstellen", "Wartung und technische Optimierung"],
    benefit: "Ein moderner Webauftritt mit sauberer technischer Basis statt einer Seite, die nur irgendwie online ist."
  },
  {
    slug: "managed-it-betreuung",
    title: "Managed IT & Betreuung",
    subtitle: "Nicht jedes Unternehmen braucht eine eigene große IT-Abteilung. Regelmäßige Unterstützung hält Systeme sauber betreibbar.",
    description: [
      "IT braucht nicht immer ein Großprojekt. Oft geht es um schnelle Einschätzung, saubere Umsetzung, Dokumentation und jemanden, der die Umgebung versteht.",
      "Ich unterstütze regelmäßig oder projektbezogen bei Betrieb, Fehleranalyse, Erweiterungen und Entscheidungen, ohne unnötige Komplexität aufzubauen."
    ],
    icon: "workflow",
    visualType: "managed",
    info: ["Analyse", "Umsetzung", "Betrieb"],
    tasks: ["Laufende Betreuung", "Fehleranalyse und Support", "Systempflege und Updates", "Planung neuer IT-Projekte", "Dokumentation und Beratung"],
    benefit: "Zuverlässige IT-Unterstützung ohne unnötige Komplexität."
  }
];

const root = document.getElementById("service-root");
const currentSlug = window.location.pathname.split("/").filter(Boolean).pop();
const service = services.find((item) => item.slug === currentSlug);

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const iconSvg = (type) => {
  const icons = {
    grid: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
    network: '<path d="M12 5v5M6 19v-4l6-5 6 5v4M4 19h4M16 19h4M10 5h4"/>',
    shield: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-5"/>',
    server: '<path d="M4 5h16v6H4zM4 13h16v6H4z"/><path d="M7 8h.01M7 16h.01M11 8h6M11 16h6"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    pulse: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    workflow: '<path d="M5 6h5v5H5zM14 13h5v5h-5zM10 8h3a3 3 0 0 1 3 3v2M8 11v2a3 3 0 0 0 3 3h3"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.network}</svg>`;
};

const visualSteps = {
  m365: ["Menschen", "Teams / SharePoint / Exchange", "Rechte / MFA", "Saubere Zusammenarbeit"],
  infrastructure: ["Clients", "Netzwerk", "Server / VMs", "Dienste", "Monitoring"],
  network: ["Internet", "Firewall", "VLANs", "VPN", "Clients / Server"],
  virtualization: ["Hardware", "Proxmox / Hypervisor", "VMs / Container", "Backup / Monitoring"],
  backup: ["Daten", "Backup-Strategie", "Verschlüsselte Sicherung", "Wiederherstellung"],
  monitoring: ["Systeme", "Metriken", "Alerts", "Schnelle Reaktion"],
  documents: ["E-Mail / Scan", "OCR", "Automatische Ablage", "Suche / Archiv"],
  web: ["Domain", "Reverse Proxy", "Webserver / App", "SSL / Monitoring"],
  managed: ["Anfrage", "Analyse", "Umsetzung", "Dokumentation", "Betrieb"]
};

const renderVisual = (visualType) => {
  const steps = visualSteps[visualType] || visualSteps.infrastructure;
  return `
    <div class="tech-visual tech-visual-${visualType}">
      <div class="visual-orbit" aria-hidden="true"></div>
      <div class="tech-flow">
        ${steps.map((step, index) => `
          <div class="tech-step">
            <span class="step-dot">${String(index + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(step)}</strong>
            <small>${index === steps.length - 1 ? "Zielzustand" : "Baustein"}</small>
          </div>
          ${index < steps.length - 1 ? '<span class="flow-line" aria-hidden="true"></span>' : ""}
        `).join("")}
      </div>
      <div class="status-strip">
        <span><b>Scope</b> klar</span>
        <span><b>Status</b> betreibbar</span>
        <span><b>Doku</b> vorhanden</span>
      </div>
    </div>
  `;
};

const ServiceSection = (item) => `
  <section class="service-detail-page">
    <div class="container service-detail-layout">
      <a class="back-link service-back" href="/#leistungen">Zurück zu den Leistungen</a>

      <div class="service-detail-hero">
        <div class="service-detail-copy">
          <span class="service-kicker">${iconSvg(item.icon)} Service Area</span>
          <h1>${escapeHtml(item.title)}</h1>
          <p>${escapeHtml(item.subtitle)}</p>
          <div class="service-cta-row">
            <a class="button button-primary" href="/#projekt">Projekt anfragen</a>
            <a class="button button-secondary" href="mailto:kontakt@kuehnel-systems.de">Erstgespräch starten</a>
          </div>
        </div>
        ${renderVisual(item.visualType)}
      </div>

      <div class="service-explain-grid">
        <article class="service-copy-panel">
          <span class="service-label">Worum es geht</span>
          ${item.description.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </article>
        <div class="service-info-cards">
          ${item.info.map((label, index) => `
            <article class="service-info-card">
              <span>${iconSvg(["network", "shield", "pulse"][index] || "grid")}</span>
              <strong>${escapeHtml(label)}</strong>
            </article>
          `).join("")}
        </div>
      </div>

      <div class="service-mini-map">
        <div>
          <span class="service-label">Technischer Ablauf</span>
          <h2>${escapeHtml(item.title)} als klarer Prozess</h2>
        </div>
        ${renderVisual(item.visualType)}
      </div>

      <div class="service-bottom-grid">
        <article class="service-task-panel">
          <span class="service-label">Typische Aufgaben</span>
          <ul>
            ${item.tasks.map((task) => `<li>${iconSvg("grid")}<span>${escapeHtml(task)}</span></li>`).join("")}
          </ul>
        </article>
        <article class="service-result-panel">
          <span class="service-label">Ergebnis</span>
          <p>${escapeHtml(item.benefit)}</p>
          <div class="service-cta-row">
            <a class="button button-warm" href="/#projekt">Projekt anfragen</a>
            <a class="button button-secondary" href="mailto:kontakt@kuehnel-systems.de">Erstgespräch starten</a>
          </div>
        </article>
      </div>
    </div>
  </section>
`;

if (root && service) {
  document.title = `${service.title} - Kühnel Systems`;
  root.innerHTML = ServiceSection(service);
} else if (root) {
  root.innerHTML = `
    <section class="service-detail-page">
      <div class="container service-detail-layout">
        <a class="back-link service-back" href="/#leistungen">Zurück zu den Leistungen</a>
        <div class="service-detail-hero">
          <div class="service-detail-copy">
            <h1>Leistung nicht gefunden</h1>
            <p>Diese Dienstleistung ist aktuell nicht verfügbar.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

const homeServices = [
  {
    number: "01",
    title: "Microsoft 365",
    description: "Tenant, Teams, SharePoint, Exchange und Rechte sauber strukturieren.",
    href: "/leistungen/microsoft-365",
    icon: "users",
    tags: ["MFA", "Teams", "Rechte"],
    visualType: "m365",
  },
  {
    number: "02",
    title: "IT-Infrastruktur",
    description: "Clients, Server, Netzwerk und zentrale Dienste stabil verbinden.",
    href: "/leistungen/it-infrastruktur",
    icon: "network",
    tags: ["AD", "DNS", "Dienste"],
    visualType: "infrastructure",
  },
  {
    number: "03",
    title: "Netzwerk & Firewall",
    description: "Firewall, VLANs, VPNs, Routing und Standortvernetzung mit klaren Regeln.",
    href: "/leistungen/netzwerk-firewall",
    icon: "shield",
    tags: ["VLAN", "VPN", "Rules"],
    visualType: "network",
  },
  {
    number: "04",
    title: "Server & VMs",
    description: "Proxmox, Hypervisor, VMs, Container, Backup und Monitoring wartbar planen.",
    href: "/leistungen/server-virtualisierung",
    icon: "server",
    tags: ["Proxmox", "VMs", "Backup"],
    visualType: "virtualization",
  },
  {
    number: "05",
    title: "Backup & Sicherheit",
    description: "Backup-Konzepte, Restore-Tests und grundlegende Absicherung.",
    href: "/leistungen/backup-sicherheit",
    icon: "lock",
    tags: ["3-2-1", "Restore", "Crypto"],
    visualType: "backup",
  },
  {
    number: "06",
    title: "Monitoring",
    description: "Server, Dienste, Speicher, Netzwerk und Verfügbarkeit sichtbar machen.",
    href: "/leistungen/monitoring-systemueberwachung",
    icon: "pulse",
    tags: ["Alerts", "Metriken", "Dashboards"],
    visualType: "monitoring",
  },
  {
    number: "07",
    title: "DMS & Archiv",
    description: "Scan, E-Mail, OCR, automatische Ablage, Suche und Archiv sauber aufbauen.",
    href: "/leistungen/dokumentenmanagement",
    icon: "file",
    tags: ["OCR", "Archiv", "Suche"],
    visualType: "documents",
  },
  {
    number: "08",
    title: "Web & Hosting",
    description: "Webseiten, Hosting, SSL, Reverse Proxy und kleine Anwendungen.",
    href: "/leistungen/web-hosting-anwendungen",
    icon: "globe",
    tags: ["SSL", "Proxy", "Apps"],
    visualType: "web",
  },
  {
    number: "09",
    title: "Managed IT",
    description: "Laufende Unterstützung, Fehleranalyse, Erweiterungen und Dokumentation.",
    href: "/leistungen/managed-it-betreuung",
    icon: "workflow",
    tags: ["Support", "Doku", "Betrieb"],
    visualType: "managed",
  },
];

const homeIcon = (type) => {
  const icons = {
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    network: '<path d="M12 5v5M6 19v-4l6-5 6 5v4M4 19h4M16 19h4M10 5h4"/>',
    shield: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-5"/>',
    server: '<path d="M4 5h16v6H4zM4 13h16v6H4z"/><path d="M7 8h.01M7 16h.01M11 8h6M11 16h6"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    pulse: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    workflow: '<path d="M5 6h5v5H5zM14 13h5v5h-5zM10 8h3a3 3 0 0 1 3 3v2M8 11v2a3 3 0 0 0 3 3h3"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.network}</svg>`;
};

const homeVisualSteps = {
  m365: ["User", "M365", "MFA"],
  infrastructure: ["Client", "Server", "Watch"],
  network: ["WAN", "FW", "VPN"],
  virtualization: ["Host", "VM", "Backup"],
  backup: ["Data", "Safe", "Restore"],
  monitoring: ["Node", "Metric", "Alert"],
  documents: ["Scan", "OCR", "Archiv"],
  web: ["DNS", "SSL", "App"],
  managed: ["Ticket", "Fix", "Doku"],
};

const ServiceVisual = (visualType) => {
  const steps = homeVisualSteps[visualType] || homeVisualSteps.infrastructure;
  return `
    <div class="home-service-visual" aria-hidden="true">
      ${steps.map((step, index) => `
        <span class="mini-node"><b>${step}</b></span>
        ${index < steps.length - 1 ? '<span class="mini-line"></span>' : ""}
      `).join("")}
    </div>
  `;
};

const ServiceCard = (service) => `
  <article class="home-service-card">
    <a href="${service.href}">
      <span class="home-service-num">${service.number}</span>
      <span class="home-service-action" aria-hidden="true">→</span>
      <span class="home-service-icon">${homeIcon(service.icon)}</span>
      <strong>${service.title}</strong>
      <span class="home-service-text">${service.description}</span>
      <span class="home-service-tags">
        ${service.tags.map((tag) => `<em>${tag}</em>`).join("")}
      </span>
      ${ServiceVisual(service.visualType)}
    </a>
  </article>
`;

const homeServiceGrid = document.getElementById("home-service-grid");

if (homeServiceGrid) {
  homeServiceGrid.innerHTML = homeServices.map(ServiceCard).join("");
}

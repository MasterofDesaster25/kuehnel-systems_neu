const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const tiltFrame = document.querySelector("[data-tilt]");
const counters = document.querySelectorAll("[data-counter]");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const animateCounter = (element) => {
  const target = Number(element.dataset.counter || 0);
  const duration = 1100;
  const startTime = performance.now();

  const frame = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  };

  requestAnimationFrame(frame);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      if (entry.target.hasAttribute("data-counter")) {
        animateCounter(entry.target);
      }

      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => revealObserver.observe(item));
  counters.forEach((counter) => revealObserver.observe(counter));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.counter || "0";
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    formStatus.className = "form-status";

    if (!name || !email || !message) {
      formStatus.textContent = "Bitte alle Pflichtfelder vollstaendig ausfuellen.";
      formStatus.classList.add("is-error");
      return;
    }

    formStatus.textContent = "Anfrage erfasst. Fuer den Live-Betrieb kann das Formular direkt an Mail, CRM oder Ticketing angebunden werden.";
    formStatus.classList.add("is-success");
    contactForm.reset();
  });
}

if (tiltFrame && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const resetTilt = () => {
    tiltFrame.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
  };

  tiltFrame.addEventListener("mousemove", (event) => {
    const rect = tiltFrame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 7;
    const rotateX = (0.5 - y) * 6;
    tiltFrame.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltFrame.addEventListener("mouseleave", resetTilt);
  tiltFrame.addEventListener("blur", resetTilt);
}

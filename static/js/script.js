const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const tiltFrame = document.querySelector("[data-tilt]");
const counters = document.querySelectorAll("[data-counter]");
const networkCanvas = document.getElementById("network-canvas");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const binaryRain = document.querySelector(".binary-rain");
const orbitStage = document.querySelector(".orbit-stage");
const orbitProbe = document.querySelector(".orbit-probe");
const techNodes = Array.from(document.querySelectorAll(".tech-node"));
const scanLabel = document.getElementById("scan-label");
const scanTitle = document.getElementById("scan-title");
const scanDetail = document.getElementById("scan-detail");

const createBinaryRain = () => {
  if (!binaryRain || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const columns = Number(binaryRain.dataset.columns || 150);
  const fragments = [];

  for (let index = 0; index < columns; index += 1) {
    const bits = Array.from({ length: 38 }, () => (Math.random() > 0.5 ? "1" : "0")).join("");
    const left = (index / Math.max(columns - 1, 1)) * 100;
    const duration = 20 + Math.random() * 18;
    const delay = -Math.random() * duration;
    const opacity = 0.35 + Math.random() * 0.5;
    const fontSize = 0.62 + Math.random() * 0.22;

    fragments.push(
      `<span style="left:${left.toFixed(2)}%; animation-duration:${duration.toFixed(2)}s; animation-delay:${delay.toFixed(2)}s; opacity:${opacity.toFixed(2)}; font-size:${fontSize.toFixed(2)}rem;">${bits}</span>`
    );
  }

  binaryRain.innerHTML = fragments.join("");
};

createBinaryRain();

const isLogoBackgroundPixel = (red, green, blue, alpha) => {
  if (alpha < 12) {
    return true;
  }

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const average = (red + green + blue) / 3;

  return (average > 168 && max - min < 44) || (red > 238 && green > 238 && blue > 238);
};

const cleanLogoBackground = (image) => {
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;

  if (!sourceWidth || !sourceHeight) {
    return;
  }

  const maxSize = 360;
  const scale = Math.min(1, maxSize / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return;
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  const visited = new Uint8Array(width * height);
  const queue = [];

  const enqueue = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) {
      return;
    }

    const pixelIndex = y * width + x;

    if (visited[pixelIndex]) {
      return;
    }

    const dataIndex = pixelIndex * 4;
    if (!isLogoBackgroundPixel(data[dataIndex], data[dataIndex + 1], data[dataIndex + 2], data[dataIndex + 3])) {
      return;
    }

    visited[pixelIndex] = 1;
    queue.push(pixelIndex);
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }

  for (let y = 0; y < height; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const pixelIndex = queue[cursor];
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);

    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }

  for (let pixelIndex = 0; pixelIndex < visited.length; pixelIndex += 1) {
    if (visited[pixelIndex]) {
      data[pixelIndex * 4 + 3] = 0;
    }
  }

  context.putImageData(imageData, 0, 0);
  image.src = canvas.toDataURL("image/png");
  image.classList.add("is-cleaned");
};

document.querySelectorAll(".tech-node img").forEach((image) => {
  if (image.complete) {
    cleanLogoBackground(image);
    return;
  }

  image.addEventListener("load", () => cleanLogoBackground(image), { once: true });
});

const initOrbitScanner = () => {
  if (
    !orbitStage ||
    !orbitProbe ||
    !techNodes.length ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  let activeIndex = 0;
  const initialStageRect = orbitStage.getBoundingClientRect();
  let probeX = initialStageRect.width / 2;
  let probeY = initialStageRect.height / 2;
  let previousX = probeX;
  let previousY = probeY;

  const setActiveNode = () => {
    techNodes.forEach((node) => node.classList.remove("is-scanned"));

    const activeNode = techNodes[activeIndex];
    activeNode.classList.add("is-scanned");

    const title = activeNode.dataset.title || activeNode.querySelector("img")?.alt || "Technologie";
    const detail = activeNode.dataset.detail || "Technologie im Kühnel Systems Stack.";

    if (scanLabel) {
      scanLabel.textContent = "Passive Scan";
    }
    if (scanTitle) {
      scanTitle.textContent = title;
    }
    if (scanDetail) {
      scanDetail.textContent = detail;
    }

    activeIndex = (activeIndex + 1) % techNodes.length;
  };

  const moveProbe = () => {
    const targetNode = techNodes[(activeIndex + techNodes.length - 1) % techNodes.length];
    const stageRect = orbitStage.getBoundingClientRect();
    const nodeRect = targetNode.getBoundingClientRect();
    const targetX = nodeRect.left + nodeRect.width / 2 - stageRect.left;
    const targetY = nodeRect.top + nodeRect.height / 2 - stageRect.top;

    probeX += (targetX - probeX) * 0.035;
    probeY += (targetY - probeY) * 0.035;

    const angle = Math.atan2(probeY - previousY, probeX - previousX) * (180 / Math.PI);
    previousX = probeX;
    previousY = probeY;

    orbitProbe.style.setProperty("--probe-x", `${probeX}px`);
    orbitProbe.style.setProperty("--probe-y", `${probeY}px`);
    orbitProbe.style.setProperty("--probe-rotate", `${angle.toFixed(2)}deg`);

    requestAnimationFrame(moveProbe);
  };

  setActiveNode();
  window.setInterval(setActiveNode, 6200);
  requestAnimationFrame(moveProbe);
};

initOrbitScanner();

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
  const start = performance.now();

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      if (entry.target.hasAttribute("data-counter")) {
        animateCounter(entry.target);
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));
  counters.forEach((counter) => observer.observe(counter));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.counter || "0";
  });
}

if (tiltFrame && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const resetTilt = () => {
    tiltFrame.style.transform = "perspective(1500px) rotateX(0deg) rotateY(0deg)";
  };

  tiltFrame.addEventListener("mousemove", (event) => {
    const rect = tiltFrame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 7;
    tiltFrame.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltFrame.addEventListener("mouseleave", resetTilt);
  tiltFrame.addEventListener("blur", resetTilt);
}

const initContactForm = (form, statusElement) => {
  if (!form || !statusElement) {
    return;
  }

  const submitButton = form.querySelector(".contact-submit");
  const requiredFields = Array.from(form.querySelectorAll("[required]"));
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setStatus = (message, type = "") => {
    statusElement.className = "form-status";
    statusElement.textContent = message;

    if (type) {
      statusElement.classList.add(type);
    }
  };

  const setLoading = (isLoading) => {
    if (!submitButton) {
      return;
    }

    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? "Anfrage wird vorbereitet ..." : "Anfrage senden";
  };

  const markInvalid = (field) => {
    field.closest(".form-field")?.classList.add("is-invalid");
  };

  const clearInvalidState = () => {
    form.querySelectorAll(".form-field.is-invalid").forEach((field) => {
      field.classList.remove("is-invalid");
    });
  };

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      field.closest(".form-field")?.classList.remove("is-invalid");
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearInvalidState();
    setStatus("");

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const topic = String(formData.get("topic") || "Sonstiges").trim();
    const message = String(formData.get("message") || "").trim();
    const website = String(formData.get("website") || "").trim();

    if (website) {
      setStatus("Danke – Ihre Anfrage wurde gesendet.", "is-success");
      form.reset();
      return;
    }

    let hasError = false;

    requiredFields.forEach((field) => {
      if (!String(formData.get(field.name) || "").trim()) {
        markInvalid(field);
        hasError = true;
      }
    });

    const emailField = form.querySelector('input[name="email"]');
    if (email && !emailPattern.test(email)) {
      markInvalid(emailField);
      hasError = true;
    }

    if (hasError) {
      setStatus("Bitte füllen Sie Name, E-Mail und Nachricht korrekt aus.", "is-error");
      return;
    }

    setLoading(true);

    // TODO: Wenn ein Backend vorhanden ist, hier POST /api/contact anbinden.
    const subject = encodeURIComponent(`Projektanfrage: ${topic}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Thema: ${topic}`,
        "",
        "Nachricht:",
        message,
      ].join("\n")
    );

    try {
      window.location.href = `mailto:kontakt@kuehnel-systems.de?subject=${subject}&body=${body}`;

      window.setTimeout(() => {
        setLoading(false);
        setStatus(
          "Ihr Mailprogramm wurde geöffnet. Falls das nicht funktioniert, schreiben Sie direkt an kontakt@kuehnel-systems.de.",
          "is-success"
        );
      }, 700);
    } catch (error) {
      setLoading(false);
      setStatus(
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an kontakt@kuehnel-systems.de.",
        "is-error"
      );
    }
  });
};

initContactForm(contactForm, formStatus);

if (
  networkCanvas &&
  networkCanvas.getContext &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const context = networkCanvas.getContext("2d");
  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const particles = [];
  const particleCount = Math.min(78, Math.max(42, Math.round(window.innerWidth / 22)));

  const setCanvasSize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    networkCanvas.width = Math.floor(window.innerWidth * dpr);
    networkCanvas.height = Math.floor(window.innerHeight * dpr);
    networkCanvas.style.width = `${window.innerWidth}px`;
    networkCanvas.style.height = `${window.innerHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createParticle = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.26,
    vy: (Math.random() - 0.5) * 0.26,
    radius: Math.random() * 1.9 + 1.1,
  });

  const initParticles = () => {
    particles.length = 0;
    for (let index = 0; index < particleCount; index += 1) {
      particles.push(createParticle());
    }
  };

  const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -40 || particle.x > window.innerWidth + 40) {
        particle.vx *= -1;
      }
      if (particle.y < -40 || particle.y > window.innerHeight + 40) {
        particle.vy *= -1;
      }

      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const pointerDistance = Math.sqrt(dx * dx + dy * dy);
      const pointerAlpha = Math.max(0, 1 - pointerDistance / 220) * 0.22;

      context.beginPath();
      context.fillStyle = `rgba(118, 231, 255, ${0.42 + pointerAlpha})`;
      context.shadowBlur = 18;
      context.shadowColor = "rgba(118, 231, 255, 0.24)";
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;

      for (let inner = index + 1; inner < particles.length; inner += 1) {
        const other = particles[inner];
        const lineDx = particle.x - other.x;
        const lineDy = particle.y - other.y;
        const distance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

        if (distance > 150) {
          continue;
        }

        const alpha = (1 - distance / 150) * 0.2;
        context.beginPath();
        context.strokeStyle = `rgba(118, 231, 255, ${alpha})`;
        context.lineWidth = 1;
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }
    }

    requestAnimationFrame(draw);
  };

  window.addEventListener("mousemove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  });

  window.addEventListener("resize", () => {
    setCanvasSize();
    initParticles();
  });

  setCanvasSize();
  initParticles();
  draw();
}

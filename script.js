/* ══════════════════════════════════════════════════
   PROJECTS DATA
   ─────────────────────────────────────────────────
   Para añadir un nuevo proyecto, copia un objeto del
   array y rellena los campos. Campos disponibles:

   num       → Número de orden (string, ej. "05")
   name      → Nombre del proyecto
   category  → Categoría: "web" | "mobile" | "desktop" | "data"
   stack     → Tecnologías separadas por ·
   date      → Fecha (object {es, en})
   desc      → Descripción (object {es, en})
   links     → Array de { label {es,en}, url, icon, disabled? }
   featured  → true = se muestra en los primeros 4 visibles
══════════════════════════════════════════════════ */
const PROJECTS = [
  {
    num: "01",
    name: "Chapi Escritorio",
    category: "desktop",
    stack: "Java + MySQL",
    date: { es: "Mar – Jun 2025", en: "Mar – Jun 2025" },
    desc: {
      es: "App de escritorio de recordatorios para personas mayores, desarrollada como TFC del ciclo DAM. Pensada para mejorar la autonomía de usuarios mayores con una interfaz clara e intuitiva.",
      en: "Desktop reminder app for elderly people, built as the DAM final project. Designed to improve the autonomy of older users with a clean, intuitive interface."
    },
    links: [
      { label: { es: "Ver GitHub", en: "View GitHub" }, url: "https://github.com/ManuLuna05/Chapi-Escritorio", icon: "ri-github-line" }
    ],
    featured: true
  },
  {
    num: "02",
    name: "Ecosistema Big Data",
    category: "data",
    stack: "Spark · HDFS · Kafka · Python",
    date: { es: "2026", en: "2026" },
    desc: {
      es: "Este proyecto simula un sistema de biig data, al que llegan datos en tiempo real de un partido de fútbol.",
        en: "This project simulates a big data system, where real-time data from a football match arrives."
      },
    links: [
      { label: { es: "Ver GitHub", en: "View GitHub" }, url: "https://github.com/ManuLuna05/real-time-football-analytics", icon: "ri-github-line" }
    ],
    featured: true
  },
  {
    num: "03",
    name: "Web Occult FC",
    category: "web",
    stack: "PHP · Laravel · HTML · CSS · JS",
    date: { es: "Ago – Sep 2025", en: "Aug – Sep 2025" },
    desc: {
      es: "Sitio web completo para el equipo de fútbol Occult FC: gestión de plantilla, resultados y noticias. Desplegado en Render con Laravel como framework backend.",
      en: "Full website for Occult FC football team: squad management, results, and news. Deployed on Render with Laravel as the backend framework."
    },
    links: [
      { label: { es: "Ver web", en: "View site" }, url: "https://occult-wk19.onrender.com", icon: "ri-external-link-line" }
    ],
    featured: true
  },
  {
    num: "04",
    name: "Sistema Experto",
    category: "data",
    stack: "Python · HTML · CSS · Flask",
    date: { es: "2026", en: "2026" },
    desc: {
      es: "Este proyecto es un sistema experto que predice la posición más óptima para un jugador en base a sus estadísticas más básicas.",
        en: "This project is an expert system that predicts the optimal position for a player based on their basic statistics."
      },
    links: [
      { label: { es: "Ver GitHub", en: "View GitHub" }, url: "https://github.com/ManuLuna05/Sistema-Experto", icon: "ri-github-line" }
    ],
    featured: true
  },
  {
    num: "05",
    name: "Gestor Reuniones",
    category: "mobile",
    stack: "Flutter/Dart + Firebase",
    date: { es: "Abr – Jun 2025", en: "Apr – Jun 2025" },
    desc: {
      es: "App móvil de gestión de reuniones desarrollada durante las prácticas en Plenitas. Backend en tiempo real con Firebase Firestore y autenticación integrada.",
      en: "Mobile meeting management app built during the internship at Plenitas. Real-time backend with Firebase Firestore and integrated authentication."
    },
    links: [
      { label: { es: "No disponible", en: "Not available" }, icon: "ri-lock-line", disabled: true }
    ],
    featured: true
  },
  {
    num: "06",
    name: "Web Portfolio",
    category: "web",
    stack: "HTML · CSS · JavaScript",
    date: { es: "2025", en: "2025" },
    desc: {
      es: "Este mismo portfolio — diseño responsivo, modo claro/oscuro, i18n ES/EN, publicado en GitHub Pages.",
      en: "This very portfolio — responsive design, light/dark mode, ES/EN i18n, published on GitHub Pages."
    },
    links: [
      { label: { es: "Ver web", en: "View site" }, url: "https://manuluna05.github.io/WebCV/", icon: "ri-external-link-line" },
      { label: { es: "GitHub", en: "GitHub" }, url: "https://github.com/ManuLuna05/WebCV", icon: "ri-github-line" }
    ],
    featured: true
  },
  /* ── AÑADE AQUÍ TUS NUEVOS PROYECTOS ──
  ,{
    num: "05",
    name: "Nombre del proyecto",
    category: "data",          // web | mobile | desktop | data
    stack: "Python · Pandas · Scikit-learn",
    date: { es: "Ene 2026", en: "Jan 2026" },
    desc: {
      es: "Descripción en español.",
      en: "Description in English."
    },
    links: [
      { label: { es: "Ver GitHub", en: "View GitHub" }, url: "https://github.com/...", icon: "ri-github-line" }
    ],
    featured: false   // false = aparece al pulsar "Ver más"
  }
  */
];

/* ── Cuántos proyectos mostrar inicialmente ── */
const INITIAL_VISIBLE = 4;

/* ══════════════════════════════════════════════════
   CATEGORY ICON MAP
══════════════════════════════════════════════════ */
const CAT_ICON = {
  web: "ri-global-line",
  mobile: "ri-smartphone-line",
  desktop: "ri-computer-line",
  data: "ri-bar-chart-2-line"
};
const CAT_LABEL = {
  web: { es: "Web", en: "Web" },
  mobile: { es: "Mobile", en: "Mobile" },
  desktop: { es: "Escritorio", en: "Desktop" },
  data: { es: "Data & IA", en: "Data & AI" }
};

/* ══════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════ */
let currentFilter = "all";
let currentLang = localStorage.getItem("language") || "es";
let showingAll = false;

/* ══════════════════════════════════════════════════
   BUILD PROJECTS HTML
══════════════════════════════════════════════════ */
function buildProjectCard(proj) {
  const lang = currentLang;
  const desc = proj.desc[lang] || proj.desc.es;
  const date = proj.date[lang] || proj.date.es;
  const cat = CAT_LABEL[proj.category]?.[lang] || proj.category;
  const icon = CAT_ICON[proj.category] || "ri-folder-line";

  const linksHTML = proj.links.map(l => {
    const label = l.label[lang] || l.label.es;
    if (l.disabled) {
      return `<span class="proj-link proj-link-disabled">
                <i class="${l.icon}"></i>
                <span>${label}</span>
              </span>`;
    }
    return `<a href="${l.url}" target="_blank" rel="noopener" class="proj-link">
              <i class="${l.icon}"></i>
              <span>${label}</span>
            </a>`;
  }).join("");

  return `
    <div class="proj-card fade-up"
         data-category="${proj.category}"
         data-index="${proj.num}">
      <div class="proj-glow"></div>
      <div class="proj-top">
        <div class="proj-num">${proj.num}</div>
        <div style="display:flex;gap:.5rem;align-items:center">
          <span class="proj-category"><i class="${icon}"></i> ${cat}</span>
          <div class="proj-date">${date}</div>
        </div>
      </div>
      <div class="proj-name">${proj.name}</div>
      <div class="proj-stack">${proj.stack}</div>
      <p class="proj-desc">${desc}</p>
      <div class="proj-footer">${linksHTML}</div>
    </div>`;
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  const wrap = document.getElementById("projMoreWrap");
  const btn = document.getElementById("projMoreBtn");

  // Filter
  const filtered = currentFilter === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === currentFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="proj-empty">
      ${currentLang === "es" ? "No hay proyectos en esta categoría." : "No projects in this category."}
    </div>`;
    wrap.classList.add("hidden");
    return;
  }

  grid.innerHTML = filtered.map(buildProjectCard).join("");

  // Show / collapse cards beyond INITIAL_VISIBLE
  const cards = grid.querySelectorAll(".proj-card");
  const hasMore = cards.length > INITIAL_VISIBLE;

  cards.forEach((card, i) => {
    if (!showingAll && i >= INITIAL_VISIBLE) {
      card.classList.add("proj-collapsed");
    } else {
      card.classList.remove("proj-collapsed");
    }
  });

  // Button visibility
  if (hasMore) {
    wrap.classList.remove("hidden");
    const label = btn.querySelector(".proj-more-label");
    if (showingAll) {
      label.setAttribute("data-lang-es", "Ver menos");
      label.setAttribute("data-lang-en", "Show less");
      label.textContent = currentLang === "es" ? "Ver menos" : "Show less";
      btn.classList.add("expanded");
    } else {
      const remaining = cards.length - INITIAL_VISIBLE;
      const labelEs = `Ver más proyectos (${remaining})`;
      const labelEn = `Show more projects (${remaining})`;
      label.setAttribute("data-lang-es", labelEs);
      label.setAttribute("data-lang-en", labelEn);
      label.textContent = currentLang === "es" ? labelEs : labelEn;
      btn.classList.remove("expanded");
    }
  } else {
    wrap.classList.add("hidden");
  }

  // Re-observe new cards for fade-up
  grid.querySelectorAll(".fade-up").forEach(el => {
    el.classList.remove("visible");
    io.observe(el);
  });
}

/* ══════════════════════════════════════════════════
   FILTER BUTTONS
══════════════════════════════════════════════════ */
document.getElementById("projFilters").addEventListener("click", e => {
  const btn = e.target.closest(".proj-filter-btn");
  if (!btn) return;

  document.querySelectorAll(".proj-filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  showingAll = false;
  renderProjects();
});

/* ══════════════════════════════════════════════════
   SHOW MORE / SHOW LESS
══════════════════════════════════════════════════ */
document.getElementById("projMoreBtn").addEventListener("click", () => {
  showingAll = !showingAll;
  renderProjects();

  // If collapsing, scroll back to projects section
  if (!showingAll) {
    document.getElementById("projects")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

/* ══════════════════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════════════════ */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.pageYOffset > 60);
});

/* ══════════════════════════════════════════════════
   ACTIVE NAV LINK
══════════════════════════════════════════════════ */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  const y = window.pageYOffset + 120;
  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${sec.id}`);
      });
    }
  });
});

/* ══════════════════════════════════════════════════
   HAMBURGER
══════════════════════════════════════════════════ */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const icon = hamburger.querySelector("i");
  icon.className = mobileMenu.classList.contains("open") ? "ri-close-line" : "ri-menu-3-line";
});
function closeMobile() {
  mobileMenu.classList.remove("open");
  hamburger.querySelector("i").className = "ri-menu-3-line";
}

/* ══════════════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
    }
  });
});

/* ══════════════════════════════════════════════════
   LANGUAGE
══════════════════════════════════════════════════ */
const langToggle = document.getElementById("langToggle");
const langText = langToggle.querySelector(".lang-text");

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("language", lang);
  langText.textContent = lang.toUpperCase();
  document.querySelectorAll("[data-lang-es], [data-lang-en]").forEach(el => {
    const val = el.getAttribute(`data-lang-${lang}`);
    if (!val) return;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.value = val;
    } else {
      el.innerHTML = val;
    }
  });
  // Re-render projects to update descriptions and labels
  renderProjects();
}

/* ══════════════════════════════════════════════════
   INTERSECTION OBSERVER (fade-up)
   — debe declararse ANTES de applyLang y renderProjects
══════════════════════════════════════════════════ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".fade-up").forEach(el => io.observe(el));

/* ══════════════════════════════════════════════════
   INIT — aplica idioma y renderiza proyectos
══════════════════════════════════════════════════ */
applyLang(currentLang);
langToggle.addEventListener("click", () => applyLang(currentLang === "es" ? "en" : "es"));

/* ══════════════════════════════════════════════════
   CONSOLE
══════════════════════════════════════════════════ */
console.log("%c👋 Manuel Luna Alarcón — Data Analyst & AI Dev", "font-size:14px;font-weight:bold;color:#00d4aa;");
console.log("%cGitHub: https://github.com/ManuLuna05", "color:#7a9aae;font-size:12px;");
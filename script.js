const root = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const themeColor = document.getElementById("theme-color");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const siteHeader = document.querySelector(".site-header");

let hasSavedTheme = false;

try {
  hasSavedTheme = ["light", "dark"].includes(
    localStorage.getItem("igor-theme"),
  );
} catch (_) {}

function applyTheme(theme, savePreference = false) {
  const isDark = theme === "dark";

  root.dataset.theme = isDark ? "dark" : "light";

  if (themeToggle) {
    const action = isDark ? "Ativar tema claro" : "Ativar tema escuro";
    themeToggle.setAttribute("aria-label", action);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.title = action;
  }

  if (themeColor) {
    themeColor.content = isDark ? "#11120f" : "#f2efe7";
  }

  if (savePreference) {
    try {
      localStorage.setItem("igor-theme", root.dataset.theme);
      hasSavedTheme = true;
    } catch (_) {}
  }
}

applyTheme(root.dataset.theme);

themeToggle?.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
});

const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

colorScheme.addEventListener?.("change", (event) => {
  if (!hasSavedTheme) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

function setMenu(open) {
  body.classList.toggle("menu-open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

menuToggle?.addEventListener("click", () => {
  setMenu(!body.classList.contains("menu-open"));
});

mainNav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("menu-open")) {
    setMenu(false);
    menuToggle?.focus();
  }
});

document.addEventListener("click", (event) => {
  if (
    body.classList.contains("menu-open") &&
    !event.target.closest(".site-header")
  ) {
    setMenu(false);
  }
});

window.matchMedia("(min-width: 801px)").addEventListener?.("change", (event) => {
  if (event.matches) setMenu(false);
});

function updateHeader() {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];

function setActiveSection(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.hash === `#${sectionId}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActiveSection(visible.target.id);
    },
    {
      rootMargin: "-28% 0px -58% 0px",
      threshold: [0, 0.1, 0.25],
    },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const formulario = document.getElementById("formulario");

formulario?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formulario.checkValidity()) {
    formulario.reportValidity();
    return;
  }

  const nome = document.getElementById("nome")?.value.trim();
  const mensagem = document.getElementById("mensagem")?.value.trim();
  const telefone = "5573988572192";
  const texto = `Olá! Me chamo ${nome}. ${mensagem}`;
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

const year = document.getElementById("current-year");

if (year) {
  year.textContent = new Date().getFullYear();
}

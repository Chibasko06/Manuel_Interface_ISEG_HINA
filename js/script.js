const root = document.documentElement;
const sidebar = document.getElementById("sidebar");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const themeToggle = document.getElementById("themeToggle");
const printPage = document.getElementById("printPage");
const searchInput = document.getElementById("searchInput");
const searchCount = document.getElementById("searchCount");
const backToTop = document.getElementById("backToTop");
const mainNav = document.getElementById("mainNav");
const dynamicToc = document.getElementById("dynamicToc");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

const navLinks = [...mainNav.querySelectorAll("a")];
const sections = [...document.querySelectorAll("[data-title]")].filter((section) => section.id !== "sommaire");
const searchableSections = [...document.querySelectorAll(".doc-section, .hero")];

function setTheme(theme) {
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem("hina-manual-theme", theme);
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre");
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buildToc() {
  const fragment = document.createDocumentFragment();
  sections.forEach((section) => {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = section.dataset.title;
    fragment.appendChild(link);
  });
  dynamicToc.appendChild(fragment);
}

function toggleSidebar(force) {
  const shouldOpen = typeof force === "boolean" ? force : !sidebar.classList.contains("is-open");
  sidebar.classList.toggle("is-open", shouldOpen);
}

function activateNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

function runSearch() {
  const query = normalizeText(searchInput.value.trim());
  let visible = 0;

  searchableSections.forEach((section) => {
    section.classList.remove("search-highlight");
    if (!query) {
      section.classList.remove("is-hidden-by-search");
      return;
    }

    const matches = normalizeText(section.innerText).includes(query);
    section.classList.toggle("is-hidden-by-search", !matches);
    section.classList.toggle("search-highlight", matches);
    if (matches) visible += 1;
  });

  searchCount.textContent = query ? `${visible} section(s) trouvée(s)` : "";
}

function openLightbox(img) {
  lightboxImage.src = img.dataset.full || img.src;
  lightboxImage.alt = img.alt;
  const caption = img.closest("figure")?.querySelector("figcaption")?.textContent || "";
  lightboxCaption.textContent = caption;
  lightbox.classList.add("is-open");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
}

function initCollapsibles() {
  document.querySelectorAll(".collapsible-section").forEach((section) => {
    const button = section.querySelector(".section-toggle");
    button.addEventListener("click", () => {
      const collapsed = section.classList.toggle("is-collapsed");
      button.setAttribute("aria-expanded", String(!collapsed));
    });
  });
}

function initCurrentSectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        activateNav(visible.target.id);
      }
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0.08, 0.2, 0.4],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initImageZoom() {
  document.querySelectorAll(".image-card img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
    img.tabIndex = 0;
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });
}

function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 980px)").matches) {
        toggleSidebar(false);
      }
    });
  });
}

function initEvents() {
  openMenu.addEventListener("click", () => toggleSidebar(true));
  closeMenu.addEventListener("click", () => toggleSidebar(false));
  themeToggle.addEventListener("click", () => setTheme(root.classList.contains("dark") ? "light" : "dark"));
  printPage.addEventListener("click", () => window.print());
  searchInput.addEventListener("input", runSearch);

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 520);
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      toggleSidebar(false);
    }
  });
}

function init() {
  const preferredTheme = localStorage.getItem("hina-manual-theme") || "light";
  setTheme(preferredTheme);
  buildToc();
  initCollapsibles();
  initCurrentSectionObserver();
  initImageZoom();
  initSmoothNav();
  initEvents();
}

init();

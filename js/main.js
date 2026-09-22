// Inselheimat Spiekeroog — main.js
// Mobile Navigation, aktiver Menüpunkt, Formular-Feedback (ohne Framework)

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  markActiveNavLink();
  initContactForm();
  initLightbox();
});

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Menü schließen, wenn ein Link angeklickt wird (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function markActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav__list a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initLightbox() {
  const galleries = document.querySelectorAll(".gallery");
  if (!galleries.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="Schließen">&times;</button>
    <button type="button" class="lightbox__prev" aria-label="Vorheriges Bild">&#8249;</button>
    <button type="button" class="lightbox__next" aria-label="Nächstes Bild">&#8250;</button>
    <div class="lightbox__content">
      <img class="lightbox__image" src="" alt="">
      <p class="lightbox__caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  const imageEl = lightbox.querySelector(".lightbox__image");
  const captionEl = lightbox.querySelector(".lightbox__caption");
  const closeBtn = lightbox.querySelector(".lightbox__close");
  const prevBtn = lightbox.querySelector(".lightbox__prev");
  const nextBtn = lightbox.querySelector(".lightbox__next");

  let currentImages = [];
  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + currentImages.length) % currentImages.length;
    const img = currentImages[currentIndex];
    imageEl.src = img.currentSrc || img.src;
    imageEl.alt = img.alt || "";
    captionEl.textContent = img.alt || "";
  }

  function open(images, index) {
    currentImages = images;
    show(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleries.forEach((gallery) => {
    const images = Array.from(gallery.querySelectorAll("img"));
    images.forEach((img, index) => {
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "Bild vergrößern" + (img.alt ? ": " + img.alt : ""));
      img.addEventListener("click", () => open(images, index));
      img.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open(images, index);
        }
      });
    });
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", () => show(currentIndex + 1));
  prevBtn.addEventListener("click", () => show(currentIndex - 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") show(currentIndex + 1);
    if (event.key === "ArrowLeft") show(currentIndex - 1);
  });
}

function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    // Platzhalter: Hier später echten Versand (z. B. per Mail-API oder Formspree) einbinden.
    if (status) {
      status.textContent = "Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.";
      status.hidden = false;
    }
    form.reset();
  });
}

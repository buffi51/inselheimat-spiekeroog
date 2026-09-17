// Inselheimat Spiekeroog — main.js
// Mobile Navigation, aktiver Menüpunkt, Formular-Feedback (ohne Framework)

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  markActiveNavLink();
  initContactForm();
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

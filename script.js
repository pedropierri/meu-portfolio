document.addEventListener("DOMContentLoaded", () => {

  // ====================================================
  // 1. TYPING EFFECT (HERO)
  // ====================================================
  const typedTextElement = document.getElementById("typed-text");
  const textArray = ["front-end", "react-developer", "FIAP-student"];

  let textArrayIndex = 0;
  let charIndex = 0;

  const typingDelay = 80;
  const erasingDelay = 80;
  const newTextDelay = 2000;

  function type() {
    if (!typedTextElement) return;

    if (charIndex < textArray[textArrayIndex].length) {
      typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextElement.textContent =
        textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, typingDelay);
    }
  }

  type();

  // ====================================================
  // 2. TYPE ON SCROLL (TÍTULOS)
  // ====================================================
  function typeStatic(element, text) {
    let i = 0;
    const delay = 60;

    function typeChar() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, delay);
      }
    }

    typeChar();
  }

  // ====================================================
  // 3. REVEAL PADRÃO (APENAS TEXTOS E TÍTULOS)
  // ====================================================
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        if (el.classList.contains("type-on-scroll")) {
          const text = el.getAttribute("data-text");
          typeStatic(el, text);
        } else {
          el.classList.add("reveal-visible");
        }

        observer.unobserve(el);
      });
    },
    { threshold: 0.1 }
  );

  // ⚠️ EXCLUÍMOS cards e ícones daqui
  document
    .querySelectorAll(
      ".reveal-hidden:not(.skill-item):not(.project-card):not(.social-icon-link), .type-on-scroll"
    )
    .forEach((el) => revealObserver.observe(el));

  // ====================================================
  // 4. REVEAL SEQUENCIAL (CORE REAL)
  // ====================================================
  function revealSequential(containerSelector, itemSelector, delay = 150) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);

    // GARANTE que começam invisíveis
    items.forEach((item) => {
      item.classList.remove("reveal-visible");
    });

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;

        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("reveal-visible");
          }, index * delay);
        });

        obs.unobserve(container);
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
  }

  // ====================================================
  // 5. APLICAÇÃO SEQUENCIAL
  // ====================================================

  revealSequential(".skills-grid", ".skill-item", 120);
  revealSequential(".projects-grid", ".project-card", 180);
  revealSequential(".social-links", ".social-icon-link", 120);

  // ====================================================
  // 6. HEADER SCROLL EFFECT
  // ====================================================
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

});

// ===============================================
// JAVASCRIPT FINAL PARA INTERATIVIDADE
// ===============================================

// Helper function para digitação de UMA ÚNICA VEZ (para Títulos de Seção)
function typeStatic(element, text) {
  let i = 0;
  const typingDelay = 70;

  function typeChar() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, typingDelay);
    }
  }
  typeChar();
}

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
  // 1. TYPEWRITER EFFECT (ANIMAÇÃO EM LOOP NA BIO)
  // ----------------------------------------------------

  const typedTextElement = document.getElementById("typed-text");
  const textArray = [
    "front-end developer",
    "react developer",
    "wordpress developer",
    "FIAP student",
  ];

  const typingDelay = 80;
  const erasingDelay = 80;
  const newTextDelay = 2000;

  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (!typedTextElement) return;

    if (charIndex < textArray[textArrayIndex].length) {
      typedTextElement.textContent +=
        textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextElement.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) {
        textArrayIndex = 0;
      }
      setTimeout(type, typingDelay + 100);
    }
  }

  if (typedTextElement) {
    type();
  }

  // ----------------------------------------------------
  // 3. SCROLL REVEAL (CARDS DESLIZAM / TÍTULOS DIGITAM)
  // ----------------------------------------------------

  function setupScrollReveal() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // Dispara quando 20% do elemento está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // Título (type-on-scroll): Inicia a digitação
          if (el.classList.contains("type-on-scroll")) {
            const fullText = el.getAttribute("data-text");
            typeStatic(el, fullText);
          }
          // Card/Subtítulo (reveal-hidden): Inicia o slide-up
          else if (el.classList.contains("reveal-hidden")) {
            el.classList.add("reveal-visible");
          }

          // Para de observar após a animação
          observer.unobserve(el);
        }
      });
    }, options);

    const revealElements = document.querySelectorAll(
      ".reveal-hidden, .type-on-scroll"
    );

    let delay = 0;
    const staggerIncrement = 150; // Atraso sequencial

    revealElements.forEach((el) => {
      // Aplica o atraso sequencial SOMENTE aos elementos de slide-up
      if (el.classList.contains("reveal-hidden")) {
        el.style.setProperty("--animation-delay", `${delay}ms`);
        delay += staggerIncrement;
      }

      observer.observe(el);
    });
  }

  setupScrollReveal();
});

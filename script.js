/* ==========================================================================
   JAVASCRIPT PORTFOLIO YAJAHIRA PUC
   Regional Commercial Leader — Club by Meliá
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     1. Mobile Menu Toggle
     ========================================== */
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const mobileMenuIcon = mobileMenuToggle ? mobileMenuToggle.querySelector("i") : null;

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      if (mobileMenuIcon) {
        if (navMenu.classList.contains("active")) {
          mobileMenuIcon.classList.remove("fa-bars");
          mobileMenuIcon.classList.add("fa-times");
        } else {
          mobileMenuIcon.classList.remove("fa-times");
          mobileMenuIcon.classList.add("fa-bars");
        }
      }
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        if (mobileMenuIcon) {
          mobileMenuIcon.classList.remove("fa-times");
          mobileMenuIcon.classList.add("fa-bars");
        }
      });
    });
  }

  /* ==========================================
     2. Dark / Light Theme Toggle
     ========================================== */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme") || "dark";

  if (savedTheme === "light") {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  } else {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    if (themeIcon) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        if (themeIcon) {
          themeIcon.classList.remove("fa-moon");
          themeIcon.classList.add("fa-sun");
        }
        localStorage.setItem("theme", "light");
      } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        if (themeIcon) {
          themeIcon.classList.remove("fa-sun");
          themeIcon.classList.add("fa-moon");
        }
        localStorage.setItem("theme", "dark");
      }
    });
  }

  /* ==========================================
     3. Typewriter Effect
     ========================================== */
  const typewriterElement = document.getElementById("typewriter");
  const words = [
    "Regional Commercial Leader",
    "Associate Director of Sales — Club by Meliá",
    "Estratega en Ventas, Marketing & Revenue",
    "Vacation Ownership & Resort Growth Leader",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    if (!typewriterElement) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  if (typewriterElement) {
    type();
  }

  /* ==========================================
     4. Projects / Hotels Filter Logic
     ========================================== */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        card.style.opacity = "0";
        card.style.transform = "scale(0.85)";

        setTimeout(() => {
          if (filterValue === "all" || cardCategory === filterValue) {
            card.style.display = "flex";
            card.offsetHeight; // trigger reflow
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          } else {
            card.style.display = "none";
          }
        }, 250);
      });
    });
  });

  /* ==========================================
     5. ScrollSpy (Active Navigation Link Indicator)
     ========================================== */
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-link");

  function getHeaderHeight() {
    const header = document.getElementById("main-header");
    return header ? header.offsetHeight : 80;
  }

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - getHeaderHeight();
      if (window.pageYOffset >= sectionTop - 60) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSectionId}`) {
        item.classList.add("active");
      }
    });
  });

  /* ==========================================
     6. Interactive Card Tilt on Hover
     ========================================== */
  const tiltableCards = document.querySelectorAll(".methodology-card, .project-card, .stat-card-hero");

  tiltableCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const cardRect = card.getBoundingClientRect();
      const x = e.clientX - cardRect.left;
      const y = e.clientY - cardRect.top;

      const middleX = cardRect.width / 2;
      const middleY = cardRect.height / 2;

      const rotateX = ((y - middleY) / middleY) * -6;
      const rotateY = ((x - middleX) / middleX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });

  /* ==========================================
     7. Scroll Reveal Animations (Intersection Observer)
     ========================================== */
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
        .reveal-item {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-item.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(styleSheet);

  const revealItems = [
    ...document.querySelectorAll(".stat-card-hero"),
    ...document.querySelectorAll(".methodology-card"),
    ...document.querySelectorAll(".skill-category-card"),
    ...document.querySelectorAll(".timeline-item"),
    ...document.querySelectorAll(".project-card"),
    ...document.querySelectorAll(".contact-card-item"),
    document.querySelector(".hero-photo-card"),
    document.querySelector(".about-compact-container"),
    document.querySelector(".kpi-ownership-container"),
  ].filter(Boolean);

  revealItems.forEach((item) => item.classList.add("reveal-item"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
});

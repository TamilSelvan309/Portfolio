/* =========================================================
   TAMIL SELVAN M — PORTFOLIO SCRIPT
   Vanilla JS. No dependencies.
   ========================================================= */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* -----------------------------------------------------
     0. PAGE LOADER
  ----------------------------------------------------- */
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
    }
    loaderFill.style.width = progress + '%';
  }, 120);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 500);
  });

  /* -----------------------------------------------------
     1. CUSTOM CURSOR
  ----------------------------------------------------- */
  if (!isTouch) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .tilt-card, input, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
  }

  /* -----------------------------------------------------
     2. SCROLL PROGRESS BAR + NAVBAR STATE
  ----------------------------------------------------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
    navbar.classList.toggle('scrolled', scrollTop > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -----------------------------------------------------
     3. MOBILE MENU / HAMBURGER
  ----------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* -----------------------------------------------------
     4. THEME TOGGLE (dark / light)
  ----------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('tsm-theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'light'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('tsm-theme', next);
    themeToggle.innerHTML = next === 'light'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });

  /* -----------------------------------------------------
     5. TYPING ANIMATION (Hero role)
  ----------------------------------------------------- */
  const roles = [
    'Laravel Developer',
    'Full Stack Developer',
    'PHP Developer',
    'CRM Developer',
    'Server Administrator',
    'AI Enthusiast'
  ];
  const typedEl = document.getElementById('typed');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 70);
  }
  typeLoop();

  /* -----------------------------------------------------
     6. SCROLL REVEAL ANIMATIONS
  ----------------------------------------------------- */
  const revealItems = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealItems.forEach((el) => revealObserver.observe(el));

  /* -----------------------------------------------------
     7. COUNTER ANIMATION (About stats)
  ----------------------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const step = Math.max(target / 40, 1);
        const tick = () => {
          current += step;
          if (current >= target) {
            el.textContent = target;
          } else {
            el.textContent = Math.floor(current);
            requestAnimationFrame(tick);
          }
        };
        tick();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => counterObserver.observe(el));

  /* -----------------------------------------------------
     8. MAGNETIC BUTTONS
  ----------------------------------------------------- */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0,0)';
      });
    });
  }

  /* -----------------------------------------------------
     9. 3D TILT CARDS (mouse-controlled)
  ----------------------------------------------------- */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /* -----------------------------------------------------
     10. HERO MOUSE PARALLAX (orbit)
  ----------------------------------------------------- */
  const heroOrbit = document.querySelector('.hero-orbit');
  if (heroOrbit && !isTouch && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      heroOrbit.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }

  /* -----------------------------------------------------
     11. RIPPLE CLICK EFFECT (buttons)
  ----------------------------------------------------- */
  document.querySelectorAll('.btn, .social-icon, .theme-toggle, .back-to-top').forEach((el) => {
    el.style.position = el.style.position || 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', function (e) {
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* -----------------------------------------------------
     12. ACTIVE NAV LINK + SECTION INDICATOR DOTS
  ----------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const indicator = document.getElementById('sectionIndicator');

  sections.forEach((sec) => {
    const dot = document.createElement('span');
    dot.dataset.target = sec.id;
    dot.title = sec.id;
    indicator.appendChild(dot);
  });
  const indicatorDots = indicator.querySelectorAll('span');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((l) => l.classList.toggle('active', l.dataset.section === id));
        indicatorDots.forEach((d) => d.classList.toggle('active', d.dataset.target === id));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach((sec) => sectionObserver.observe(sec));

  indicatorDots.forEach((dot) => {
    dot.style.cursor = 'pointer';
    dot.addEventListener('click', () => {
      document.getElementById(dot.dataset.target).scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* -----------------------------------------------------
     13. BACK TO TOP
  ----------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* -----------------------------------------------------
     14. CONTACT FORM (front-end only demo submit)
  ----------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const submitLabel = document.getElementById('submitLabel');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitLabel.textContent = 'Sending...';
    setTimeout(() => {
      submitLabel.textContent = 'Send Message';
      formNote.textContent = "Thanks — your message has been noted. I'll reply soon.";
      contactForm.reset();
    }, 1000);
  });

  /* -----------------------------------------------------
     15. YEAR IN FOOTER
  ----------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* -----------------------------------------------------
     16. PARTICLE BACKGROUND (canvas)
  ----------------------------------------------------- */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }

  function createParticles() {
    const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? '124,58,237' : '6,182,212'
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},0.5)`;
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }

  if (!prefersReducedMotion) {
    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
  }

})();

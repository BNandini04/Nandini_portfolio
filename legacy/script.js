(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const cursorGlow = document.getElementById('cursorGlow');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky header
  function handleScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile nav
  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach(function (el) { revealObserver.observe(el); });

  // Active nav
  const sections = document.querySelectorAll('section[id]');
  const navItems = navLinks.querySelectorAll('a[href^="#"]');
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(function (item) {
            item.style.color = '';
            if (item.getAttribute('href') === '#' + id) {
              item.style.color = 'var(--text-primary)';
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );
  sections.forEach(function (section) { sectionObserver.observe(section); });

  // Typing effect
  if (!prefersReducedMotion) {
    const typedEl = document.getElementById('typedText');
    const phrases = [
      'Building intelligent products that scale.',
      'Leading AI-driven engineering teams.',
      'Shipping fast with Cursor & n8n.',
      'Turning ideas into scalable systems.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 70;

      if (!isDeleting && charIndex === current.length) {
        delay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(typeLoop, delay);
    }

    if (typedEl) setTimeout(typeLoop, 800);
  } else {
    const typedEl = document.getElementById('typedText');
    if (typedEl) typedEl.textContent = 'Building intelligent products that scale.';
    document.querySelector('.typed-cursor')?.remove();
  }

  // Counter animation
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.max(1, Math.floor(target / 30));
        const timer = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 40);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(function (el) { counterObserver.observe(el); });

  // Cursor glow
  if (cursorGlow && !prefersReducedMotion && window.innerWidth > 768) {
    let glowX = 0;
    let glowY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });

    function animateGlow() {
      glowX += (targetX - glowX) * 0.08;
      glowY += (targetY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // 3D tilt on cards
  if (!prefersReducedMotion && window.innerWidth > 768) {
    document.querySelectorAll('.tilt-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';

        if (card.classList.contains('glow-card')) {
          const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
          card.style.setProperty('--glow-angle', angle + 'deg');
        }
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.removeProperty('--glow-angle');
      });
    });
  }

  // Particle network
  if (!prefersReducedMotion) {
    const canvas = document.getElementById('particles');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      let animId;

      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      function createParticles() {
        const count = Math.min(80, Math.floor(window.innerWidth / 18));
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.5
          });
        }
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function (p, i) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = 'rgba(56, 189, 248, ' + (0.15 * (1 - dist / 120)) + ')';
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });

        animId = requestAnimationFrame(draw);
      }

      resize();
      createParticles();
      draw();

      window.addEventListener('resize', function () {
        resize();
        createParticles();
      });
    }
  }

  // Rotating glow border on featured skill card
  if (!prefersReducedMotion) {
    const featured = document.querySelector('.skill-card--featured');
    if (featured) {
      let angle = 0;
      function rotateGlow() {
        angle = (angle + 0.5) % 360;
        featured.style.setProperty('--glow-angle', angle + 'deg');
        requestAnimationFrame(rotateGlow);
      }
      rotateGlow();
    }
  }
})();

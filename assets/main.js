/* ==========================================================
   Expert Tree Services — Main JavaScript
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initMobileNav();
  initEstimateForm();
  initSmoothScroll();
  initCountUp();
});

/* ── Navbar Scroll Effect ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Scroll Reveal (IntersectionObserver) ── */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* ── Mobile Navigation ── */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('mobile-overlay');

  if (!hamburger || !navLinks) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';

    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  }

  hamburger.addEventListener('click', toggleMenu);

  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }

  // Close on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

/* ── Smooth Scroll for Anchor Links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Count Up Animation ── */
function initCountUp() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(counter => {
      counter.textContent = counter.dataset.target;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          animateValue(el, 0, target, 2000, prefix, suffix);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

function animateValue(el, start, end, duration, prefix, suffix) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    el.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ── Estimate Form Validation ── */
function initEstimateForm() {
  const form = document.getElementById('estimate-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#form-name');
    const email = form.querySelector('#form-email');
    const phone = form.querySelector('#form-phone');
    let valid = true;

    [name, email, phone].forEach(input => {
      if (input && !input.value.trim()) {
        input.style.borderColor = 'var(--ember)';
        valid = false;
      } else if (input) {
        input.style.borderColor = '';
      }
    });

    if (email && email.value && !isValidEmail(email.value)) {
      email.style.borderColor = 'var(--ember)';
      valid = false;
    }

    if (valid) {
      // Show success state
      const btn = form.querySelector('.btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>✓ Request Sent!</span>';
      btn.style.background = 'var(--canopy)';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }
  });

  // Clear error on input
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

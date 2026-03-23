/* ============================================
   AUDITSA - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Active nav link ----
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Mobile nav toggle ----
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Navbar scroll shadow ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Intersection Observer for animations ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up, .fade-in').forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = (i % 4) * 80;
    observer.observe(el);
  });

  // ---- Contact form validation ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = ['name', 'email', 'subject', 'message'];
      let valid = true;

      fields.forEach(id => {
        const el = document.getElementById(id);
        const err = document.getElementById(id + 'Error');
        if (!el) return;
        el.classList.remove('error');
        if (err) err.textContent = '';
        if (!el.value.trim()) {
          el.classList.add('error');
          if (err) err.textContent = 'Este campo es obligatorio.';
          valid = false;
        } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
          el.classList.add('error');
          if (err) err.textContent = 'Ingrese un correo electrónico válido.';
          valid = false;
        }
      });

      if (valid) {
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado!';
        btn.style.background = '#1a8a5a';
        showToast('¡Gracias! Nos pondremos en contacto pronto.');
        setTimeout(() => {
          form.reset();
          btn.disabled = false;
          btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
          btn.style.background = '';
        }, 3500);
      }
    });
  }

  // ---- Toast notification ----
  function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.style.cssText = `
        position:fixed;bottom:90px;right:28px;z-index:9999;
        background:#0d2b45;color:white;
        padding:14px 22px;border-radius:12px;
        font-family:'DM Sans',sans-serif;font-size:0.9rem;
        box-shadow:0 8px 32px rgba(13,43,69,0.35);
        transform:translateY(20px);opacity:0;
        transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
        max-width:300px;line-height:1.4;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; }, 10);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(20px)'; }, 3200);
  }

  // ---- Product filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        productCards.forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.style.display = show ? '' : 'none';
          if (show) { card.style.animation = 'none'; card.offsetHeight; card.style.animation = ''; }
        });
      });
    });
  }

  // ---- Stats counter animation ----
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => statObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * ease) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // ---- Smooth anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

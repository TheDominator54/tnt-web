(function () {
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const blocks = document.querySelectorAll('.block');
  const scrollHint = document.querySelector('[data-scroll-hint]');

  // Dynamic copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // PushPress signup
  const pushPressUrl = (document.body.getAttribute('data-pushpress-signup-url') || '').trim();
  if (pushPressUrl) {
    document.querySelectorAll('.signup-cta').forEach((el) => {
      el.setAttribute('href', pushPressUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  } else {
    document.querySelectorAll('.signup-cta').forEach((el) => {
      const fallback = el.getAttribute('data-fallback-href');
      if (fallback) el.setAttribute('href', fallback);
    });
  }

  let lastScrollY = window.scrollY;
  const scrollThreshold = 80;

  function onScroll() {
    const y = window.scrollY;
    if (y > scrollThreshold) {
      header.classList.add('is-scrolled');
      if (y > lastScrollY && y > 200) header.classList.add('is-hidden');
      else header.classList.remove('is-hidden');
    } else {
      header.classList.remove('is-scrolled', 'is-hidden');
    }
    lastScrollY = y;

    if (scrollHint && y > 100) scrollHint.style.opacity = '0';
    else if (scrollHint && y <= 100) scrollHint.style.opacity = '';
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Intersection Observer: reveal blocks
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.querySelectorAll('[data-section]').forEach((el) => el.classList.add('is-visible'));
        }
      });
    },
    { rootMargin: '-8% 0px -8% 0px', threshold: 0 }
  );

  blocks.forEach((block) => revealObserver.observe(block));

  // Active nav highlighting
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')).filter((a) => !a.classList.contains('nav-cta-mobile')) : [];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  if (sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const link = navLinks.find((a) => a.getAttribute('href') === '#' + id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Back-to-top button
  const backBtn = document.querySelector('[data-back-to-top]');
  if (backBtn) {
    const showAfter = window.innerHeight * 0.8;
    function toggleBackBtn() {
      backBtn.classList.toggle('is-visible', window.scrollY > showAfter);
    }
    window.addEventListener('scroll', toggleBackBtn, { passive: true });
    toggleBackBtn();
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // FAQ accordion
  document.querySelectorAll('[data-faq-toggle]').forEach((dt) => {
    dt.addEventListener('click', () => {
      const item = dt.closest('[data-faq]');
      const wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('[data-faq].is-open').forEach((el) => el.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  // Gallery lightbox with prev/next
  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-prev');
    const lbNext = lightbox.querySelector('.lightbox-next');
    const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
    let currentIndex = 0;

    function showImage(index) {
      currentIndex = (index + galleryImages.length) % galleryImages.length;
      lbImg.src = galleryImages[currentIndex].src;
      lbImg.alt = galleryImages[currentIndex].alt;
    }

    galleryImages.forEach((img, i) => {
      img.addEventListener('click', () => {
        showImage(i);
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
    lbNext.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }
})();

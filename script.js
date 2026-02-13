(function () {
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const blocks = document.querySelectorAll('.block');
  const scrollHint = document.querySelector('[data-scroll-hint]');

  // PushPress signup: if URL is set on <body data-pushpress-signup-url="...">, all .signup-cta links go there (new tab)
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

  // Header: hide on scroll down, show on scroll up
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

    // Hide scroll hint after scrolling
    if (scrollHint && y > 100) scrollHint.style.opacity = '0';
    else if (scrollHint && y <= 100) scrollHint.style.opacity = '';
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Intersection Observer: reveal blocks and [data-section] children
  const observer = new IntersectionObserver(
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

  blocks.forEach((block) => observer.observe(block));

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

  // Close nav on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

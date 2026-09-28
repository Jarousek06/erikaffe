// =====================================================
// ERIKAFFE — interaktivita
// =====================================================
(function () {
  'use strict';

  // ---------- Navigace: pozadí při scrollu ----------
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 60);
    toTop.classList.toggle('is-visible', window.scrollY > 600);
  };

  // ---------- Mobilní menu ----------
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
  });

  mobileMenu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  // ---------- Galerie ----------
  const galleryImages = [
    { src: 'https://i.postimg.cc/Px5GM1Mb/IMG-1270.jpg', alt: 'Interiér kavárny ERIKAFFE' },
    { src: 'https://i.postimg.cc/yY88QSLf/IMG-0822.jpg', alt: 'Posezení v kavárně ERIKAFFE' },
    { src: 'https://i.postimg.cc/QM189gdn/IMG-0824.jpg', alt: 'Útulný kout kavárny ERIKAFFE' },
    { src: 'https://i.postimg.cc/vmfYg7Z2/IMG-0955.jpg', alt: 'Káva v kavárně ERIKAFFE' },
    { src: 'https://i.postimg.cc/qMDM9MYH/IMG-1216.jpg', alt: 'Atmosféra kavárny ERIKAFFE' },
    { src: 'https://i.postimg.cc/vBvGXQ9S/IMG-2380.jpg', alt: 'Nabídka kavárny ERIKAFFE' },
    { src: 'https://i.postimg.cc/DzLvJQzz/IMG-2394.jpg', alt: 'Detail interiéru ERIKAFFE' },
    { src: 'https://i.postimg.cc/1tKyM96H/IMG-2400.jpg', alt: 'Prostředí kavárny ERIKAFFE' },
    { src: 'https://i.postimg.cc/85bTw1M8/IMG-2404.jpg', alt: 'Výzdoba kavárny ERIKAFFE' },
    { src: 'https://i.postimg.cc/yxYsbwyK/IMG-2414.jpg', alt: 'Posezení u kávy v ERIKAFFE' },
    { src: 'https://i.postimg.cc/prXR6gJN/IMG-2427.jpg', alt: 'Kavárna ERIKAFFE ve Štětí' }
  ];

  const galleryImg = document.getElementById('gallery-image');
  const galleryCurrent = document.getElementById('gallery-current');
  const galleryViewport = document.getElementById('gallery-viewport');
  document.getElementById('gallery-total').textContent = galleryImages.length;

  let index = 0;

  function showImage(i) {
    index = (i + galleryImages.length) % galleryImages.length;
    galleryImg.classList.add('is-fading');
    const next = galleryImages[index];
    const preload = new Image();
    preload.src = next.src;
    preload.onload = preload.onerror = () => {
      galleryImg.src = next.src;
      galleryImg.alt = next.alt;
      galleryImg.classList.remove('is-fading');
      galleryCurrent.textContent = index + 1;
    };
  }

  document.getElementById('gallery-prev').addEventListener('click', () => showImage(index - 1));
  document.getElementById('gallery-next').addEventListener('click', () => showImage(index + 1));

  // Klávesnice
  galleryViewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); showImage(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); showImage(index + 1); }
  });

  // Swipe na dotykových zařízeních
  let touchX = null;
  galleryViewport.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  galleryViewport.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) showImage(dx > 0 ? index - 1 : index + 1);
    touchX = null;
  }, { passive: true });

  // Přednačtení sousedních fotek
  [1, galleryImages.length - 1].forEach((offset) => {
    const img = new Image();
    img.src = galleryImages[offset].src;
  });

  // ---------- Animace při scrollu ----------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // ---------- Zvýraznění aktivní sekce v navigaci ----------
  const navLinks = document.querySelectorAll('.nav__links a');
  const sections = [...navLinks].map((a) => document.querySelector(a.hash)).filter(Boolean);
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.toggle('is-active', a.hash === '#' + entry.target.id));
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  // ---------- Zpět nahoru ----------
  const toTop = document.getElementById('to-top');
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Rok v patičce ----------
  document.getElementById('year').textContent = new Date().getFullYear();
})();

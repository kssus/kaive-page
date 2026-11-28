'use strict';

function initSectionNavigation() {
  const navbar = document.querySelector('#navbar');
  const toggle = navbar.querySelector('.navbar__toggle');
  const mobileLayout = window.matchMedia('(max-width: 768px)');

  function setMenuOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') === 'false');
  });
  mobileLayout.addEventListener('change', () => setMenuOpen(false));
  document.addEventListener('click', event => {
    if (!navbar.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  navbar.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const section = document.getElementById(link.hash.slice(1));
    if (!section) return;

    event.preventDefault();
    setMenuOpen(false);
    if (window.location.hash !== link.hash) {
      history.pushState(null, '', link.hash);
    }
    section.focus({ preventScroll: true });
    section.scrollIntoView({ block: 'start' });
  });
}

function initPerspective() {
  const images = document.querySelectorAll('.fade__img');
  let current = 0;

  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 5000);
}

function initCarousel(carousel) {
  const track = carousel.querySelector('.carousel__track');
  const currentNumber = carousel.querySelector('.carousel__current');
  const originals = Array.from(track.children);
  const total = originals.length;
  let current = 1;
  let isAnimating = false;
  let isHovered = false;
  let touchStartX;
  let timer;

  // The copies at either end let the track animate across the loop boundary.
  track.prepend(originals[total - 1].cloneNode(true));
  track.append(originals[0].cloneNode(true));
  carousel.classList.add('is-ready');
  const slides = Array.from(track.children);
  slides[0].setAttribute('aria-hidden', 'true');
  slides[total + 1].setAttribute('aria-hidden', 'true');
  carousel.querySelector('.carousel__total').textContent = String(total).padStart(2, '0');

  function updatePosition(animate) {
    track.style.transition = animate ? '' : 'none';
    track.style.transform = `translateX(-${current * 100}%)`;
    const displayNumber = (current + total - 1) % total + 1;
    currentNumber.textContent = String(displayNumber).padStart(2, '0');
    slides.forEach((slide, index) => slide.classList.toggle('is-active', index === current));
  }

  function move(direction) {
    if (isAnimating) return;

    isAnimating = true;
    current += direction;
    updatePosition(true);
  }

  function restartAutoplay() {
    clearInterval(timer);
    if (!isHovered && touchStartX === undefined) {
      timer = setInterval(() => move(1), 4500);
    }
  }

  function navigate(direction) {
    move(direction);
    restartAutoplay();
  }

  track.addEventListener('transitionend', event => {
    if (event.target !== track || event.propertyName !== 'transform') return;

    isAnimating = false;
    if (current === 0 || current === total + 1) {
      current = current === 0 ? total : 1;
      updatePosition(false);
    }
  });

  carousel.querySelector('.carousel__prev').addEventListener('click', () => navigate(-1));
  carousel.querySelector('.carousel__next').addEventListener('click', () => navigate(1));
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    event.preventDefault();
    navigate(event.key === 'ArrowRight' ? 1 : -1);
  });

  track.addEventListener('touchstart', event => {
    touchStartX = event.touches[0].clientX;
    restartAutoplay();
  }, { passive: true });
  track.addEventListener('touchend', event => {
    const distance = touchStartX - event.changedTouches[0].clientX;
    touchStartX = undefined;
    if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1);
    restartAutoplay();
  });
  track.addEventListener('touchcancel', () => {
    touchStartX = undefined;
    restartAutoplay();
  });

  carousel.addEventListener('mouseenter', () => {
    isHovered = true;
    restartAutoplay();
  });
  carousel.addEventListener('mouseleave', () => {
    isHovered = false;
    restartAutoplay();
  });

  updatePosition(false);
  restartAutoplay();
}

function initUnitPlans() {
  const section = document.querySelector('#unit');
  const viewport = section.querySelector('.unit__plan');
  const track = viewport.querySelector('.slide__wrap');
  const mobileLayout = window.matchMedia('(max-width: 768px)');
  const originals = Array.from(track.children);
  const copyCount = 4;
  const last = copyCount + originals.length - 1;
  const duration = 300;
  let current = copyCount;
  let isAnimating = false;
  let isHovered = false;
  let timer;

  const clone = slide => {
    const copy = slide.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    return copy;
  };
  track.prepend(...originals.slice(-copyCount).map(clone));
  track.append(...originals.slice(0, copyCount).map(clone));
  const slides = Array.from(track.children);

  function updatePosition(animate) {
    track.style.transition = animate ? `transform ${duration}ms` : 'none';
    const activeIndex = current + 1;
    let offset = slides[current].offsetLeft - slides[0].offsetLeft;
    if (mobileLayout.matches) {
      const activeSlide = slides[activeIndex];
      const sideSpace = (viewport.clientWidth - activeSlide.offsetWidth) / 2;
      offset = activeSlide.offsetLeft - slides[0].offsetLeft - sideSpace;
    }
    track.style.transform = `translateX(${-offset}px)`;
    slides.forEach((slide, index) => slide.classList.toggle('active', index === activeIndex));
  }

  function move(direction) {
    if (isAnimating) return;

    isAnimating = true;
    current += direction;
    updatePosition(true);

    setTimeout(() => {
      if (current < copyCount || current > last) {
        current = current < copyCount ? last : copyCount;
        updatePosition(false);
      }
      isAnimating = false;
    }, duration);
  }

  function restartAutoplay() {
    clearInterval(timer);
    if (!isHovered) timer = setInterval(() => move(1), 3000);
  }

  section.querySelector('.preBtn').addEventListener('click', () => {
    move(-1);
    restartAutoplay();
  });
  section.querySelector('.nextBtn').addEventListener('click', () => {
    move(1);
    restartAutoplay();
  });
  viewport.addEventListener('mouseenter', () => {
    isHovered = true;
    restartAutoplay();
  });
  viewport.addEventListener('mouseleave', () => {
    isHovered = false;
    restartAutoplay();
  });

  window.addEventListener('resize', () => updatePosition(false));
  updatePosition(false);
  restartAutoplay();
}

function initSiteLayout() {
  const track = document.querySelector('#track');
  const images = track.querySelectorAll('img');
  const dots = document.querySelectorAll('.dots .dot');
  const total = dots.length;
  let current = 0;

  function showSlide(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, index) => {
      const isCurrent = index === current;
      dot.classList.toggle('active', isCurrent);
      dot.setAttribute('aria-current', String(isCurrent));
    });
  }

  document.querySelector('#prev__Btn').addEventListener('click', () => showSlide(current - 1));
  document.querySelector('#next__Btn').addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  document.querySelector('.layout__enlarge').addEventListener('click', () => {
    openImagePreview(images[current]);
  });
}

function openImagePreview(image) {
  const preview = document.querySelector('#layout-preview');
  const previewScroll = preview.querySelector('.layout__preview-scroll');
  const previewImage = previewScroll.querySelector('img');
  previewImage.src = image.currentSrc || image.src;
  previewImage.alt = image.alt;
  preview.showModal();
  previewScroll.scrollLeft = 0;
}

function initLocationMapPreview() {
  const map = document.querySelector('.location-shell__map');
  const image = map.querySelector('img');
  map.querySelector('.location-shell__enlarge').addEventListener('click', () => openImagePreview(image));
}

initSectionNavigation();
initPerspective();
initCarousel(document.querySelector('#Feature'));
initUnitPlans();
initSiteLayout();
initLocationMapPreview();
initCarousel(document.querySelector('#comercial'));

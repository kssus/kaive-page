'use strict';

const FEATURE_DATA = [
  {
    image: 'img/feature-1.jpg',
    lead: '서울과 연계된 미래 교통망 계획',
    headline: ['대장홍대선 연장 추진,', '인천 1호선 박촌역'],
    desc: '첨단 계양 AX파크와 계양역을 잇는 대장홍대선 연장과 인천 1호선 박촌역의 지하철 교통망.'
  },
  {
    image: 'img/feature-2.jpg',
    lead: '자연 친화적인 쾌적한 3기 신도시',
    headline: ['신개념 선형 녹지축에 조성된', '계양벼리 선형공원'],
    desc: '여의도 공원의 약 4배에 달하는 사람 중심으로 보행 특화된 계양벼리 선형공원.'
  },
  {
    image: 'img/feature-3.jpg',
    lead: '약 335만㎡ 첨단 분야 자족도시',
    headline: ['계양AX파크', '대장 도시첨단산업단지'],
    desc: '판교 4배인 75.7만㎡의 AI 전환 분야 계양AX파크, 56만㎡의 대기업 중심의 첨단 R&D, 제조를 포함하는 부천 도시첨단산업단지'
  },
  {
    image: 'img/feature-4.jpg',
    lead: '최첨단 계양AX파크',
    headline: ['AX란?', 'AI Transformation'],
    desc: 'AI연구, 실증, 사업화 및 스타트업 육성, 산학협력 등을 포함하는 AI 용복합 산업 생태계 조성을 중점'
  },
];

const PREMIUM_DATA = [
  {
    image: 'img/premium-01.jpg',
    lead: '신도시 내 상업용지 비율이 단, 0.9%',
    headline: ['앵커테넌트 중심의 안정된 상권', '공실 걱정 없는 상업시설'],
    desc: '계양신도시 내 극히 제한된 아파트 단지 중심의 희소성 높은 프리미엄 상업시설 배치로 안정된 상권입니다.'
  },
  {
    image: 'img/premium-02.jpg',
    lead: '약 5천여 세대 배후의 안정된 상권',
    headline: ['반도건설의 특화된', '브랜드 몰 時間'],
    desc: '신도시 현장에서 검증된 반도건설의 브랜드 몰 MD와 운영 노하우를 그대로 계양에서 선보입니다.'
  },
  {
    image: 'img/premium-03.jpg',
    lead: '검증된 반도건설의 마스터리스 혜택',
    headline: ['반도건설 직영몰', '마스터리스 임대 운영 관리 계획'],
    desc: '분양과 함께 직영 운영을 통해 상권 활성화로 지속 가능한 상권 성장에 마스터리스가 함께합니다.'
  },
  {
    image: 'img/premium-04.jpg',
    lead: '계양신도시 계획인구 약 4.3만명과 계양AX파크 첨단 산업단지',
    headline: ['주거와 업무의 만남', '직주 근접형 항아리 상권'],
    desc: '주거와 업무 수요가 함께하는 상권 입지의 강점을 가진 24시 항아리형 상권입니다.'
  },
  {
    image: 'img/premium-05.jpg',
    lead: '안정적인 상가 수익 기대',
    headline: ['계약 시 임대 계약', '확정수익 보장'],
    desc: '마스터리스에 의한 시행사와 임대 계약으로 확정된 투자 수익 구조로 안심 투자를 기대할 수 있습니다.'
  },
  {
    image: 'img/premium-06.jpg',
    lead: '판교 약 1.4배 규모의 AI관련 산업단지',
    headline: ['첨단산업단지 계양AX파크', '소비성 높은 젊은 배후수요'],
    desc: '대규모 AI전환 첨단산업단지를 배후로 두어 왕성한 젊은 소비계층에 의한 안정된 높은 수요이 전망됩니다.'
  },
  {
    image: 'img/premium-07.jpg',
    lead: '계약 시점부터, 투자 수익이 발생하는 이자 지원 혜택',
    headline: ['입주 시까지 혜택주는', '계약금 이자 지원제'],
    desc: '계약과 동시에 계약금에 지원되는 이자 혜택으로 바로 실현되는 투자 수익으로 초기 부담이 크게 줄여듭니다.'
  },
  {
    image: 'img/premium-08.jpg',
    lead: '보행자 중심의 선형 공원과 함께, 유·초·중(예정)은 옆에',
    headline: ['스트릿트 상권 효과', '생활과 소비를 잇는 중심 공간'],
    desc: '걷고, 쉬면서 사람을 모으는 선형 공원의 집객 효과와 교육관련 특화된 업종까지 기대할 수 있는 밀착형 상권이 안정된 상권을 기대할 수 있습니다.'
  }
];

function initSectionNavigation() {
  document.querySelector('#navbar').addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const section = document.getElementById(link.hash.slice(1));
    if (!section) return;

    event.preventDefault();
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

function renderSlide({ image, lead, headline, desc }, index, label) {
  const number = String(index + 1).padStart(2, '0');

  return `
    <article class="carousel__slide">
      <div class="carousel__visual">
        <img src="${image}" alt="${label} ${number}" loading="lazy">
      </div>
      <div class="carousel__content">
        <div class="carousel__label">
          <span>${label}</span>
          <strong>${number}</strong>
        </div>
        <p class="carousel__lead">${lead}</p>
        <h3 class="carousel__headline">${headline.map(line => `<span>${line}</span>`).join('')}</h3>
        <p class="carousel__desc">${desc}</p>
      </div>
    </article>`;
}

function initCarousel(carousel, data, label) {
  const track = carousel.querySelector('.carousel__track');
  const currentNumber = carousel.querySelector('.carousel__current');
  const total = data.length;
  const slideMarkup = data.map((slide, index) => renderSlide(slide, index, label));
  let current = 1;
  let isAnimating = false;
  let isHovered = false;
  let touchStartX;
  let timer;

  // The copies at either end let the track animate across the loop boundary.
  track.innerHTML = [slideMarkup[total - 1], ...slideMarkup, slideMarkup[0]].join('');
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
    const offset = slides[current].offsetLeft - slides[0].offsetLeft;
    track.style.transform = `translateX(${-offset}px)`;
    slides.forEach((slide, index) => slide.classList.toggle('active', index === current + 1));
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

  updatePosition(false);
  restartAutoplay();
}

function initSiteLayout() {
  const track = document.querySelector('#track');
  const dots = document.querySelectorAll('.dots .dot');
  const total = dots.length;
  let current = 0;

  function showSlide(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, index) => dot.classList.toggle('active', index === current));
  }

  document.querySelector('#prev__Btn').addEventListener('click', () => showSlide(current - 1));
  document.querySelector('#next__Btn').addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
}

initSectionNavigation();
initPerspective();
initCarousel(document.querySelector('#Feature'), FEATURE_DATA, 'FEATURE');
initUnitPlans();
initSiteLayout();
initCarousel(document.querySelector('#comercial'), PREMIUM_DATA, 'PREMIUM');

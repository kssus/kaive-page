'use strict';

// navbar transparent when It is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  console.log(window.scrollY);
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--out');
  } else {
    navbar.classList.remove('navbar--out');
  }
});

document.addEventListener('scroll', () => {
  console.log(window.scrollY);
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('logo--out');
  } else {
    navbar.classList.remove('logo--out');
  }
});

// Phone display

const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;

const phone_box = document.querySelector('.phone_box');

document.addEventListener('scroll', () => {
  console.log(homeHeight);
  if(window.scrollY > homeHeight) {
    phone_box.classList.remove('invisible');
  } else {
    phone_box.classList.add('invisible');
  }
});

// phone_box.addEventListener('click', () => {
//   scrollIntoView('#home');
// });

// click "contact me" button
// const popupLayer = document.querySelector('.popup__contact');
// const closeBtn = document.querySelector('.btn-close');

// closeBtn.addEventListener('click', () => {
//     popupLayer.style.display = 'none';
// });

// Perspective animation

const images = document.querySelectorAll('.fade__img');
let currentIndex = 0;

function changeImage() {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}

setInterval(changeImage, 5000);

// Unit Plan
const sliderWrap = document.querySelector('.slide__wrap');
let slideItems = document.querySelectorAll('.slideItem');


// 계산된 이동 거리: 아이템 너비(390px) + 간결(25)
const itemswidth = 397;
const gap = 25;
const offset = itemswidth + gap; 
const speed = 300;
const itemsToClone = 4;
let isAnimating = false; // 누락된 변수 선언

/* 1. 복제 로직 수정 (정확한 순서로 복제) */
const originalCount = slideItems.length;

// 3개가 한 화면에 보이므로, 여유 있게 앞뒤로 복제본을 붙임.
for (let i = 0; i < itemsToClone; i++) {
  sliderWrap.append(slideItems[i].cloneNode(true));
}
for (let i = 1; i <= itemsToClone; i++) {
  sliderWrap.prepend(slideItems[originalCount - 1 - i].cloneNode(true));
}

// 복제 후 다시 설정
slideItems = document.querySelectorAll('.slideItem');
const totalCount = slideItems.length;
let currSlide = itemsToClone; // 인덱스 3부터 시작

/* 강조 효과 적용 함수 */
function updateActive() {
  slideItems.forEach(item => item.classList.remove('active'));

  let targetIdx = currSlide + 1;

  // 현재 화면 중앙의 아이템 active
  if (slideItems[targetIdx]) {
    slideItems[targetIdx].classList.add('active');

  // 위치가 11번(가짜 1번)이라면, 진짜 6번(6)에도 active를 준다.
  if (currSlide === totalCount - itemsToClone) {
    slideItems[itemsToClone + 1].classList.add('active');
    }

  //반대로 가짜 6번(0)이라면, 진짜 6번(6)에도 active를 준다.
  if (currSlide === 0) {
    slideItems[totalCount = (itemsToClone * 2) + 1].classList.add('active');
    }
  }
}


/* 이동 함수 */
function moveSlide() {
  if (isAnimating) return;
  isAnimating = true;

  sliderWrap.style.transition = `${speed}ms`;
  sliderWrap.style.transform = `translateX(-${offset * currSlide}px)`;
  updateActive();
  
  setTimeout(() => {
    isAnimating = false;

     // 무한 루프 체크 (오른쪽 가짜 1,2,3 도달 시)
    if (currSlide >= totalCount - itemsToClone) {   
      sliderWrap.style.transition = '0ms';
      currSlide = itemsToClone;
      sliderWrap.style.transform = `translateX(-${offset * currSlide}px)`;    
    }

    // 무한 루프 체크 (왼쪽 가짜 4,5,6 도달 시)
    if (currSlide <= 0) {   
      sliderWrap.style.transition = '0ms';
      currSlide = originalCount;
      sliderWrap.style.transform = `translateX(-${offset * currSlide}px)`;    
    } 
    updateActive();  
  }, speed);
}
  
// 초기 위치 설정 (앞에 3개이므로 인덱스 3부터 시작)
sliderWrap.style.transform = `translateX(-${offset * currSlide}px)`;
updateActive();

let autoPlayInterval;

function startAutoPlay() {
  stopAutoPlay();
  // 5000ms(5초)마다 currSlide를 키우고 이동 함.
  autoPlayInterval = setInterval(() => {
    if(!isAnimating) {
      currSlide++;
      moveSlide();
    }
  }, 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// 시작할 때 자동 재생 활성화
startAutoPlay();

// 수동으로 버튼을 누를 때는 자동 재생을 멈추었다가 다시 시작
document.querySelector('.nextBtn').addEventListener('click', () => {
  if (isAnimating) return;
  stopAutoPlay();
  currSlide++;
  moveSlide();
  startAutoPlay();
});

document.querySelector('.preBtn').addEventListener('click', () => {
  if (isAnimating) return;
  stopAutoPlay();
  currSlide--;
  moveSlide();
  startAutoPlay();
})

// 마우스를 슬라이더 위에 올리면 멈추고, 때면 다시 시작
const unitPlan = document.querySelector('.unit__plan');
unitPlan.addEventListener('mouseenter', stopAutoPlay);
unitPlan.addEventListener('mouseleave', startAutoPlay);

// 프리미엄 8개 슬라이드
const PREMIUM_DATA = [
  {
    id: '01',
    image: './img/premium-01.jpg',
    lead: '택지 내 상업시설용지 단 0.9%',
    headline: ['높은 희소가치', '프리미엄 상업시설'],
    desc: '계양신도시 내 극히 제한된 상업용지에 들어서는 희소성 높은 프리미엄 상업시설입니다.'
  },
  {
    id: '02',
    image: './img/premium-02.jpg',
    lead: '고양 장항에서 검증된',
    headline: ['반도건설의', '브랜드 몰 시간'],
    desc: '이미 여러 신도시에서 검증된 반도건설의 브랜드 몰 운영 노하우를 그대로 계양에 이식합니다.'
  },
  {
    id: '03',
    image: './img/premium-03.jpg',
    lead: '탄탄한 상권 형성과 안정화 기여',
    headline: ['반도건설 직영몰', '운영 관리 (계획)'],
    desc: '단순 분양이 아닌, 직영 운영을 통해 상권의 안정성과 지속 가능한 성장을 목표로 합니다.'
  },
  {
    id: '04',
    image: './img/premium-04.jpg',
    lead: '계양신도시 계획인구 약 4.3만명과 계양AX파크',
    headline: ['주거와 업무가 만나는', '항아리 상권'],
    desc: '주거와 업무 수요가 자연스럽게 모이는 입지적 강점을 가진 항아리형 상권입니다.'
  },
  {
    id: '05',
    image: './img/premium-05.jpg',
    lead: '안정적인 상권 활성화 기대',
    headline: ['마스터리스', '확정수익 보장 (계획)'],
    desc: '마스터리스를 통한 확정 수익 구조로 투자 안정성을 높인 상품입니다.'
  },
  {
    id: '06',
    image: './img/premium-06.jpg',
    lead: '판교 약 1.4배 규모',
    headline: ['첨단산업단지 계양AX파크', '풍부한 배후수요'],
    desc: '대규모 첨단산업단지를 배후로 두어 고정적이고 질 높은 수요를 확보합니다.'
  },
  {
    id: '07',
    image: './img/premium-07.jpg',
    lead: '계약 즉시, 수익이 발생하는 이자 지원 혜택',
    headline: ['계약금 이자 지원제', '(계획)'],
    desc: '계약과 동시에 이자 지원 혜택이 적용되어 초기 부담을 크게 줄여줍니다.'
  },
  {
    id: '08',
    image: './img/premium-08.jpg',
    lead: '문화공원이 앞에, 유·초·중(예정)은 옆에',
    headline: ['걷고 배우고 머무는', '일상생활을 잇는 중심'],
    desc: '공원과 학교가 인접한 생활 밀착형 입지로, 일상과 상권이 자연스럽게 연결됩니다.'
  }
];

class PremiumSlider {
  constructor() {
    this.track = document.getElementById('premiumTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.currentNum = document.getElementById('currentNum');
    this.totalNum = document.getElementById('totalNum');

    this.total = PREMIUM_DATA.length;
    this.current = 1;          // 복제본 때문에 1부터 시작
    this.isAnimating = false;
    this.autoplayDelay = 4500;
    this.timer = null;

    this.init();
  }

  init() {
    this.renderSlides();
    this.totalNum.textContent = String(this.total).padStart(2, '0');
    this.updatePosition(false);
    this.updateActiveClass();
    this.bindEvents();
    this.startAutoplay();
  }

  renderSlides() {
    // 마지막 슬라이드 복제본 (맨 앞)
    const lastClone = this.createSlide(PREMIUM_DATA[this.total - 1], true);
    // 첫 슬라이드 복제본 (맨 뒤)
    const firstClone = this.createSlide(PREMIUM_DATA[0], true);

    const slidesHTML = PREMIUM_DATA.map(item => this.createSlide(item)).join('');

    this.track.innerHTML = lastClone + slidesHTML + firstClone;
    this.slides = [...this.track.children];
  }

  createSlide(data, isClone = false) {
    const headlineHTML = data.headline
      .map(line => `<span>${line}</span>`)
      .join('');

    return `
      <article class="premium-slide${isClone ? ' clone' : ''}" data-id="${data.id}">
        <div class="slide-visual">
          <img src="${data.image}" alt="PREMIUM ${data.id}" loading="lazy">
        </div>
        <div class="slide-content">
          <div class="premium-label">
            <span>PREMIUM</span>
            <strong>${data.id}</strong>
          </div>
          <p class="premium-lead">${data.lead}</p>
          <h3 class="premium-headline">${headlineHTML}</h3>
          <p class="premium-desc">${data.desc}</p>
        </div>
      </article>
    `;
  }

  updatePosition(animate = true) {
    this.track.style.transition = animate
      ? 'transform 0.8s cubic-bezier(0.45, 0, 0.2, 1)'
      : 'none';

    this.track.style.transform = `translateX(-${this.current * 100}%)`;
    this.updateCount();
  }

  updateCount() {
    let displayIndex = this.current;

    if (this.current === 0) displayIndex = this.total;
    if (this.current === this.total + 1) displayIndex = 1;

    this.currentNum.textContent = String(displayIndex).padStart(2, '0');
  }

  updateActiveClass() {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === this.current);
    });
  }

  goTo(index) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.current = index;
    this.updatePosition(true);
    this.updateActiveClass();
  }

  next() {
    this.goTo(this.current + 1);
  }

  prev() {
    this.goTo(this.current - 1);
  }

  handleTransitionEnd() {
    this.isAnimating = false;

    // 마지막 복제본 → 실제 첫 번째
    if (this.current === this.total + 1) {
      this.current = 1;
      this.updatePosition(false);
      this.updateActiveClass();
    }

    // 첫 복제본 → 실제 마지막
    if (this.current === 0) {
      this.current = this.total;
      this.updatePosition(false);
      this.updateActiveClass();
    }
  }

  bindEvents() {
    this.nextBtn.addEventListener('click', () => {
      this.next();
      this.resetAutoplay();
    });

    this.prevBtn.addEventListener('click', () => {
      this.prev();
      this.resetAutoplay();
    });

    this.track.addEventListener('transitionend', () => this.handleTransitionEnd());

    // 터치 스와이프
    let startX = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.stopAutoplay();
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
      this.startAutoplay();
    });

    // 키보드
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.next();
        this.resetAutoplay();
      }
      if (e.key === 'ArrowLeft') {
        this.prev();
        this.resetAutoplay();
      }
    });

    // 호버 시 자동재생 일시정지
    const slider = document.getElementById('premiumSlider');
    slider.addEventListener('mouseenter', () => this.stopAutoplay());
    slider.addEventListener('mouseleave', () => this.startAutoplay());
  }

  startAutoplay() {
    this.stopAutoplay();
    this.timer = setInterval(() => this.next(), this.autoplayDelay);
  }

  stopAutoplay() {
    clearInterval(this.timer);
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}

// 실행
document.addEventListener('DOMContentLoaded', () => {
  new PremiumSlider();
});

// utility function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior : "smooth"});
}


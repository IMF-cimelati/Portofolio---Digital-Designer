// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== TYPING ANIMATION =====
const texts = [
  'Creative Desainer',
  '3D Artist',
  'ilustrator Expert',
  ''
];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = texts[textIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === -1) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// ===== SAKURA HERO (dalam scene SVG) =====
const sakuraContainer = document.getElementById('sakura');

function createPetal() {
  const p = document.createElement('div');
  p.classList.add('petal');
  const size = Math.random() * 14 + 8;
  const hue = Math.random() * 20 + 340;
  const lightness = Math.random() * 20 + 70;
  p.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="10" cy="10" rx="9" ry="5" fill="hsl(${hue},80%,${lightness}%)" opacity="0.85" transform="rotate(${Math.random()*360} 10 10)"/>
  </svg>`;
  p.style.left = Math.random() * 110 - 5 + '%';
  p.style.animationDuration = (Math.random() * 10 + 7) + 's';
  p.style.animationDelay = (Math.random() * 15) + 's';
  sakuraContainer.appendChild(p);
}
for (let i = 0; i < 55; i++) createPetal();

// ===== SAKURA GLOBAL — tampil di semua section =====
const globalSakura = document.getElementById('global-sakura');

function createGlobalPetal() {
  const p = document.createElement('div');
  p.style.cssText = `
    position: absolute;
    top: -30px;
    opacity: 0;
    pointer-events: none;
    animation: petalFall ${Math.random() * 14 + 8}s linear ${Math.random() * 20}s infinite;
    left: ${Math.random() * 105 - 2}%;
    filter: drop-shadow(0 0 2px rgba(200,80,80,0.3));
  `;
  const size = Math.random() * 12 + 7;
  const hue = Math.random() * 25 + 335;
  const lt = Math.random() * 20 + 68;
  p.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="10" cy="10" rx="9" ry="5" fill="hsl(${hue},75%,${lt}%)" opacity="0.80" transform="rotate(${Math.random()*360} 10 10)"/>
  </svg>`;
  globalSakura.appendChild(p);
}
for (let i = 0; i < 75; i++) createGlobalPetal();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        // Trigger skill bars
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        // Trigger counters
        entry.target.querySelectorAll('.stat-num').forEach(num => {
          animateCounter(num);
        });
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, 40);
}

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity 0.4s, transform 0.4s';
      if (match) {
        card.classList.remove('hidden');
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => card.classList.add('hidden'), 400);
      }
    });
  });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '送信完了 ✓';
  btn.style.background = 'linear-gradient(135deg, #8b4513, #c9a84c)';
  setTimeout(() => {
    btn.innerHTML = 'Kirim Pesan <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = scrollY >= top && scrollY < top + height
        ? 'var(--primary)' : '';
    }
  });
});

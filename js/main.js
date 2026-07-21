// Accordion animation
document.querySelectorAll('.event-card').forEach(details => {
  const summary = details.querySelector('summary');
  const p = details.querySelector('p');
  summary.addEventListener('click', e => {
    e.preventDefault();
    if (details.open) {
      p.style.maxHeight = '0';
      p.style.opacity = '0';
      p.style.padding = '0 2rem 0';
      setTimeout(() => details.removeAttribute('open'), 250);
    } else {
      details.setAttribute('open', '');
      p.style.padding = '0.5rem 2rem 2rem';
      p.style.maxHeight = p.scrollHeight + 80 + 'px';
      p.style.opacity = '1';
    }
  });
});

// Carousel parallax
function updateParallax() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const rect = carousel.getBoundingClientRect();
  const center = rect.top + rect.height / 2 - window.innerHeight / 2;
  const offset = center * 0.07;
  document.querySelectorAll('.carousel-slide img').forEach(img => {
    img.style.transform = `scale(1.08) translateY(${offset}px)`;
  });
}
window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

// Sticky nav
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Carousel
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.querySelector('.carousel-dots');
let current = 0;
let autoplay;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(index) {
  current = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

document.querySelector('.carousel-btn--prev').addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
document.querySelector('.carousel-btn--next').addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

function resetAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(() => goTo(current + 1), 4000);
}

resetAutoplay();

// Contact form
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  status.className = 'form-status';
  status.textContent = '';

  const data = {
    name: form.name.value,
    email: form.email.value,
    company: form.company.value,
    message: form.message.value,
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      status.textContent = "Thanks! We'll be in touch within one business day.";
      status.classList.add('success');
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.textContent = 'Something went wrong. Please email us directly at info@fractionalevents.com';
    status.classList.add('error');
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});

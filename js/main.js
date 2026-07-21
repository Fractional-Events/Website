// Accordion animation
document.querySelectorAll('.event-card').forEach(details => {
  const summary = details.querySelector('summary');
  const p = details.querySelector('p');
  summary.addEventListener('click', e => {
    e.preventDefault();
    if (details.open) {
      p.style.maxHeight = '0';
      p.style.opacity = '0';
      p.style.paddingBottom = '0';
      setTimeout(() => details.removeAttribute('open'), 250);
    } else {
      details.setAttribute('open', '');
      p.style.maxHeight = p.scrollHeight + 'px';
      p.style.opacity = '1';
      p.style.paddingBottom = '1.4rem';
    }
  });
});

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

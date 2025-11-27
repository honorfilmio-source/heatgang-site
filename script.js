// ============= MOBILE NAV TOGGLE =============
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close menu when clicking a link (on mobile)
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

// ============= ACTIVE NAV LINK ON SCROLL =============
const sections = document.querySelectorAll('main, section[id]');
const navLinkMap = {};

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    navLinkMap[href.slice(1)] = link;
  }
});

window.addEventListener('scroll', () => {
  let currentId = null;
  const scrollPosition = window.scrollY + 130; // offset for header

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = top + rect.height;

    if (scrollPosition >= top && scrollPosition < bottom) {
      currentId = section.id;
    }
  });

  if (currentId) {
    Object.values(navLinkMap).forEach((link) => link.classList.remove('active'));
    const activeLink = navLinkMap[currentId];
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
});

// ============= PORTFOLIO FILTER =============
const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // update button active state
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // filter work cards
    workCards.forEach((card) => {
      const category = card.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============= SCROLL REVEAL (BASIC) =============
// Add .reveal class to elements you want to animate.
const revealElements = document.querySelectorAll('.section, .service-card, .work-card, .why-card, .testimonial-card, .contact-form');

// Add 'reveal' class initially
revealElements.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => observer.observe(el));

// ============= CONTACT FORM (FRONT-END ONLY) =============
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setError(fieldName, message) {
  const errorSpan = document.querySelector(`.error-msg[data-for="${fieldName}"]`);
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach((span) => {
    span.textContent = '';
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const projectType = formData.get('projectType');
    const message = formData.get('message')?.trim();

    let valid = true;

    if (!name) {
      setError('name', 'Please enter your name.');
      valid = false;
    }

    if (!email) {
      setError('email', 'Please enter your email.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!projectType) {
      setError('projectType', 'Please select a project type.');
      valid = false;
    }

    if (!message) {
      setError('message', 'Please tell us a bit about your project.');
      valid = false;
    }

    if (!valid) {
      formStatus.textContent = 'Please fix the highlighted fields and try again.';
      formStatus.style.color = '#ff6b6b';
      return;
    }

    // At this point the form is valid.
    // To actually send this data, you need a backend (PHP, Node, etc.) or a service like Formspree.
    // For now we just show a success message on the front-end.
    formStatus.textContent = 'Thank you! Your enquiry has been received. We will contact you soon.';
    formStatus.style.color = '#a0e7a0';
    contactForm.reset();
  });
}

// ============= FOOTER YEAR =============
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initStickyHeader();
  initMobileNav();
  initScrollReveal();
  initStatCounters();
  initTestimonialSlider();
  initGalleryLightbox();
  initEventModal();
  initJoinModal();
  initBackToTop();
  initSmoothScroll();
});


/* --------------------------------------------------------------------------
   1. STICKY HEADER COMPRESSION
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const mainHeader = document.querySelector('.main-header');
  if (!mainHeader) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}


/* --------------------------------------------------------------------------
   2. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !drawer || !overlay) return;

  const openMenu = () => {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}


/* --------------------------------------------------------------------------
   3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}


/* --------------------------------------------------------------------------
   4. STATISTICAL COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));

      const timer = setInterval(() => {
        current += step;

        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = current + suffix;
        }
      }, 30);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  const statsStrip = document.querySelector('.stats-strip');

  if (statsStrip) observer.observe(statsStrip);
}


/* --------------------------------------------------------------------------
   5. TESTIMONIAL SLIDER ROTATOR
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');

  if (!slides.length || !dots.length) return;

  let currentIndex = 0;
  let autoRotateInterval;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentIndex = index;
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  };

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetAutoRotate();
    });
  });

  const startAutoRotate = () => {
    autoRotateInterval = setInterval(nextSlide, 6000);
  };

  const resetAutoRotate = () => {
    clearInterval(autoRotateInterval);
    startAutoRotate();
  };

  startAutoRotate();
}


/* --------------------------------------------------------------------------
   6. GALLERY LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-content');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!galleryItems.length || !lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Gallery photo';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}


/* --------------------------------------------------------------------------
   7. EVENT DETAILS MODAL
   -------------------------------------------------------------------------- */
function initEventModal() {
  const eventButtons = document.querySelectorAll('.view-event-btn');
  const modal = document.querySelector('#event-modal');
  const closeBtn = modal ? modal.querySelector('.modal-close-btn') : null;

  if (!eventButtons.length || !modal) return;

  eventButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const card = btn.closest('.event-card');

      const title = card
        ? card.querySelector('.event-title').textContent
        : 'Event Details';

      const tagline = card
        ? card.querySelector('.event-tagline').textContent
        : '';

      const modalTitle = modal.querySelector('.modal-event-title');
      const modalTagline = modal.querySelector('.modal-event-tagline');

      if (modalTitle) modalTitle.textContent = title;
      if (modalTagline) modalTagline.textContent = tagline;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}


/* 
 JOIN COMMUNITY MODAL & FORM
    */
function initJoinModal() {
  const joinButtons = document.querySelectorAll('.open-join-modal');
  const modal = document.querySelector('#join-modal');
  const closeBtn = modal ? modal.querySelector('.modal-close-btn') : null;
  const form = modal ? modal.querySelector('form') : null;

  if (!joinButtons.length || !modal) return;

  joinButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });


  /* ------------------------------------------------------------------------
     SEND JOIN FORM DATA TO SPRING BOOT
     ------------------------------------------------------------------------ */
  if (form) {

    form.addEventListener('submit', async (e) => {

      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');

      const member = {
        name: form.querySelector('[name="name"]').value.trim(),
        phone: form.querySelector('[name="phone"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        institute: form.querySelector('[name="institute"]').value.trim(),
        branch: form.querySelector('[name="branch"]').value
      };


      try {

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }


        const response = await fetch(
          'http://localhost:8080/api/members',
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(member)
          }
        );


        if (!response.ok) {
          throw new Error('Server error: ' + response.status);
        }


        const savedMember = await response.json();

        console.log('Member saved successfully:', savedMember);


        form.innerHTML = `
          <div style="text-align: center; padding: 20px 0;">

            <i class="fas fa-check-circle"
               style="font-size: 48px; color: #304095; margin-bottom: 16px;">
            </i>

            <h3
              style="font-family: var(--font-display); font-size: 24px; color: var(--color-navy); margin-bottom: 8px;">
              Welcome to ECE!
            </h3>

            <p
              style="color: var(--color-secondary-text); font-size: 15px;">
              Your application has been received. Our community coordinator will reach out via email shortly.
            </p>

          </div>
        `;

      } catch (error) {

        console.error('Error submitting member:', error);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'SUBMIT APPLICATION';
        }

        alert(
          'Unable to submit your application. Please make sure the Spring Boot server is running.'
        );
      }

    });

  }
}


/* --------------------------------------------------------------------------
   9. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top');

  if (!backBtn) return;

  window.addEventListener('scroll', () => {

    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }

  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* --------------------------------------------------------------------------
   10. SMOOTH SCROLLING & ACTIVE SECTION HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initSmoothScroll() {

  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {

    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute('id');
      }

    });

    navLinks.forEach(link => {

      link.classList.remove('active');

      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }

    });

  }, { passive: true });

}
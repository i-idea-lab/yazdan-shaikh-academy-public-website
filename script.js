// Yazdan Academy - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking any mobile link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. Header Scroll Effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('shadow-xl', 'bg-dark-900/95');
      header.classList.remove('bg-dark-900/80');
    } else {
      header.classList.remove('shadow-xl', 'bg-dark-900/95');
      header.classList.add('bg-dark-900/80');
    }
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const chevron = item.querySelector('.faq-chevron');

    questionBtn.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      faqItems.forEach(otherItem => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherChevron = otherItem.querySelector('.faq-chevron');
        otherAnswer.classList.add('hidden');
        if (otherChevron) otherChevron.classList.remove('rotate-180');
      });

      if (!isOpen) {
        answer.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
      }
    });
  });

  // 5. YouTube Facade Cards (Lazy Iframe Swap on Click)
  document.querySelectorAll('.youtube-facade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const videoId = btn.getAttribute('data-video-id');
      const title = btn.getAttribute('data-title') || 'Yazdan Academy YouTube Video';
      if (!videoId || !btn.parentElement) return;

      const iframe = document.createElement('iframe');
      iframe.className = 'w-full h-full border-0';
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;

      btn.parentElement.replaceChild(iframe, btn);
    });
  });

  // 6. WhatsApp Prefilled Inquiry Form Submission (+91 86001 50109)
  const enrollmentForm = document.getElementById('enrollment-form');
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('user-name')?.value.trim() || '';
      const email = document.getElementById('user-email')?.value.trim() || '';
      const phone = document.getElementById('user-phone')?.value.trim() || '';
      const interest = document.getElementById('course-interest')?.value.trim() || 'Screening Inquiry';
      const notes = document.getElementById('user-notes')?.value.trim() || '';

      const lines = [
        'Assalamu Alaikum, I would like to submit a screening inquiry for Yazdan Academy.',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `WhatsApp Number: ${phone}`,
        `Interested Area: ${interest}`
      ];

      if (notes) {
        lines.push(`Background / Note: ${notes}`);
      }

      const whatsappUrl = `https://wa.me/918600150109?text=${encodeURIComponent(lines.join('\n'))}`;
      const openedWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!openedWindow) {
        window.location.href = whatsappUrl;
      }

      closeEnrollModal();
      showToast('Opening WhatsApp with your prefilled inquiry for +91 86001 50109.');
      enrollmentForm.reset();
    });
  }
});

// Modal Helpers
function openEnrollModal(courseName = '') {
  const modal = document.getElementById('enroll-modal');
  const courseSelect = document.getElementById('course-interest');

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    if (courseSelect && courseName) {
      for (let i = 0; i < courseSelect.options.length; i++) {
        if (courseSelect.options[i].value.toLowerCase().includes(courseName.toLowerCase()) ||
            courseName.toLowerCase().includes(courseSelect.options[i].value.toLowerCase())) {
          courseSelect.selectedIndex = i;
          break;
        }
      }
    }
  }
}

function closeEnrollModal() {
  const modal = document.getElementById('enroll-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

// Custom Video Lightbox Modal Helpers
function openCustomVideoModal(videoSrc, posterSrc, title = 'Yazdan Academy Video') {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('custom-video-player');
  const titleEl = document.getElementById('video-modal-title');
  if (!modal || !player) return;

  if (titleEl) titleEl.textContent = title;
  if (posterSrc) player.setAttribute('poster', posterSrc);
  player.src = videoSrc;
  player.load();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  const playPromise = player.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {});
  }
}

function closeCustomVideoModal() {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('custom-video-player');
  if (player) {
    player.pause();
    player.removeAttribute('src');
    player.load();
  }
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

// Close modals on backdrop click or Escape key
window.addEventListener('click', (e) => {
  const enrollModal = document.getElementById('enroll-modal');
  const videoModal = document.getElementById('video-modal');
  if (e.target === enrollModal) {
    closeEnrollModal();
  }
  if (e.target === videoModal) {
    closeCustomVideoModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeEnrollModal();
    closeCustomVideoModal();
  }
});

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (toast && toastMessage) {
    toastMessage.innerText = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 4500);
  }
}

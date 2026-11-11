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

  // 4. Program Filtering Tabs
  const filterBtns = document.querySelectorAll('.course-tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-brand-500', 'text-white', 'shadow-glow');
        b.classList.add('bg-dark-800', 'text-slate-300');
      });
      btn.classList.add('active', 'bg-brand-500', 'text-white', 'shadow-glow');
      btn.classList.remove('bg-dark-800', 'text-slate-300');

      const filterValue = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.classList.remove('opacity-0', 'scale-95');
          card.classList.add('opacity-100', 'scale-100');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. FAQ Accordion
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

  // 6. Placeholder Inquiry Form Submission (no backend wired)
  const enrollmentForm = document.getElementById('enrollment-form');
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      closeEnrollModal();
      showToast('Placeholder form only — no data was sent. Please apply on yazdanshaikhacademy.com.');
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

// Close on backdrop click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('enroll-modal');
  if (e.target === modal) {
    closeEnrollModal();
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

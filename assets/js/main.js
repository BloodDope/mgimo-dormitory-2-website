// Main JavaScript for MGIMO Dorm Website

// Force scroll to top immediately when script loads
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
if (document.body) {
  document.body.scrollTop = 0;
}

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');
const faqItems = document.querySelectorAll('.faq__item');
const faqCategoryBtns = document.querySelectorAll('.faq__category-btn');
// Language toggles will be initialized in DOMContentLoaded

// Utility Functions
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Mobile Navigation
const showMenu = () => {
  navMenu.classList.add('show-menu');
  document.body.style.overflow = 'hidden';
};

const hideMenu = () => {
  navMenu.classList.remove('show-menu');
  document.body.style.overflow = 'auto';
};

// Event Listeners for Navigation
if (navToggle) {
  navToggle.addEventListener('click', showMenu);
}

if (navClose) {
  navClose.addEventListener('click', hideMenu);
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
  link.addEventListener('click', hideMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    hideMenu();
  }
});

// Header Scroll Effect
const scrollHeader = () => {
  if (window.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
};

window.addEventListener('scroll', throttle(scrollHeader, 10));

// Smooth Scrolling for Navigation Links
const smoothScroll = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href');
  
  if (targetId.startsWith('#')) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const extraOffset = 20; // Additional offset to hide the yellow-purple background
      const targetPosition = targetSection.offsetTop - headerHeight + extraOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
};

navLinks.forEach(link => {
  if (link.getAttribute('href').startsWith('#')) {
    link.addEventListener('click', smoothScroll);
  }
});

// Apply smooth scroll to all anchor links including buttons
document.querySelectorAll('a[href^="#"]').forEach(link => {
  if (!link.classList.contains('nav__link')) {
    link.addEventListener('click', smoothScroll);
  }
});

// Scroll Reveal Animation
const revealElements = () => {
  const reveals = document.querySelectorAll('.scroll-reveal, .animate-fade-up, .animate-slide-up');
  
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('revealed');
    }
  });
};

window.addEventListener('scroll', throttle(revealElements, 10));
window.addEventListener('load', revealElements);

// FAQ Accordion
const toggleFAQ = (faqItem) => {
  const isActive = faqItem.classList.contains('active');
  
  // Close all FAQ items
  faqItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add('active');
  }
};

faqItems.forEach(item => {
  const question = item.querySelector('.faq__question');
  question.addEventListener('click', () => toggleFAQ(item));
});

// FAQ Category Filter
const filterFAQ = (category) => {
  faqItems.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    
    if (category === 'all' || itemCategory === category) {
      item.style.display = 'block';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 50);
    } else {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    }
  });
};

faqCategoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    faqCategoryBtns.forEach(button => button.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Filter FAQ items
    const category = btn.getAttribute('data-category');
    filterFAQ(category);
  });
});

// Contact Form Handler
const handleContactForm = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name') || document.getElementById('name').value;
  const email = formData.get('email') || document.getElementById('email').value;
  const message = formData.get('message') || document.getElementById('message').value;
  
  // Basic validation
  if (!name || !email || !message) {
    showNotification('Пожалуйста, заполните все поля', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Пожалуйста, введите корректный email', 'error');
    return;
  }
  
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
  submitBtn.disabled = true;
  
  try {
    // Simulate form submission (replace with actual Telegram integration)
    await simulateFormSubmission({ name, email, message });
    
    // Success
    showNotification('Сообщение успешно отправлено в Telegram!', 'success');
    contactForm.reset();
    
    // Reset form labels
    const labels = contactForm.querySelectorAll('.form__label');
    labels.forEach(label => {
      label.style.transform = '';
      label.style.color = '';
    });
    
  } catch (error) {
    showNotification('Произошла ошибка при отправке. Попробуйте позже.', 'error');
  } finally {
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Simulate form submission
const simulateFormSubmission = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success/failure
      if (Math.random() > 0.1) { // 90% success rate
        console.log('Form data to send to Telegram:', data);
        resolve();
      } else {
        reject(new Error('Submission failed'));
      }
    }, 2000);
  });
};

if (contactForm) {
  contactForm.addEventListener('submit', handleContactForm);
}

// Notification System
const showNotification = (message, type = 'info') => {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification__content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
      <button class="notification__close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Auto hide after 5 seconds
  setTimeout(() => hideNotification(notification), 5000);
  
  // Close button
  const closeBtn = notification.querySelector('.notification__close');
  closeBtn.addEventListener('click', () => hideNotification(notification));
};

const hideNotification = (notification) => {
  notification.classList.remove('show');
  setTimeout(() => notification.remove(), 300);
};

const getNotificationIcon = (type) => {
  switch (type) {
    case 'success': return 'check-circle';
    case 'error': return 'exclamation-circle';
    case 'warning': return 'exclamation-triangle';
    default: return 'info-circle';
  }
};

// Language Switcher
const switchLanguage = (lang) => {
  // Validate language parameter
  if (lang !== 'ru' && lang !== 'en') {
    lang = 'ru';
  }
  
  // Update all toggle switches
  const langToggles = document.querySelectorAll('.lang-toggle');
  
  langToggles.forEach((toggle) => {
    toggle.setAttribute('data-lang', lang);
  });
  
  // Store language preference
  localStorage.setItem('selectedLanguage', lang);
  
  // Here you would implement actual language switching logic
  // For now, we'll just show a notification
  const langName = lang === 'ru' ? 'Русский' : 'English';
  showNotification(`Язык изменен на ${langName}`, 'info');
};

// Initialize language toggles
const initLanguageToggles = () => {
  const langToggles = document.querySelectorAll('.lang-toggle');
  
  if (langToggles.length === 0) {
    return;
  }
  
  langToggles.forEach((toggle) => {
    // Add click event listener
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const currentLang = toggle.getAttribute('data-lang');
      const newLang = currentLang === 'ru' ? 'en' : 'ru';
      
      switchLanguage(newLang);
    });
  });

  // Load saved language preference or default to Russian
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'ru';
  switchLanguage(savedLanguage);
};

// Scroll Progress Bar
const updateScrollProgress = () => {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (!scrollProgress) {
    // Create scroll progress bar if it doesn't exist
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }
  
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  const progressBar = document.querySelector('.scroll-progress');
  progressBar.style.width = scrolled + '%';
};

window.addEventListener('scroll', throttle(updateScrollProgress, 10));

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.stagger-animation, .image-reveal');
  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });
});

// Parallax Effect
const handleParallax = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  const scrollTop = window.pageYOffset;
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrollTop * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
};

window.addEventListener('scroll', throttle(handleParallax, 10));

// Form Input Effects
document.addEventListener('DOMContentLoaded', () => {
  const formInputs = document.querySelectorAll('.form__input');
  
  formInputs.forEach(input => {
    // Handle input focus/blur for label animation
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Check if input has value on page load
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });
});

// Quick navigation for mobile
const addQuickNavigation = () => {
  if (window.innerWidth <= 768) {
    const quickNav = document.createElement('div');
    quickNav.className = 'quick-nav';
    quickNav.innerHTML = `
      <div class="quick-nav__items">
        <a href="#contacts" class="quick-nav__item">
          <i class="fas fa-phone"></i>
          <span>Контакты</span>
        </a>
        <a href="#faq" class="quick-nav__item">
          <i class="fas fa-question"></i>
          <span>FAQ</span>
        </a>
        <a href="https://t.me/dorm2_mgimo" class="quick-nav__item" target="_blank">
          <i class="fab fa-telegram"></i>
          <span>Telegram</span>
        </a>
      </div>
    `;
    
    document.body.appendChild(quickNav);
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Force scroll to top immediately and on page load
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  
  // Remove hash from URL if present and force scroll again
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    }, 100);
  }
  
  // Force scroll to top again after a short delay
  setTimeout(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, 200);
  
  // Language toggles now handled by inline script
  
  addQuickNavigation();
  updateScrollProgress();
  revealElements();
});

// Force scroll to top on page show (including back/forward navigation)
window.addEventListener('pageshow', () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
});

// Force scroll to top on page reload
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
  const quickNav = document.querySelector('.quick-nav');
  if (window.innerWidth > 768 && quickNav) {
    quickNav.remove();
  } else if (window.innerWidth <= 768 && !quickNav) {
    addQuickNavigation();
  }
}, 250));

// Console welcome message
console.log(`
🏠 Добро пожаловать на сайт Общежития №2 МГИМО!
🎨 Дизайн: Современный, адаптивный
💻 Технологии: HTML5, CSS3, JavaScript ES6+
🎯 Цель: Помочь первокурсникам освоиться в общежитии

Если у вас есть вопросы или предложения, 
напишите нам в Telegram: @dorm2_mgimo
`);

// Export functions for potential use in other modules
window.DormSite = {
  showNotification,
  hideNotification,
  switchLanguage,
  toggleFAQ,
  filterFAQ
}; 
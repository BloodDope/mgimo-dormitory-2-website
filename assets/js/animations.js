// Animation Controller for MGIMO Dorm Website

class AnimationController {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverAnimations();
    this.setupParallaxEffects();
    this.bindEvents();
  }

  // Setup scroll-triggered animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    // Create observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.triggerAnimation(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animation elements
    const animationElements = document.querySelectorAll(`
      .animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right,
      .animate-slide-up, .animate-slide-down, .animate-scale-in, .animate-rotate-in,
      .scroll-reveal, .counter-animate, .stagger-animation
    `);

    animationElements.forEach(element => {
      fadeObserver.observe(element);
    });

    this.observers.set('fade', fadeObserver);
  }

  // Trigger animation based on element classes
  triggerAnimation(element) {
    const animationClass = this.getAnimationClass(element);
    
    switch (animationClass) {
      case 'stagger-animation':
        this.animateStaggered(element);
        break;
      case 'counter-animate':
        this.animateCounter(element);
        break;
      case 'scroll-reveal':
        element.classList.add('revealed');
        break;
      default:
        // For regular animation classes, just add 'animate' class
        element.classList.add('animate');
        break;
    }

    // Add a small delay for more natural feel
    setTimeout(() => {
      element.classList.add('animated');
    }, 100);
  }

  // Get primary animation class
  getAnimationClass(element) {
    const classes = element.className.split(' ');
    const animationClasses = [
      'animate-fade-up', 'animate-fade-down', 'animate-fade-left', 'animate-fade-right',
      'animate-slide-up', 'animate-slide-down', 'animate-scale-in', 'animate-rotate-in',
      'scroll-reveal', 'counter-animate', 'stagger-animation'
    ];
    
    return animationClasses.find(cls => classes.includes(cls)) || '';
  }

  // Staggered animation for lists
  animateStaggered(container) {
    const items = container.querySelectorAll('.stagger-item, .quick-card, .contact-card, .faq__item');
    
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.classList.add('stagger-animated');
      }, index * 150);
    });

    container.classList.add('stagger-complete');
  }

  // Counter animation
  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 100;
    const duration = parseInt(element.getAttribute('data-duration')) || 2000;
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // Setup hover animations
  setupHoverAnimations() {
    // Hover lift effect for cards
    const hoverElements = document.querySelectorAll('.quick-card, .contact-card');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-8px)';
        element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
        element.style.boxShadow = '';
      });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', this.createRipple.bind(this));
    });
  }

  // Create ripple effect on button click
  createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Setup parallax effects
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;

    const handleParallax = () => {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', this.throttle(handleParallax, 10));
  }

  // Setup loading animations
  setupLoadingAnimations() {
    // Animate elements on page load
    window.addEventListener('load', () => {
      this.animateOnLoad();
    });

    // Handle image loading
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
      this.lazyLoadImages(images);
    }
  }

  // Animate elements immediately on page load
  animateOnLoad() {
    const loadElements = document.querySelectorAll('.animate-on-load');
    
    loadElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('loaded');
      }, index * 100);
    });
  }

  // Lazy load images with animation
  lazyLoadImages(images) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.classList.add('loading');
          
          img.onload = () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
          };
          
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Text typing animation
  typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };
    
    type();
  }

  // Slide in animation for modals/popups
  slideIn(element, direction = 'bottom') {
    element.style.opacity = '0';
    element.style.visibility = 'visible';
    
    const transforms = {
      bottom: 'translateY(100%)',
      top: 'translateY(-100%)',
      left: 'translateX(-100%)',
      right: 'translateX(100%)'
    };

    element.style.transform = transforms[direction];
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.3s ease';
      element.style.opacity = '1';
      element.style.transform = 'translate(0, 0)';
    });
  }

  // Slide out animation
  slideOut(element, direction = 'bottom') {
    const transforms = {
      bottom: 'translateY(100%)',
      top: 'translateY(-100%)',
      left: 'translateX(-100%)',
      right: 'translateX(100%)'
    };

    element.style.transition = 'all 0.3s ease';
    element.style.opacity = '0';
    element.style.transform = transforms[direction];
    
    setTimeout(() => {
      element.style.visibility = 'hidden';
    }, 300);
  }

  // Progress bar animation
  animateProgressBar(element, percentage, duration = 1000) {
    const progress = element.querySelector('.progress-fill') || element;
    progress.style.width = '0%';
    
    setTimeout(() => {
      progress.style.transition = `width ${duration}ms ease`;
      progress.style.width = percentage + '%';
    }, 100);
  }

  // Bind additional events
  bindEvents() {
    // Reset animations on orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.resetAnimations();
      }, 500);
    });

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
  }

  // Reset animations for responsive changes
  resetAnimations() {
    this.animatedElements.clear();
    const elements = document.querySelectorAll('.animated, .revealed, .stagger-complete');
    
    elements.forEach(element => {
      element.classList.remove('animated', 'revealed', 'stagger-complete');
    });
    
    this.setupScrollAnimations();
  }

  // Pause animations for performance
  pauseAnimations() {
    document.documentElement.style.setProperty('--animation-play-state', 'paused');
  }

  // Resume animations
  resumeAnimations() {
    document.documentElement.style.setProperty('--animation-play-state', 'running');
  }

  // Utility: Throttle function
  throttle(func, limit) {
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
  }

  // Public methods for external use
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.visibility = 'visible';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  }

  fadeOut(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.visibility = 'hidden';
    }, duration);
  }

  // Scale animation
  scaleIn(element, duration = 300) {
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0';
    element.style.visibility = 'visible';
    element.style.transition = `all ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.transform = 'scale(1)';
      element.style.opacity = '1';
    });
  }

  scaleOut(element, duration = 300) {
    element.style.transition = `all ${duration}ms ease`;
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.visibility = 'hidden';
    }, duration);
  }

  // Cleanup method
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }
}

// CSS for ripple effect
const rippleCSS = `
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.loading {
  opacity: 0.3;
  filter: blur(2px);
  transition: all 0.3s ease;
}

.loaded {
  opacity: 1;
  filter: blur(0);
}

.animate-on-load {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.animate-on-load.loaded {
  opacity: 1;
  transform: translateY(0);
}

.progress-fill {
  height: 100%;
  background: var(--gradient-main);
  transition: width 1s ease;
}

/* CSS for reduced motion accessibility */
@media (prefers-reduced-motion: reduce) {
  .ripple {
    animation: none;
  }
  
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize animation controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.animationController = new AnimationController();
});

// Export for use in other modules
window.AnimationController = AnimationController; 
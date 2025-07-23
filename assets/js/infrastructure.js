// Infrastructure Page JavaScript

// Ждем полной загрузки страницы
window.addEventListener('load', function() {
    console.log('Page fully loaded, initializing...');
    
    // Простая функция для табов
    const districtTab = document.querySelector('[data-tab="district"]');
    const dormitoryTab = document.querySelector('[data-tab="dormitory"]');
    const districtContent = document.getElementById('district-content');
    const dormitoryContent = document.getElementById('dormitory-content');
    
    console.log('Elements found:', {
        districtTab: !!districtTab,
        dormitoryTab: !!dormitoryTab,
        districtContent: !!districtContent,
        dormitoryContent: !!dormitoryContent
    });
    
    if (!districtTab || !dormitoryTab || !districtContent || !dormitoryContent) {
        console.error('Some elements not found!');
        return;
    }
    
    // Функция показа контента
    function showTab(tabName) {
        console.log('Switching to tab:', tabName);
        
        // Скрываем все
        districtTab.classList.remove('active');
        dormitoryTab.classList.remove('active');
        districtContent.classList.remove('active');
        dormitoryContent.classList.remove('active');
        districtContent.style.display = 'none';
        dormitoryContent.style.display = 'none';
        
        // Показываем нужное
        if (tabName === 'district') {
            districtTab.classList.add('active');
            districtContent.style.display = 'block';
            setTimeout(() => districtContent.classList.add('active'), 10);
        } else if (tabName === 'dormitory') {
            dormitoryTab.classList.add('active');
            dormitoryContent.style.display = 'block';
            setTimeout(() => dormitoryContent.classList.add('active'), 10);
        }
    }
    
    // Обработчики кликов
    districtTab.onclick = function() {
        showTab('district');
    };
    
    dormitoryTab.onclick = function() {
        showTab('dormitory');
    };
    
    // Устанавливаем начальное состояние
    showTab('district');
    
    // Инициализация остальных функций
    initScrollAnimations();
    initMobileMenu();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-slide-up');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Mobile Menu Functionality (copied from main.js for consistency)
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Show menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Hide menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    }
    
    // Hide menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        }
    });
}

// Enhanced card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.infrastructure-card');
    
    cards.forEach(card => {
        // Add mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        // Add mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add click effect for mobile
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('mobile-active');
            }
        });
    });
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add stagger animation for cards when tab switches
function staggerCardAnimations(container) {
    const cards = container.querySelectorAll('.infrastructure-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll indicator for tabs
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const hero = document.querySelector('.infrastructure-hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}, 10));

// Add keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    const tabs = document.querySelectorAll('.infrastructure-tab');
    const activeTab = document.querySelector('.infrastructure-tab.active');
    
    if (!activeTab) return;
    
    const currentIndex = Array.from(tabs).indexOf(activeTab);
    let newIndex;
    
    switch(e.key) {
        case 'ArrowLeft':
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            break;
        case 'ArrowRight':
            newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            break;
        default:
            return;
    }
    
    e.preventDefault();
    tabs[newIndex].click();
    tabs[newIndex].focus();
}); 
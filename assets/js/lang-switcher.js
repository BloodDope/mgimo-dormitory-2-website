// Language Switcher for MGIMO Dorm Website

class LanguageSwitcher {
  constructor() {
    this.currentLang = 'ru';
    this.translations = {};
    this.init();
  }

  init() {
    this.loadTranslations();
    this.bindEvents();
    this.loadSavedLanguage();
  }

  // Load translation data
  loadTranslations() {
    this.translations = {
      ru: {
        // Navigation
        'nav.home': 'Главная',
        'nav.contacts': 'Контакты',
        'nav.location': 'Адреса',
        'nav.infrastructure': 'Инфраструктура',
        'nav.rules': 'Правила',
        'nav.student-council': 'Студсовет',
        'nav.faq': 'FAQ',

        // Home Section
        'home.title.main': 'Добро пожаловать в',
        'home.title.highlight': 'Общежитие №2 МГИМО',
        'home.description': 'Полный гид для первокурсников МГИМО по заселению и комфортному проживанию в общежитии',
        'home.btn.guide': 'Быстрый гид',
        'home.btn.contacts': 'Контакты',
        'home.telegram.text': 'Telegram-канал общежития',

        // Quick Guide Section
        'guide.title': 'Быстрые ссылки',
        'guide.subtitle': 'Основная информация для новых жильцов',
        'guide.address.title': 'Адрес и проезд',
        'guide.address.desc': 'Точный адрес общежития, схемы проезда и парковочные места',
        'guide.infrastructure.title': 'Инфраструктура',
        'guide.infrastructure.desc': 'Планы этажей, общие помещения и технические возможности',
        'guide.rules.title': 'Правила проживания',
        'guide.rules.desc': 'Документы для заселения и правила внутреннего распорядка',
        'guide.payment.title': 'Оплата',
        'guide.payment.desc': 'Тарифы, способы оплаты, льготы и скидки',
        'guide.council.title': 'Студенческий совет',
        'guide.council.desc': 'Состав совета, мероприятия и возможность вступления',
        'guide.faq.title': 'Часто задаваемые вопросы',
        'guide.faq.desc': 'Ответы на популярные вопросы первокурсников',
        'guide.more': 'Подробнее',

        // Contacts Section
        'contacts.title': 'Контакты',
        'contacts.subtitle': 'Вся необходимая контактная информация',
        'contacts.address.title': 'Адрес',
        'contacts.address.text': 'г. Москва, ул. Студенческая, д. 2<br>Общежитие №2 МГИМО',
        'contacts.phones.title': 'Телефоны',
        'contacts.phones.text': 'Администрация: +7 (495) 123-45-67<br>Вахта: +7 (495) 123-45-68',
        'contacts.email.title': 'Email',
        'contacts.email.text': 'dorm2@mgimo.ru<br>admin@dorm2.mgimo.ru',
        'contacts.schedule.title': 'Режим работы',
        'contacts.schedule.text': 'Пн-Пт: 9:00-18:00<br>Сб-Вс: 10:00-16:00',
        'contacts.form.title': 'Обратная связь',
        'contacts.form.name': 'Ваше имя',
        'contacts.form.email': 'Email',
        'contacts.form.message': 'Сообщение',
        'contacts.form.submit': 'Отправить в Telegram',

        // FAQ Section
        'faq.title': 'Часто задаваемые вопросы',
        'faq.subtitle': 'Ответы на популярные вопросы первокурсников',
        'faq.category.all': 'Все вопросы',
        'faq.category.settlement': 'Заселение',
        'faq.category.rules': 'Правила',
        'faq.category.payment': 'Оплата',
        'faq.category.facilities': 'Удобства',
        'faq.category.internet': 'Интернет',

        // FAQ Questions
        'faq.q1': 'Какие документы нужны для заселения?',
        'faq.a1': 'Для заселения необходимы: паспорт, справка о регистрации, медицинская справка, договор на проживание, справка о доходах (для льготников).',
        'faq.q2': 'Можно ли приводить гостей?',
        'faq.a2': 'Да, гости допускаются с 10:00 до 22:00 при наличии документа, удостоверяющего личность. Необходимо уведомить вахту.',
        'faq.q3': 'Как оплачивать проживание?',
        'faq.a3': 'Оплата производится ежемесячно до 10 числа. Доступны способы: банковский перевод, онлайн-платежи, касса общежития.',
        'faq.q4': 'Какие удобства есть в общежитии?',
        'faq.a4': 'В общежитии есть: прачечная, общие кухни, комнаты отдыха, спортзал, библиотека, компьютерный класс, парковка.',
        'faq.q5': 'Есть ли Wi-Fi в общежитии?',
        'faq.a5': 'Да, бесплатный Wi-Fi доступен во всех помещениях общежития. Логин и пароль выдаются при заселении.',

        // Footer
        'footer.description': 'Комфортное проживание для студентов в центре Москвы',
        'footer.links': 'Быстрые ссылки',
        'footer.contacts': 'Контакты',
        'footer.copyright': '© 2024 Общежитие №2 МГИМО. Все права защищены.',

        // Notifications
        'notification.form.empty': 'Пожалуйста, заполните все поля',
        'notification.form.email': 'Пожалуйста, введите корректный email',
        'notification.form.success': 'Сообщение успешно отправлено в Telegram!',
        'notification.form.error': 'Произошла ошибка при отправке. Попробуйте позже.',
        'notification.lang.changed': 'Язык изменен на',

        // Quick Navigation
        'quick.contacts': 'Контакты',
        'quick.faq': 'FAQ',
        'quick.telegram': 'Telegram'
      },

      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.contacts': 'Contacts',
        'nav.location': 'Address',
        'nav.infrastructure': 'Infrastructure',
        'nav.rules': 'Rules',
        'nav.student-council': 'Student Council',
        'nav.faq': 'FAQ',

        // Home Section
        'home.title.main': 'Welcome to',
        'home.title.highlight': 'MGIMO Dormitory #2',
        'home.description': 'Complete guide for MGIMO freshmen on moving in and comfortable living in the dormitory',
        'home.btn.guide': 'Quick Guide',
        'home.btn.contacts': 'Contacts',
        'home.telegram.text': 'Dormitory Telegram Channel',

        // Quick Guide Section
        'guide.title': 'Quick Links',
        'guide.subtitle': 'Essential information for new residents',
        'guide.address.title': 'Address & Directions',
        'guide.address.desc': 'Exact dormitory address, route maps and parking spaces',
        'guide.infrastructure.title': 'Infrastructure',
        'guide.infrastructure.desc': 'Floor plans, common areas and technical facilities',
        'guide.rules.title': 'Living Rules',
        'guide.rules.desc': 'Check-in documents and internal regulations',
        'guide.payment.title': 'Payment',
        'guide.payment.desc': 'Rates, payment methods, benefits and discounts',
        'guide.council.title': 'Student Council',
        'guide.council.desc': 'Council members, events and joining opportunities',
        'guide.faq.title': 'Frequently Asked Questions',
        'guide.faq.desc': 'Answers to popular freshmen questions',
        'guide.more': 'Learn More',

        // Contacts Section
        'contacts.title': 'Contacts',
        'contacts.subtitle': 'All necessary contact information',
        'contacts.address.title': 'Address',
        'contacts.address.text': 'Moscow, Studencheskaya St., 2<br>MGIMO Dormitory #2',
        'contacts.phones.title': 'Phones',
        'contacts.phones.text': 'Administration: +7 (495) 123-45-67<br>Reception: +7 (495) 123-45-68',
        'contacts.email.title': 'Email',
        'contacts.email.text': 'dorm2@mgimo.ru<br>admin@dorm2.mgimo.ru',
        'contacts.schedule.title': 'Working Hours',
        'contacts.schedule.text': 'Mon-Fri: 9:00-18:00<br>Sat-Sun: 10:00-16:00',
        'contacts.form.title': 'Feedback',
        'contacts.form.name': 'Your Name',
        'contacts.form.email': 'Email',
        'contacts.form.message': 'Message',
        'contacts.form.submit': 'Send to Telegram',

        // FAQ Section
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Answers to popular freshmen questions',
        'faq.category.all': 'All Questions',
        'faq.category.settlement': 'Check-in',
        'faq.category.rules': 'Rules',
        'faq.category.payment': 'Payment',
        'faq.category.facilities': 'Facilities',
        'faq.category.internet': 'Internet',

        // FAQ Questions
        'faq.q1': 'What documents are needed for check-in?',
        'faq.a1': 'For check-in you need: passport, registration certificate, medical certificate, residence contract, income certificate (for benefit recipients).',
        'faq.q2': 'Can I bring guests?',
        'faq.a2': 'Yes, guests are allowed from 10:00 to 22:00 with ID. You need to notify the reception.',
        'faq.q3': 'How to pay for accommodation?',
        'faq.a3': 'Payment is made monthly before the 10th. Available methods: bank transfer, online payments, dormitory cashier.',
        'faq.q4': 'What facilities are available in the dormitory?',
        'faq.a4': 'The dormitory has: laundry, common kitchens, recreation rooms, gym, library, computer room, parking.',
        'faq.q5': 'Is there Wi-Fi in the dormitory?',
        'faq.a5': 'Yes, free Wi-Fi is available in all dormitory areas. Login and password are provided upon check-in.',

        // Footer
        'footer.description': 'Comfortable accommodation for students in the center of Moscow',
        'footer.links': 'Quick Links',
        'footer.contacts': 'Contacts',
        'footer.copyright': '© 2024 MGIMO Dormitory #2. All rights reserved.',

        // Notifications
        'notification.form.empty': 'Please fill in all fields',
        'notification.form.email': 'Please enter a valid email',
        'notification.form.success': 'Message successfully sent to Telegram!',
        'notification.form.error': 'An error occurred while sending. Please try again later.',
        'notification.lang.changed': 'Language changed to',

        // Quick Navigation
        'quick.contacts': 'Contacts',
        'quick.faq': 'FAQ',
        'quick.telegram': 'Telegram'
      }
    };
  }

  // Bind events
  bindEvents() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        this.switchLanguage(lang);
      });
    });
  }

  // Switch language
  switchLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`Language ${lang} not supported`);
      return;
    }

    this.currentLang = lang;
    this.updateLanguageButtons(lang);
    this.translatePage(lang);
    this.saveLanguagePreference(lang);
    this.updatePageAttributes(lang);
    
    // Show notification
    const langName = lang === 'ru' ? 'Русский' : 'English';
    this.showNotification(`${this.translate('notification.lang.changed')} ${langName}`, 'info');
  }

  // Update language buttons
  updateLanguageButtons(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      }
    });
  }

  // Translate page content
  translatePage(lang) {
    // Find all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = this.translate(key);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.innerHTML = translation;
        }
      }
    });

    // Update specific elements by their content
    this.updateStaticElements(lang);
  }

  // Update elements that don't have data-translate attributes
  updateStaticElements(lang) {
    const updates = [
      // Navigation
      { selector: '.nav__link[href="#home"]', key: 'nav.home' },
      { selector: '.nav__link[href="#contacts"]', key: 'nav.contacts' },
      { selector: '.nav__link[href="#location"]', key: 'nav.location' },
      { selector: '.nav__link[href="#infrastructure"]', key: 'nav.infrastructure' },
      { selector: '.nav__link[href="#rules"]', key: 'nav.rules' },
      { selector: '.nav__link[href="#student-council"]', key: 'nav.student-council' },
      { selector: '.nav__link[href="#faq"]', key: 'nav.faq' },

      // Home section
      { selector: '.home__title', key: 'home.title.main', isHtml: true },
      { selector: '.home__description', key: 'home.description' },

      // Section titles
      { selector: '.quick-guide .section__title', key: 'guide.title' },
      { selector: '.quick-guide .section__subtitle', key: 'guide.subtitle' },
      { selector: '.contacts .section__title', key: 'contacts.title' },
      { selector: '.contacts .section__subtitle', key: 'contacts.subtitle' },
      { selector: '.faq .section__title', key: 'faq.title' },
      { selector: '.faq .section__subtitle', key: 'faq.subtitle' },
    ];

    updates.forEach(update => {
      const element = document.querySelector(update.selector);
      if (element) {
        const translation = this.translate(update.key);
        if (translation) {
          if (update.isHtml) {
            element.innerHTML = translation;
          } else {
            element.textContent = translation;
          }
        }
      }
    });

    // Special case for home title with gradient text
    this.updateHomeTitle(lang);

    // Update form placeholders
    this.updateFormPlaceholders(lang);

    // Update button texts
    this.updateButtonTexts(lang);
  }

  // Update home title with gradient text
  updateHomeTitle(lang) {
    const homeTitle = document.querySelector('.home__title');
    if (homeTitle) {
      const mainText = this.translate('home.title.main');
      const highlightText = this.translate('home.title.highlight');
      
      homeTitle.innerHTML = `
        ${mainText} <br>
        <span class="gradient-text">${highlightText}</span>
      `;
    }
  }

  // Update form placeholders
  updateFormPlaceholders(lang) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput) nameInput.placeholder = this.translate('contacts.form.name');
    if (emailInput) emailInput.placeholder = this.translate('contacts.form.email');
    if (messageInput) messageInput.placeholder = this.translate('contacts.form.message');
  }

  // Update button texts
  updateButtonTexts(lang) {
    // Home buttons
    const guideBtn = document.querySelector('.home__buttons .btn-primary');
    const contactBtn = document.querySelector('.home__buttons .btn-outline');
    const telegramLink = document.querySelector('.telegram-link');
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');

    if (guideBtn) {
      guideBtn.innerHTML = `<i class="fas fa-book-open"></i> ${this.translate('home.btn.guide')}`;
    }
    if (contactBtn) {
      contactBtn.innerHTML = `<i class="fas fa-phone"></i> ${this.translate('home.btn.contacts')}`;
    }
    if (telegramLink) {
      telegramLink.innerHTML = `<i class="fab fa-telegram"></i> ${this.translate('home.telegram.text')}`;
    }
    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${this.translate('contacts.form.submit')}`;
    }

    // Quick guide buttons
    const moreButtons = document.querySelectorAll('.quick-card__link');
    moreButtons.forEach(btn => {
      btn.innerHTML = `${this.translate('guide.more')} <i class="fas fa-arrow-right"></i>`;
    });
  }

  // Get translation
  translate(key) {
    return this.translations[this.currentLang]?.[key] || this.translations['ru']?.[key] || key;
  }

  // Save language preference
  saveLanguagePreference(lang) {
    localStorage.setItem('selectedLanguage', lang);
  }

  // Load saved language preference
  loadSavedLanguage() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    this.switchLanguage(savedLang);
  }

  // Update page attributes for language
  updatePageAttributes(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      lang === 'en' ? 
        'Information website-guide for MGIMO freshmen moving into Dormitory #2' :
        'Информационный сайт-гайд для первокурсников МГИМО, заселяющихся в общежитие №2'
    );
  }

  // Show notification (reuse from main.js)
  showNotification(message, type = 'info') {
    if (window.DormSite && window.DormSite.showNotification) {
      window.DormSite.showNotification(message, type);
    } else {
      console.log(`Notification: ${message}`);
    }
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLang;
  }

  // Add translation
  addTranslation(lang, key, value) {
    if (!this.translations[lang]) {
      this.translations[lang] = {};
    }
    this.translations[lang][key] = value;
  }

  // Remove translation
  removeTranslation(lang, key) {
    if (this.translations[lang] && this.translations[lang][key]) {
      delete this.translations[lang][key];
    }
  }

  // Get all translations for a language
  getTranslations(lang) {
    return this.translations[lang] || {};
  }
}

// Initialize language switcher when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.languageSwitcher = new LanguageSwitcher();
});

// Export for use in other modules
window.LanguageSwitcher = LanguageSwitcher; 
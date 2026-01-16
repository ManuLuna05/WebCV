// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ==================== MENU TOGGLE ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = navMenu.querySelectorAll('a');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.classList.remove('ri-menu-line');
    icon.classList.add('ri-close-line');
  } else {
    icon.classList.remove('ri-close-line');
    icon.classList.add('ri-menu-line');
  }
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('ri-close-line');
    icon.classList.add('ri-menu-line');
  });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.add('light-theme');
  themeIcon.classList.remove('ri-moon-line');
  themeIcon.classList.add('ri-sun-line');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  
  if (body.classList.contains('light-theme')) {
    themeIcon.classList.remove('ri-moon-line');
    themeIcon.classList.add('ri-sun-line');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.remove('ri-sun-line');
    themeIcon.classList.add('ri-moon-line');
    localStorage.setItem('theme', 'dark');
  }
});

// ==================== LANGUAGE TOGGLE ====================
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'es';
    this.htmlElement = document.documentElement;
    this.languageToggle = document.getElementById('langToggle');
    this.langText = this.languageToggle.querySelector('.lang-text');
    
    this.init();
  }
  
  init() {
    this.setLanguage(this.currentLang);
    
    this.languageToggle.addEventListener('click', () => {
      this.toggleLanguage();
    });
  }
  
  toggleLanguage() {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    this.setLanguage(this.currentLang);
  }
  
  setLanguage(lang) {
    this.currentLang = lang;
    this.htmlElement.setAttribute('lang', lang);
    localStorage.setItem('language', lang);
    
    // Actualizar texto del botón
    if (this.langText) {
      this.langText.textContent = lang.toUpperCase();
    }
    
    // Actualizar todos los elementos con data-lang
    document.querySelectorAll('[data-lang-es], [data-lang-en]').forEach(element => {
      const text = element.getAttribute(`data-lang-${lang}`);
      if (text) {
        // Preservar estructura HTML si existe
        const hasChildren = element.children.length > 0;
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.value = text;
        } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
          // Para botones y enlaces, verificar si tienen iconos
          const icon = element.querySelector('i');
          if (icon) {
            element.innerHTML = icon.outerHTML + ' ' + text;
          } else {
            element.textContent = text;
          }
        } else {
          // Para otros elementos, preservar hijos HTML
          if (hasChildren) {
            // Buscar el primer nodo de texto y reemplazarlo
            const textNodes = Array.from(element.childNodes).filter(node => 
              node.nodeType === 3 && node.textContent.trim()
            );
            if (textNodes.length > 0) {
              textNodes[0].textContent = text;
            } else {
              // Si no hay nodos de texto, insertar al inicio
              element.insertBefore(document.createTextNode(text + ' '), element.firstChild);
            }
          } else {
            element.textContent = text;
          }
        }
      }
    });
  }
}

// Inicializar gestor de idioma
const languageManager = new LanguageManager();

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Opcional: dejar de observar después de animar
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar elementos con animación
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-item, .about-text');
  
  animateElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');
  
  if (hero && heroImage && scrolled < window.innerHeight) {
    const parallaxSpeed = 0.5;
    heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
});

// ==================== TYPING EFFECT (Opcional) ====================
// Puedes descomentar esto si quieres un efecto de escritura
/*
const typingElement = document.querySelector('.hero-title');
if (typingElement) {
  const text = typingElement.textContent;
  typingElement.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  
  setTimeout(typeWriter, 1000);
}
*/

// ==================== CURSOR EFFECT (Opcional) ====================
// Puedes descomentar esto si quieres un cursor personalizado
/*
let cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
*/

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animar elementos del hero
  const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-description, .hero-buttons, .hero-social');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// ==================== SCROLL TO TOP BUTTON (Opcional) ====================
// Puedes descomentar esto si quieres un botón para volver arriba
/*
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
scrollTopBtn.classList.add('scroll-top-btn');
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});
*/

// ==================== PERFORMANCE OPTIMIZATION ====================
// Throttle para eventos de scroll
function throttle(func, wait) {
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

// Aplicar throttle a eventos de scroll
const handleScroll = throttle(() => {
  // Tu código de scroll aquí
}, 100);

// ==================== CONSOLE MESSAGE ====================
console.log('%c👋 ¡Hola!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%c¿Buscas algo?', 'font-size: 14px; color: #8b8ba0;');
console.log('%cVisita mi GitHub: https://github.com/ManuLuna05', 'font-size: 12px; color: #b4b4c8;');

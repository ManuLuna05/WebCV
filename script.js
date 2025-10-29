// Función para hacer scroll suave a una sección
function scrollToElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Enlaces del menú
const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1?.addEventListener('click', (e) => {
  e.preventDefault();
  scrollToElementById('conocimientos');
});

link2?.addEventListener('click', (e) => {
  e.preventDefault();
  scrollToElementById('sobre-mi');
});

link3?.addEventListener('click', (e) => {
  e.preventDefault();
  scrollToElementById('proyectos');
});

// Funcionalidad del tema
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle?.querySelector('i');
const body = document.body;

if (themeToggle && icon) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
      icon.classList.remove('ri-moon-line');
      icon.classList.add('ri-sun-line');
    } else {
      icon.classList.remove('ri-sun-line');
      icon.classList.add('ri-moon-line');
    }
  });
}

// Clase para manejar el carrusel de proyectos
class ProjectCarousel {
  constructor() {
    this.currentSlide = 0;
    this.track = document.getElementById('carouselTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.indicators = document.querySelectorAll('.carousel-dot');
    this.slideInfo = document.getElementById('slideInfo');
    
    // Total de proyectos (sin contar tarjetas vacías)
    this.totalProjects = 4; // Ajusta según tu número real de proyectos
    
    if (this.track && this.prevBtn && this.nextBtn) {
      this.init();
      this.setupResponsive();
    }
  }
  
  init() {
    this.updateCarousel();
    this.bindEvents();
  }
  
  setupResponsive() {
    // Detectar cambios de tamaño de pantalla
    window.addEventListener('resize', () => {
      this.updateTotalSlides();
      this.updateCarousel();
    });
    
    // Inicializar con el valor correcto
    this.updateTotalSlides();
  }
  
  updateTotalSlides() {
    const width = window.innerWidth;
    
    if (width <= 768) {
      // En móvil: cada slide muestra 3 proyectos verticalmente
      this.totalSlides = Math.ceil(this.totalProjects / 3);
    } else if (width <= 1024) {
      // En tablet: cada slide muestra 2 proyectos (2x2)
      this.totalSlides = Math.ceil(this.totalProjects / 2);
    } else {
      // En desktop: 2 slides (el original con 3 proyectos horizontales)
      this.totalSlides = 2;
    }
    
    // Asegurar que currentSlide no exceda el nuevo total
    if (this.currentSlide >= this.totalSlides) {
      this.currentSlide = this.totalSlides - 1;
    }
    
    this.updateIndicators();
  }
  
  updateIndicators() {
    // Actualizar el número de indicadores según totalSlides
    const indicatorsContainer = document.getElementById('indicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === this.currentSlide) {
        dot.classList.add('active');
      }
      dot.setAttribute('data-slide', i);
      dot.addEventListener('click', () => this.goToSlide(i));
      indicatorsContainer.appendChild(dot);
    }
    
    // Actualizar la referencia a los indicadores
    this.indicators = document.querySelectorAll('.carousel-dot');
  }
  
  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }
  
  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateCarousel();
  }
  
  nextSlide() {
    this.currentSlide = this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
    this.updateCarousel();
  }
  
  goToSlide(index) {
    if (index >= 0 && index < this.totalSlides) {
      this.currentSlide = index;
      this.updateCarousel();
    }
  }
  
  updateCarousel() {
    const translateX = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    this.indicators.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
    
    if (this.slideInfo) {
      this.slideInfo.textContent = `Sección ${this.currentSlide + 1} de ${this.totalSlides}`;
    }
  }
}

// Inicializar carrusel cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  new ProjectCarousel();
});
// Función para hacer scroll suave a una sección
function scrollToElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Enlaces del menú
const link1 = document.getElementById("link1"); // Conocimientos
const link2 = document.getElementById("link2"); // Sobre Mí
const link3 = document.getElementById("link3"); // Proyectos

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

const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const body = document.body;

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

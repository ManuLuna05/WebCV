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

// Cambio de tema claro/oscuro
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");

  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");
    toggleBtn.textContent = isLight ? "Modo Noche" : "Modo Día";
  });
});

// Obtener los botones de navegación y las tarjetas
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cards = document.querySelectorAll('.card');
let currentIndex = 0;

// Función para mostrar la tarjeta actual
function showCard(index) {
  cards.forEach((card, i) => {
    card.style.display = (i >= index && i < index + 8) ? 'block' : 'none'; // Mostrar 8 tarjetas
  });
}

// Evento para el botón "Anterior"
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex -= 8;
    showCard(currentIndex);
  }
});

// Evento para el botón "Siguiente"
nextBtn.addEventListener('click', () => {
  if (currentIndex + 8 < cards.length) {
    currentIndex += 8;
    showCard(currentIndex);
  }
});

// Mostrar las primeras 8 tarjetas al cargar la página
showCard(currentIndex);

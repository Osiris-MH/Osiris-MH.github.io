// ============================================
// CONFIGURACIÓN
// ============================================
const CARDS_PER_PAGE = 8;
let currentPage = 1; // 1 = primera página
let totalPages = 1;

// Elementos del DOM
const cards = document.querySelectorAll('.card');
const paginationNumbers = document.getElementById('pagination-numbers');
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');

// ============================================
// FUNCIÓN PRINCIPAL: Mostrar tarjetas de una página
// ============================================
function showPage(page) {
  // Calcular índices
  const startIndex = (page - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  
  // Mostrar/ocultar tarjetas
  cards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = ''; // Restaurar display original (del CSS)
    } else {
      card.style.display = 'none';
    }
  });
  
  // Actualizar página activa visualmente
  document.querySelectorAll('.page-number').forEach(btn => {
    if (parseInt(btn.dataset.page) === page) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Actualizar estado de botones Previous/Next
  updateNavButtons();
}

// ============================================
// ACTUALIZAR BOTONES PREVIOUS/NEXT
// ============================================
function updateNavButtons() {
  if (prevPageBtn) {
    prevPageBtn.disabled = (currentPage === 1);
  }
  if (nextPageBtn) {
    nextPageBtn.disabled = (currentPage === totalPages);
  }
}

// ============================================
// GENERAR BOTONES DE PAGINACIÓN CON ELIPSIS
// ============================================
function generatePaginationButtons() {
  if (!paginationNumbers) return;
  
  paginationNumbers.innerHTML = '';
  
  // Definir qué páginas mostrar
  let pagesToShow = [];
  
  if (totalPages <= 7) {
    // Si hay 7 páginas o menos, mostrar todas
    for (let i = 1; i <= totalPages; i++) {
      pagesToShow.push(i);
    }
  } else {
    // Siempre mostrar primera página
    pagesToShow.push(1);
    
    // Lógica para el rango central
    if (currentPage <= 3) {
      // Estamos cerca del inicio
      pagesToShow.push(2, 3, 4);
      pagesToShow.push('...');
      pagesToShow.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Estamos cerca del final
      pagesToShow.push('...');
      pagesToShow.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Estamos en el medio
      pagesToShow.push('...');
      pagesToShow.push(currentPage - 1, currentPage, currentPage + 1);
      pagesToShow.push('...');
      pagesToShow.push(totalPages);
    }
  }
  
  // Crear los botones
  pagesToShow.forEach(page => {
    if (page === '...') {
      // Crear elemento de elipsis
      const ellipsis = document.createElement('span');
      ellipsis.className = 'page-ellipsis';
      ellipsis.textContent = '...';
      paginationNumbers.appendChild(ellipsis);
    } else {
      // Crear botón de número
      const pageBtn = document.createElement('button');
      pageBtn.className = 'page-number';
      if (page === currentPage) {
        pageBtn.classList.add('active');
      }
      pageBtn.textContent = page;
      pageBtn.dataset.page = page;
      pageBtn.addEventListener('click', () => {
        currentPage = page;
        showPage(currentPage);
        generatePaginationButtons(); // Regenerar al cambiar de página
      });
      paginationNumbers.appendChild(pageBtn);
    }
  });
}

// ============================================
// EVENT LISTENERS
// ============================================
// Botón Previous
if (prevPageBtn) {
  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
      generatePaginationButtons(); // Regenerar botones
    }
  });
}

// Botón Next
if (nextPageBtn) {
  nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
      generatePaginationButtons(); // Regenerar botones
    }
  });
}

// ============================================
// INICIALIZACIÓN
// ============================================
if (cards.length === 0) {
  console.warn('No se encontraron tarjetas con la clase .card');
  if (paginationNumbers) {
    paginationNumbers.innerHTML = '<span class="page-ellipsis">Sin contenido</span>';
  }
} else {
  // Calcular total de páginas
  totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);
  
  // Mostrar primera página
  showPage(1);
  
  // Generar botones de paginación
  generatePaginationButtons();
}

// --- Análisis COVID-19 ---
function loadCovidData() {
  // Dataset de ejemplo (fechas, casos, muertes)
  const data = [
    { fecha: '2020-03', casos: 10, muertes: 0 },
    { fecha: '2020-04', casos: 120, muertes: 2 },
    { fecha: '2020-05', casos: 400, muertes: 10 },
    { fecha: '2020-06', casos: 900, muertes: 30 },
    { fecha: '2020-07', casos: 1500, muertes: 60 },
    { fecha: '2020-08', casos: 1100, muertes: 40 },
    { fecha: '2020-09', casos: 700, muertes: 20 }
  ];
  renderTable('covid-table', data, ['fecha', 'casos', 'muertes']);
  renderChart('covid-chart', data.map(d=>d.fecha), [
    {label:'Casos', data:data.map(d=>d.casos), borderColor:'#43e97b'},
    {label:'Muertes', data:data.map(d=>d.muertes), borderColor:'#e53935'}
  ], 'Curvas de COVID-19');
}

// --- Análisis de Películas ---
function loadMoviesData() {
  // Dataset de ejemplo (título, género, puntuación)
  const data = [
    { titulo: 'Inception', genero: 'Sci-Fi', puntuacion: 8.8 },
    { titulo: 'Titanic', genero: 'Romance', puntuacion: 7.8 },
    { titulo: 'Avengers', genero: 'Acción', puntuacion: 8.0 },
    { titulo: 'Parasite', genero: 'Drama', puntuacion: 8.6 },
    { titulo: 'Joker', genero: 'Drama', puntuacion: 8.5 },
    { titulo: 'Toy Story', genero: 'Animación', puntuacion: 8.3 }
  ];
  renderTable('movies-table', data, ['titulo', 'genero', 'puntuacion']);
  renderChart('movies-chart', data.map(d=>d.titulo), [
    {label:'Puntuación', data:data.map(d=>d.puntuacion), borderColor:'#43e97b', backgroundColor:'#38f9d7'}
  ], 'Puntuación de Películas');
}

// --- Estudio de Hábitos de Consumo ---
function loadHabitsData() {
  // Dataset de ejemplo (persona, gasto, categoría)
  const data = [
    { persona: 'Ana', gasto: 120, categoria: 'Comida' },
    { persona: 'Luis', gasto: 80, categoria: 'Transporte' },
    { persona: 'Sofía', gasto: 200, categoria: 'Entretenimiento' },
    { persona: 'Carlos', gasto: 60, categoria: 'Comida' },
    { persona: 'Elena', gasto: 150, categoria: 'Ropa' }
  ];
  renderTable('habits-table', data, ['persona', 'gasto', 'categoria']);
  renderChart('habits-chart', data.map(d=>d.persona), [
    {label:'Gasto', data:data.map(d=>d.gasto), borderColor:'#43e97b', backgroundColor:'#43e97b88'}
  ], 'Gasto por Persona');
}

// --- Utilidades para tablas y gráficos ---
function renderTable(containerId, data, columns) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let html = '<table><thead><tr>';
  columns.forEach(col => html += `<th>${col.charAt(0).toUpperCase()+col.slice(1)}</th>`);
  html += '</tr></thead><tbody>';
  data.forEach(row => {
    html += '<tr>';
    columns.forEach(col => html += `<td>${row[col]}</td>`);
    html += '</tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

function renderChart(canvasId, labels, datasets, title) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  if (window[canvasId+'Chart']) window[canvasId+'Chart'].destroy();
  window[canvasId+'Chart'] = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: { legend: { display: true }, title: { display: true, text: title } }
    }
  });
}

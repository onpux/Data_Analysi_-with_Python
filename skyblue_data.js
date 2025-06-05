// Animated clouds background
const canvas = document.getElementById('clouds-bg');
const ctx = canvas.getContext('2d');
let clouds = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createCloud() {
  const w = 80 + Math.random() * 100;
  const h = 30 + Math.random() * 30;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height * 0.5),
    w,
    h,
    speed: 0.2 + Math.random() * 0.3,
    opacity: 0.5 + Math.random() * 0.3
  };
}
function drawCloud(cloud) {
  ctx.save();
  ctx.globalAlpha = cloud.opacity;
  ctx.beginPath();
  ctx.ellipse(cloud.x, cloud.y, cloud.w, cloud.h, 0, 0, 2 * Math.PI);
  ctx.fillStyle = '#e3eaf2';
  ctx.shadowColor = '#b3c6d6';
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.restore();
}
function animateClouds() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let cloud of clouds) {
    cloud.x += cloud.speed;
    if (cloud.x - cloud.w > canvas.width) {
      cloud.x = -cloud.w;
      cloud.y = Math.random() * (canvas.height * 0.5);
    }
    drawCloud(cloud);
  }
  requestAnimationFrame(animateClouds);
}
function initClouds() {
  clouds = [];
  const n = Math.max(8, Math.floor(canvas.width / 180));
  for (let i = 0; i < n; i++) clouds.push(createCloud());
}
window.addEventListener('resize', initClouds);
initClouds();
animateClouds();

// D3.js visualizations (mock data for demo)
// Project 1: Air Quality (Bar chart)
(function(){
  const data = [
    {city: 'Bogotá', PM25: 22, CO: 0.7, NO2: 18},
    {city: 'Lima', PM25: 35, CO: 0.9, NO2: 25},
    {city: 'Santiago', PM25: 28, CO: 0.6, NO2: 20},
    {city: 'Mexico City', PM25: 40, CO: 1.1, NO2: 30}
  ];
  const svg = d3.select('#viz-airquality').append('svg')
    .attr('width', 280).attr('height', 170);
  const margin = {top: 20, right: 10, bottom: 40, left: 40};
  const width = 280 - margin.left - margin.right;
  const height = 170 - margin.top - margin.bottom;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const x = d3.scaleBand().domain(data.map(d=>d.city)).range([0, width]).padding(0.2);
  const y = d3.scaleLinear().domain([0, 45]).range([height, 0]);
  g.append('g').call(d3.axisLeft(y));
  g.append('g').attr('transform',`translate(0,${height})`).call(d3.axisBottom(x));
  g.selectAll('.bar').data(data).enter().append('rect')
    .attr('class','bar')
    .attr('x',d=>x(d.city)).attr('y',d=>y(d.PM25))
    .attr('width',x.bandwidth()).attr('height',d=>height-y(d.PM25))
    .attr('fill','#3498db');
  svg.append('text').attr('x',140).attr('y',165).attr('text-anchor','middle').attr('font-size','12px').text('City');
  svg.append('text').attr('x',-60).attr('y',15).attr('transform','rotate(-90)').attr('font-size','12px').text('PM2.5 (μg/m³)');
})();

// Project 2: Mental Health Search Trends (Line chart)
(function(){
  const data = [
    {month:'Jan', depression: 60, anxiety: 55},
    {month:'Feb', depression: 62, anxiety: 58},
    {month:'Mar', depression: 65, anxiety: 60},
    {month:'Apr', depression: 70, anxiety: 63},
    {month:'May', depression: 68, anxiety: 61},
    {month:'Jun', depression: 66, anxiety: 59}
  ];
  const svg = d3.select('#viz-mentalhealth').append('svg')
    .attr('width', 280).attr('height', 170);
  const margin = {top: 20, right: 10, bottom: 40, left: 40};
  const width = 280 - margin.left - margin.right;
  const height = 170 - margin.top - margin.bottom;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const x = d3.scalePoint().domain(data.map(d=>d.month)).range([0, width]);
  const y = d3.scaleLinear().domain([50, 75]).range([height, 0]);
  g.append('g').call(d3.axisLeft(y));
  g.append('g').attr('transform',`translate(0,${height})`).call(d3.axisBottom(x));
  const line1 = d3.line().x(d=>x(d.month)).y(d=>y(d.depression));
  const line2 = d3.line().x(d=>x(d.month)).y(d=>y(d.anxiety));
  g.append('path').datum(data).attr('fill','none').attr('stroke','#5dade2').attr('stroke-width',2).attr('d',line1);
  g.append('path').datum(data).attr('fill','none').attr('stroke','#48c9b0').attr('stroke-width',2).attr('d',line2);
  g.selectAll('.dot').data(data).enter().append('circle')
    .attr('cx',d=>x(d.month)).attr('cy',d=>y(d.depression)).attr('r',3).attr('fill','#5dade2');
  g.selectAll('.dot2').data(data).enter().append('circle')
    .attr('cx',d=>x(d.month)).attr('cy',d=>y(d.anxiety)).attr('r',3).attr('fill','#48c9b0');
  svg.append('text').attr('x',140).attr('y',165).attr('text-anchor','middle').attr('font-size','12px').text('Month');
  svg.append('text').attr('x',-60).attr('y',15).attr('transform','rotate(-90)').attr('font-size','12px').text('Search Index');
})();

// Project 3: Food Price Analysis (Multi-line chart)
(function(){
  const data = [
    {month:'Jan', rice: 1.2, potato: 0.8, egg: 0.15},
    {month:'Feb', rice: 1.25, potato: 0.85, egg: 0.16},
    {month:'Mar', rice: 1.3, potato: 0.9, egg: 0.17},
    {month:'Apr', rice: 1.28, potato: 0.95, egg: 0.18},
    {month:'May', rice: 1.35, potato: 1.0, egg: 0.19},
    {month:'Jun', rice: 1.4, potato: 1.05, egg: 0.2}
  ];
  const svg = d3.select('#viz-foodprices').append('svg')
    .attr('width', 280).attr('height', 170);
  const margin = {top: 20, right: 10, bottom: 40, left: 40};
  const width = 280 - margin.left - margin.right;
  const height = 170 - margin.top - margin.bottom;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const x = d3.scalePoint().domain(data.map(d=>d.month)).range([0, width]);
  const y = d3.scaleLinear().domain([0.7, 1.5]).range([height, 0]);
  g.append('g').call(d3.axisLeft(y));
  g.append('g').attr('transform',`translate(0,${height})`).call(d3.axisBottom(x));
  const lineRice = d3.line().x(d=>x(d.month)).y(d=>y(d.rice));
  const linePotato = d3.line().x(d=>x(d.month)).y(d=>y(d.potato));
  const lineEgg = d3.line().x(d=>x(d.month)).y(d=>y(d.egg));
  g.append('path').datum(data).attr('fill','none').attr('stroke','#f7b731').attr('stroke-width',2).attr('d',lineRice);
  g.append('path').datum(data).attr('fill','none').attr('stroke','#58b19f').attr('stroke-width',2).attr('d',linePotato);
  g.append('path').datum(data).attr('fill','none').attr('stroke','#eb3b5a').attr('stroke-width',2).attr('d',lineEgg);
  svg.append('text').attr('x',140).attr('y',165).attr('text-anchor','middle').attr('font-size','12px').text('Month');
  svg.append('text').attr('x',-60).attr('y',15).attr('transform','rotate(-90)').attr('font-size','12px').text('Price (USD/kg or unit)');
})();

/* ============================================================
   FAC TECNOLOGIA — main.js
   Renders all site content from data.js (CMS) and wires up
   the interactions: intro animation, reveal-on-scroll, nav,
   filters, project modal, contact form.
   ============================================================ */

const DATA = loadData();

const ICONS = {
  code: '<path d="M8 4L3 12l5 8"/><path d="M16 4l5 8-5 8"/>',
  device: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  layers: '<polygon points="12 2 2 8 12 14 22 8 12 2"/><polyline points="2 16 12 22 22 16"/><polyline points="2 12 12 18 22 12"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
  cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
  bot: '<rect x="4" y="9" width="16" height="11" rx="2"/><circle cx="9" cy="14.5" r="1"/><circle cx="15" cy="14.5" r="1"/><path d="M9 4h6M12 4v5"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'
};
function icon(name){
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||ICONS.code}</svg>`;
}
function waLink(number, text){
  return `https://wa.me/${number}${text ? '?text='+encodeURIComponent(text) : ''}`;
}
function placeholderImg(label, seed){
  // Elegant generated placeholder (SVG data-uri) used when no real image was uploaded via admin.
  const hues = [222, 210, 260, 200];
  const hue = hues[(seed||0) % hues.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='hsl(${hue},60%,10%)'/>
      <stop offset='1' stop-color='hsl(${hue},70%,4%)'/>
    </linearGradient></defs>
    <rect width='800' height='600' fill='url(#g)'/>
    <g stroke='hsla(${hue},80%,70%,0.18)' stroke-width='1'>
      <line x1='0' y1='150' x2='800' y2='150'/><line x1='0' y1='450' x2='800' y2='450'/>
      <line x1='266' y1='0' x2='266' y2='600'/><line x1='533' y1='0' x2='533' y2='600'/>
    </g>
    <text x='50%' y='52%' font-family='monospace' font-size='22' fill='hsla(${hue},70%,85%,0.55)' text-anchor='middle'>${label}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

/* ---------------- HEADER / BRAND ---------------- */
document.getElementById('site-header').querySelector('.brand').classList.add('reveal');

/* ---------------- HERO ---------------- */
document.getElementById('hero-kicker-text').textContent = DATA.hero.kicker;
document.getElementById('hero-title').innerHTML =
  `${DATA.hero.titleLine1}<br><span class="accent-word">${DATA.hero.titleLine2}</span>`;
document.getElementById('hero-sub').textContent = DATA.hero.subtitle;
document.getElementById('hero-stats').innerHTML = DATA.hero.stats.map(s =>
  `<div><div class="num">${s.num}</div><div class="lbl">${s.label}</div></div>`).join('');

/* ---------------- ABOUT ---------------- */
document.getElementById('about-text').textContent = DATA.about.text;
document.getElementById('about-list').innerHTML = DATA.about.items.map(i => `<li>${i}</li>`).join('');
document.getElementById('about-founders').innerHTML = DATA.about.founders.map(f => `
  <div class="founder-card glass">
    <img src="${f.photo}" alt="${f.name}">
    <div>
      <div class="role">${f.role}</div>
      <h4>${f.name}</h4>
    </div>
  </div>`).join('');

/* ---------------- SERVICES ---------------- */
document.getElementById('services-grid').innerHTML = DATA.services.map(s => `
  <div class="service-card" onmousemove="svcGlow(event,this)">
    <div class="service-icon">${icon(s.icon)}</div>
    <h4>${s.title}</h4>
    <p>${s.desc}</p>
  </div>`).join('');
function svcGlow(e, el){
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
}

/* ---------------- AI ---------------- */
document.getElementById('ai-text').textContent = DATA.ai.text;
document.getElementById('ai-tags').innerHTML = DATA.ai.tags.map(t => `<span>${t}</span>`).join('');
document.getElementById('ai-visual').innerHTML = `
  <svg viewBox="0 0 400 400" width="100%" style="overflow:visible">
    <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(61,107,255,0.25)" stroke-width="1"/>
    <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <circle cx="200" cy="200" r="6" fill="#3d6bff"/>
    <g id="ai-orbit"></g>
  </svg>`;
(function orbitDots(){
  const g = document.getElementById('ai-orbit');
  if(!g) return;
  const radii = [150,110,70];
  radii.forEach((r,idx)=>{
    const dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
    dot.setAttribute('r', 4);
    dot.setAttribute('fill', idx===0 ? '#3d6bff' : 'rgba(255,255,255,0.7)');
    g.appendChild(dot);
    let angle = Math.random()*Math.PI*2;
    const speed = 0.002 + idx*0.0016;
    function step(){
      angle += speed;
      dot.setAttribute('cx', 200 + Math.cos(angle)*r);
      dot.setAttribute('cy', 200 + Math.sin(angle)*r);
      requestAnimationFrame(step);
    }
    step();
  });
})();

/* ---------------- PORTFOLIO ---------------- */
const categories = ['Todos', ...new Set(DATA.portfolio.map(p => p.category))];
document.getElementById('portfolio-filters').innerHTML = categories.map((c,i) =>
  `<button class="filter-btn ${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('');

function renderPortfolio(filter){
  const grid = document.getElementById('portfolio-grid');
  const items = DATA.portfolio.filter((p,i) => filter === 'Todos' || p.category === filter);
  grid.innerHTML = items.map((p) => {
    const realIndex = DATA.portfolio.indexOf(p);
    const img = p.image || placeholderImg(p.category, realIndex);
    return `
    <div class="portfolio-card" data-index="${realIndex}">
      <div class="portfolio-media"><img src="${img}" alt="${p.title}"></div>
      <div class="portfolio-body">
        <span class="portfolio-tag">${p.category} · ${p.year}</span>
        <h4>${p.title}</h4>
        <p>${p.client}</p>
      </div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => openProjectModal(parseInt(card.dataset.index)));
  });
}
renderPortfolio('Todos');
document.getElementById('portfolio-filters').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if(!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPortfolio(btn.dataset.cat);
});

/* Project modal */
const modalOverlay = document.getElementById('project-modal');
const modalBox = document.getElementById('project-modal-box');
function openProjectModal(index){
  const p = DATA.portfolio[index];
  const img = p.image || placeholderImg(p.category, index);
  modalBox.innerHTML = `
    <button class="modal-close" id="modal-close-btn">✕</button>
    <div class="modal-media"><img src="${img}" alt="${p.title}"></div>
    <div class="modal-content">
      <span class="portfolio-tag">${p.category} · ${p.year}</span>
      <h3 style="margin-top:10px;font-size:28px;">${p.title}</h3>
      <p class="lead" style="margin-top:14px;">${p.desc}</p>
      <div class="modal-meta">
        <div><div class="k">Cliente</div><div class="v">${p.client}</div></div>
        <div><div class="k">Categoria</div><div class="v">${p.category}</div></div>
        <div><div class="k">Ano</div><div class="v">${p.year}</div></div>
      </div>
      <h4 style="font-size:15px;margin-bottom:8px;">Desafio</h4>
      <p style="font-size:14px;margin-bottom:18px;">${p.challenge||'—'}</p>
      <h4 style="font-size:15px;margin-bottom:8px;">Solução</h4>
      <p style="font-size:14px;">${p.solution||'—'}</p>
      <div class="tech-pills">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div>
    </div>`;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close-btn').addEventListener('click', closeProjectModal);
}
function closeProjectModal(){
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) closeProjectModal(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeProjectModal(); });

/* ---------------- CLIENTS ---------------- */
const clientItems = DATA.clients.map((c,i) => {
  const logo = c.logo
    ? `<img src="${c.logo}" alt="${c.name}">`
    : `<span>${c.name}</span>`;
  return `<a class="client-logo" href="${c.url||'#'}" target="_blank" rel="noopener">${logo}</a>`;
}).join('');
document.getElementById('clients-track').innerHTML = clientItems + clientItems; // duplicate for infinite loop

/* ---------------- CASES ---------------- */
document.getElementById('cases-grid').innerHTML = DATA.cases.map(c => `
  <div class="case-card glass">
    <p class="eyebrow">Case · ${c.client}</p>
    <h3>${c.title}</h3>
    <div class="case-row"><div class="k">Problema</div><div class="v">${c.problem}</div></div>
    <div class="case-row"><div class="k">Solução</div><div class="v">${c.solution}</div></div>
    <div class="case-row"><div class="k">Tech</div><div class="v">${c.tech}</div></div>
    <div class="case-row"><div class="k">Resultado</div><div class="v" style="border-bottom:none;color:var(--white);font-weight:600;">${c.result}</div></div>
  </div>`).join('');

/* ---------------- AUDIOVISUAL ---------------- */
document.getElementById('av-grid').innerHTML = DATA.audiovisual.map((a,i) => {
  const poster = a.poster || placeholderImg(a.tag, i+2);
  const mediaTag = a.video
    ? `<video src="${a.video}" poster="${poster}" autoplay muted loop playsinline></video>`
    : `<img src="${poster}" alt="${a.title}">`;
  return `<div class="av-card ${i===0?'av-main':''}">${mediaTag}<span class="tag">${a.tag}</span></div>`;
}).join('');

/* ---------------- TECHNOLOGIES ---------------- */
document.getElementById('tech-marquee').innerHTML = DATA.technologies.map(t => `<span class="tech-chip">${t}</span>`).join('');

/* ---------------- PROCESS ---------------- */
document.getElementById('process-list').innerHTML = DATA.process.map((p,i) => `
  <div class="process-item">
    <div class="idx">${String(i+1).padStart(2,'0')}</div>
    <div><h4>${p.title}</h4><p>${p.desc}</p></div>
  </div>`).join('');

/* ---------------- DIFFERENTIALS ---------------- */
document.getElementById('diff-grid').innerHTML = DATA.differentials.map(d => `
  <div class="diff-card">
    ${icon('layers')}
    <h4>${d.title}</h4>
    <p>${d.desc}</p>
  </div>`).join('');

/* ---------------- STATS ---------------- */
document.getElementById('stats-grid').innerHTML = DATA.hero.stats.map(s => `
  <div class="stat-card"><div class="num" data-target="${s.num}">0</div><div class="lbl">${s.label}</div></div>`).join('');

/* ---------------- TESTIMONIALS ---------------- */
document.getElementById('testi-grid').innerHTML = DATA.testimonials.map((t,i) => {
  const photo = t.photo || placeholderImg('', i);
  return `
  <div class="testi-card glass">
    <p>"${t.text}"</p>
    <div class="testi-person">
      <img src="${photo}" alt="${t.name}">
      <div><div class="name">${t.name}</div><div class="role">${t.role}</div></div>
    </div>
  </div>`;
}).join('');

/* ---------------- CONTACT / FOOTER ---------------- */
document.getElementById('contact-info-list').innerHTML = `
  <div class="item"><div class="k">WhatsApp</div><div class="v">${DATA.brand.phone}</div></div>
  <div class="item"><div class="k">E-mail</div><div class="v">${DATA.brand.email}</div></div>
  <div class="item"><div class="k">Endereço</div><div class="v">${DATA.brand.address}</div></div>`;

document.getElementById('footer-contact').innerHTML = `
  <li>${DATA.brand.phone}</li>
  <li><a href="mailto:${DATA.brand.email}">${DATA.brand.email}</a></li>
  <li><a href="${DATA.brand.mapsUrl}" target="_blank" rel="noopener">${DATA.brand.address}</a></li>`;

document.getElementById('footer-social').innerHTML = `
  <li><a href="${DATA.brand.instagram}" target="_blank" rel="noopener">Instagram</a></li>
  <li><a href="${DATA.brand.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
  <li><a href="${DATA.brand.github}" target="_blank" rel="noopener">GitHub</a></li>`;

document.getElementById('footer-year').textContent = new Date().getFullYear();

const waHref = waLink(DATA.brand.whatsapp, 'Olá! Vim pelo site da FAC TECNOLOGIA e quero saber mais sobre um projeto.');
document.getElementById('wa-float').href = waHref;
document.getElementById('cta-whatsapp').href = waHref;
document.getElementById('cta-email').href = `mailto:${DATA.brand.email}`;

document.getElementById('contact-form').addEventListener('submit', () => {
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const subject = document.getElementById('cf-subject').value || 'Contato via site';
  const message = document.getElementById('cf-message').value;
  const body = `Olá, meu nome é ${name} (${email}).%0A%0A${message}`;
  window.location.href = `mailto:${DATA.brand.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
});

/* ---------------- PRELOADER / INTRO ---------------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    document.querySelectorAll('.hero-kicker,.hero-title,.hero-sub,.hero-actions,.hero-stats').forEach((el,i) => {
      el.style.transition = `opacity .9s var(--ease) ${i*0.12+0.1}s, transform .9s var(--ease) ${i*0.12+0.1}s`;
      requestAnimationFrame(() => { el.style.opacity = 1; el.style.transform = 'translateY(0)'; });
    });
  }, 1600);
});
// Fallback in case load event already fired / is slow
setTimeout(() => { document.getElementById('preloader').classList.add('hidden'); }, 3200);

/* ---------------- HEADER SCROLL STATE ---------------- */
const headerEl = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  headerEl.classList.toggle('scrolled', window.scrollY > 40);
}, { passive:true });

/* ---------------- MOBILE NAV ---------------- */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  navToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
});
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('open');
  navToggle.textContent = '☰';
}));

/* ---------------- SCROLL REVEAL ---------------- */
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ---------------- ANIMATED COUNTERS ---------------- */
function animateCounter(el){
  const raw = el.dataset.target;
  const match = raw.match(/^([\d.,]+)(.*)$/);
  if(!match){ el.textContent = raw; return; }
  const numPart = parseFloat(match[1].replace(',', '.'));
  const suffix = match[2];
  let current = 0;
  const duration = 1400;
  const start = performance.now();
  function step(ts){
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1-progress, 3);
    current = numPart * eased;
    el.textContent = (numPart % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + suffix;
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
const statsGridEl = document.getElementById('stats-grid');
if(statsGridEl) statObserver.observe(statsGridEl);

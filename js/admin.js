/* ============================================================
   FAC TECNOLOGIA — admin.js
   Painel administrativo simples (sem código) para editar todo
   o conteúdo do site. Guarda os dados no localStorage do
   navegador atual (ver README para limitações e como evoluir
   para um backend real, ex.: Supabase).
   ============================================================ */

let state = loadData();

/* ---------------- path get/set helpers ---------------- */
function parsePath(path){
  const parts = [];
  path.replace(/\[(\d+)\]/g, '.$1').split('.').forEach(p => { if(p !== '') parts.push(p); });
  return parts;
}
function getByPath(obj, path){
  return parsePath(path).reduce((o,k) => (o == null ? undefined : o[k]), obj);
}
function setByPath(obj, path, value){
  const parts = parsePath(path);
  let cur = obj;
  for(let i=0;i<parts.length-1;i++){ cur = cur[parts[i]]; }
  cur[parts[parts.length-1]] = value;
}

function persist(){
  saveData(state);
  showSaveIndicator();
}
let toastTimer;
function showSaveIndicator(){
  const ind = document.getElementById('save-indicator');
  ind.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ind.classList.remove('show'), 1400);
}
function toast(text){
  const t = document.getElementById('toast');
  document.getElementById('toast-text').textContent = text;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function updateField(path, value){
  setByPath(state, path, value);
  persist();
}

function fileToDataUrl(file, cb){
  const reader = new FileReader();
  reader.onload = () => cb(reader.result);
  reader.readAsDataURL(file);
}

/* ---------------- generic array ops ---------------- */
function arrAdd(path, item, rerenderFn){
  const arr = getByPath(state, path);
  arr.push(item);
  persist();
  rerenderFn();
}
function arrRemove(path, index, rerenderFn){
  if(!confirm('Remover este item?')) return;
  const arr = getByPath(state, path);
  arr.splice(index,1);
  persist();
  rerenderFn();
}
function arrMove(path, index, dir, rerenderFn){
  const arr = getByPath(state, path);
  const newIndex = index + dir;
  if(newIndex < 0 || newIndex >= arr.length) return;
  [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
  persist();
  rerenderFn();
}

function imgUploadHTML(previewSrc, onchangeFnName){
  return `
    <div class="img-upload">
      <img class="preview" src="${previewSrc || 'assets/logo.png'}" alt="preview">
      <label class="upload-btn">Enviar imagem
        <input type="file" accept="image/*" onchange="${onchangeFnName}(event)">
      </label>
    </div>`;
}

/* ============================================================
   PANEL: MARCA & CONTATO
   ============================================================ */
function renderBrand(){
  const b = state.brand;
  document.getElementById('panel-brand').innerHTML = `
    <div class="admin-card">
      <h3>Identidade</h3>
      ${imgUploadHTML(b.logo, 'onLogoChange')}
      <p class="helper-text">Logo usada no cabeçalho e rodapé do site.</p>
      <div class="form-field"><label>Nome da empresa</label>
        <input value="${esc(b.name)}" oninput="updateField('brand.name', this.value)"></div>
    </div>
    <div class="admin-card">
      <h3>Contato</h3>
      <div class="grid-2">
        <div class="form-field"><label>WhatsApp (só números, com DDI+DDD)</label>
          <input value="${esc(b.whatsapp)}" placeholder="5561999999999" oninput="updateField('brand.whatsapp', this.value)"></div>
        <div class="form-field"><label>Telefone (exibido no site)</label>
          <input value="${esc(b.phone)}" oninput="updateField('brand.phone', this.value)"></div>
      </div>
      <div class="grid-2">
        <div class="form-field"><label>E-mail</label>
          <input value="${esc(b.email)}" oninput="updateField('brand.email', this.value)"></div>
        <div class="form-field"><label>Endereço</label>
          <input value="${esc(b.address)}" oninput="updateField('brand.address', this.value)"></div>
      </div>
      <div class="form-field"><label>Link do Google Maps</label>
        <input value="${esc(b.mapsUrl)}" oninput="updateField('brand.mapsUrl', this.value)"></div>
    </div>
    <div class="admin-card">
      <h3>Redes sociais</h3>
      <div class="grid-2">
        <div class="form-field"><label>Instagram (URL)</label>
          <input value="${esc(b.instagram)}" oninput="updateField('brand.instagram', this.value)"></div>
        <div class="form-field"><label>LinkedIn (URL)</label>
          <input value="${esc(b.linkedin)}" oninput="updateField('brand.linkedin', this.value)"></div>
      </div>
      <div class="form-field"><label>GitHub (URL)</label>
        <input value="${esc(b.github)}" oninput="updateField('brand.github', this.value)"></div>
    </div>`;
}
function onLogoChange(e){
  const file = e.target.files[0];
  if(!file) return;
  fileToDataUrl(file, (url) => { updateField('brand.logo', url); renderBrand(); });
}

/* ============================================================
   PANEL: HERO
   ============================================================ */
function renderHero(){
  const h = state.hero;
  document.getElementById('panel-hero').innerHTML = `
    <div class="admin-card">
      <h3>Texto principal</h3>
      <div class="form-field"><label>Frase acima do título (kicker)</label>
        <input value="${esc(h.kicker)}" oninput="updateField('hero.kicker', this.value)"></div>
      <div class="grid-2">
        <div class="form-field"><label>Título — linha 1</label>
          <input value="${esc(h.titleLine1)}" oninput="updateField('hero.titleLine1', this.value)"></div>
        <div class="form-field"><label>Título — linha 2 (destaque)</label>
          <input value="${esc(h.titleLine2)}" oninput="updateField('hero.titleLine2', this.value)"></div>
      </div>
      <div class="form-field"><label>Subtítulo</label>
        <textarea oninput="updateField('hero.subtitle', this.value)">${esc(h.subtitle)}</textarea></div>
    </div>
    <div class="admin-card">
      <h3>Estatísticas (também usadas na seção de números)</h3>
      <div id="hero-stats-list"></div>
      <button class="add-btn" onclick="arrAdd('hero.stats',{num:'0',label:'Novo indicador'}, renderHero)">+ Adicionar estatística</button>
    </div>`;
  const list = document.getElementById('hero-stats-list');
  list.innerHTML = h.stats.map((s,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head">
        <span>Estatística ${i+1}</span>
        <div style="display:flex;gap:6px;">
          <button class="icon-btn" onclick="arrRemove('hero.stats',${i}, renderHero)">✕</button>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-field"><label>Número</label>
          <input value="${esc(s.num)}" oninput="updateField('hero.stats[${i}].num', this.value)"></div>
        <div class="form-field"><label>Legenda</label>
          <input value="${esc(s.label)}" oninput="updateField('hero.stats[${i}].label', this.value)"></div>
      </div>
    </div>`).join('');
}

/* ============================================================
   PANEL: ABOUT
   ============================================================ */
function renderAbout(){
  const a = state.about;
  document.getElementById('panel-about').innerHTML = `
    <div class="admin-card">
      <h3>Texto institucional</h3>
      <div class="form-field"><label>Texto "Quem somos"</label>
        <textarea rows="4" oninput="updateField('about.text', this.value)">${esc(a.text)}</textarea></div>
    </div>
    <div class="admin-card">
      <h3>Lista do que a empresa desenvolve</h3>
      <div class="tags-editor" id="about-items-tags"></div>
      <div class="tag-input-row">
        <input id="about-item-input" placeholder="Ex: Aplicativos iOS">
        <button class="btn btn-ghost btn-sm" onclick="addAboutItem()">Adicionar</button>
      </div>
    </div>
    <div class="admin-card">
      <h3>Sócios</h3>
      <div id="founders-list"></div>
      <button class="add-btn" onclick="arrAdd('about.founders',{name:'Novo sócio',role:'Cargo',photo:''}, renderAbout)">+ Adicionar sócio</button>
    </div>`;
  document.getElementById('about-items-tags').innerHTML = a.items.map((it,i) => `
    <span class="tag-pill">${esc(it)}<button onclick="arrRemove('about.items',${i}, renderAbout)">✕</button></span>`).join('');
  document.getElementById('founders-list').innerHTML = a.founders.map((f,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head"><span>Sócio ${i+1}</span>
        <button class="icon-btn" onclick="arrRemove('about.founders',${i}, renderAbout)">✕</button>
      </div>
      <div class="img-upload">
        <img class="preview" src="${f.photo||'assets/logo.png'}" alt="">
        <label class="upload-btn">Enviar foto
          <input type="file" accept="image/*" onchange="onFounderPhoto(event, ${i})">
        </label>
      </div>
      <div class="grid-2">
        <div class="form-field"><label>Nome</label>
          <input value="${esc(f.name)}" oninput="updateField('about.founders[${i}].name', this.value)"></div>
        <div class="form-field"><label>Cargo</label>
          <input value="${esc(f.role)}" oninput="updateField('about.founders[${i}].role', this.value)"></div>
      </div>
    </div>`).join('');
}
function addAboutItem(){
  const input = document.getElementById('about-item-input');
  if(!input.value.trim()) return;
  arrAdd('about.items', input.value.trim(), renderAbout);
}
function onFounderPhoto(e, i){
  const file = e.target.files[0];
  if(!file) return;
  fileToDataUrl(file, (url) => { updateField(`about.founders[${i}].photo`, url); renderAbout(); });
}

/* ============================================================
   PANEL: SERVICES
   ============================================================ */
const ICON_OPTIONS = ['code','device','globe','layers','link','cloud','bot','eye','camera'];
function renderServices(){
  document.getElementById('panel-services').innerHTML = `
    <div class="admin-card">
      <h3>Cartões de serviço</h3>
      <div id="services-list"></div>
      <button class="add-btn" onclick="arrAdd('services',{icon:'code',title:'Novo serviço',desc:'Descrição do serviço.'}, renderServices)">+ Adicionar serviço</button>
    </div>`;
  document.getElementById('services-list').innerHTML = state.services.map((s,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head"><span>Serviço ${i+1}</span>
        <div style="display:flex;gap:6px;">
          <button class="icon-btn up" onclick="arrMove('services',${i},-1, renderServices)">↑</button>
          <button class="icon-btn down" onclick="arrMove('services',${i},1, renderServices)">↓</button>
          <button class="icon-btn" onclick="arrRemove('services',${i}, renderServices)">✕</button>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-field"><label>Título</label>
          <input value="${esc(s.title)}" oninput="updateField('services[${i}].title', this.value)"></div>
        <div class="form-field"><label>Ícone</label>
          <select onchange="updateField('services[${i}].icon', this.value)">
            ${ICON_OPTIONS.map(o => `<option value="${o}" ${o===s.icon?'selected':''}>${o}</option>`).join('')}
          </select></div>
      </div>
      <div class="form-field"><label>Descrição</label>
        <textarea rows="2" oninput="updateField('services[${i}].desc', this.value)">${esc(s.desc)}</textarea></div>
    </div>`).join('');
}

/* ============================================================
   PANEL: AI
   ============================================================ */
function renderAI(){
  const ai = state.ai;
  document.getElementById('panel-ai').innerHTML = `
    <div class="admin-card">
      <h3>Texto da seção de Inteligência Artificial</h3>
      <div class="form-field"><label>Texto</label>
        <textarea rows="4" oninput="updateField('ai.text', this.value)">${esc(ai.text)}</textarea></div>
    </div>
    <div class="admin-card">
      <h3>Tags / aplicações de IA</h3>
      <div class="tags-editor" id="ai-tags-list"></div>
      <div class="tag-input-row">
        <input id="ai-tag-input" placeholder="Ex: Integração com WhatsApp">
        <button class="btn btn-ghost btn-sm" onclick="addAiTag()">Adicionar</button>
      </div>
    </div>`;
  document.getElementById('ai-tags-list').innerHTML = ai.tags.map((t,i) => `
    <span class="tag-pill">${esc(t)}<button onclick="arrRemove('ai.tags',${i}, renderAI)">✕</button></span>`).join('');
}
function addAiTag(){
  const input = document.getElementById('ai-tag-input');
  if(!input.value.trim()) return;
  arrAdd('ai.tags', input.value.trim(), renderAI);
}

/* ============================================================
   PANEL: PORTFOLIO
   ============================================================ */
function renderPortfolioAdmin(){
  document.getElementById('panel-portfolio').innerHTML = `
    <div class="admin-card">
      <h3>Projetos do portfólio</h3>
      <p class="helper-text">Cada projeto vira um card clicável no site, com uma página de detalhes (modal).</p>
      <div id="portfolio-list"></div>
      <button class="add-btn" onclick="arrAdd('portfolio',{title:'Novo projeto',client:'Cliente',category:'Sistemas',year:'2026',image:'',desc:'',challenge:'',solution:'',tech:[]}, renderPortfolioAdmin)">+ Adicionar projeto</button>
    </div>`;
  document.getElementById('portfolio-list').innerHTML = state.portfolio.map((p,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head"><span>Projeto ${i+1}</span>
        <div style="display:flex;gap:6px;">
          <button class="icon-btn up" onclick="arrMove('portfolio',${i},-1, renderPortfolioAdmin)">↑</button>
          <button class="icon-btn down" onclick="arrMove('portfolio',${i},1, renderPortfolioAdmin)">↓</button>
          <button class="icon-btn" onclick="arrRemove('portfolio',${i}, renderPortfolioAdmin)">✕</button>
        </div>
      </div>
      <div class="img-upload">
        <img class="preview" src="${p.image||'assets/logo.png'}" alt="">
        <label class="upload-btn">Enviar imagem
          <input type="file" accept="image/*" onchange="onPortfolioImage(event, ${i})">
        </label>
      </div>
      <div class="grid-2">
        <div class="form-field"><label>Título</label>
          <input value="${esc(p.title)}" oninput="updateField('portfolio[${i}].title', this.value)"></div>
        <div class="form-field"><label>Cliente</label>
          <input value="${esc(p.client)}" oninput="updateField('portfolio[${i}].client', this.value)"></div>
      </div>
      <div class="grid-2">
        <div class="form-field"><label>Categoria</label>
          <input value="${esc(p.category)}" oninput="updateField('portfolio[${i}].category', this.value)"></div>
        <div class="form-field"><label>Ano</label>
          <input value="${esc(p.year)}" oninput="updateField('portfolio[${i}].year', this.value)"></div>
      </div>
      <div class="form-field"><label>Descrição</label>
        <textarea rows="2" oninput="updateField('portfolio[${i}].desc', this.value)">${esc(p.desc)}</textarea></div>
      <div class="form-field"><label>Desafio</label>
        <textarea rows="2" oninput="updateField('portfolio[${i}].challenge', this.value)">${esc(p.challenge)}</textarea></div>
      <div class="form-field"><label>Solução</label>
        <textarea rows="2" oninput="updateField('portfolio[${i}].solution', this.value)">${esc(p.solution)}</textarea></div>
      <div class="form-field"><label>Tecnologias (separadas por vírgula)</label>
        <input value="${esc((p.tech||[]).join(', '))}" oninput="updateField('portfolio[${i}].tech', this.value.split(',').map(s=>s.trim()).filter(Boolean))"></div>
    </div>`).join('');
}
function onPortfolioImage(e, i){
  const file = e.target.files[0];
  if(!file) return;
  fileToDataUrl(file, (url) => { updateField(`portfolio[${i}].image`, url); renderPortfolioAdmin(); });
}

/* ============================================================
   PANEL: CLIENTS
   ============================================================ */
function renderClients(){
  document.getElementById('panel-clients').innerHTML = `
    <div class="admin-card">
      <h3>Logos de clientes</h3>
      <p class="helper-text">Aparecem na esteira animada da seção "Clientes". Sem logo enviada, mostramos o nome.</p>
      <div id="clients-list"></div>
      <button class="add-btn" onclick="arrAdd('clients',{name:'Novo cliente',logo:'',url:'#'}, renderClients)">+ Adicionar cliente</button>
    </div>`;
  document.getElementById('clients-list').innerHTML = state.clients.map((c,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head"><span>Cliente ${i+1}</span>
        <button class="icon-btn" onclick="arrRemove('clients',${i}, renderClients)">✕</button>
      </div>
      <div class="img-upload">
        <img class="preview" src="${c.logo||'assets/logo.png'}" alt="">
        <label class="upload-btn">Enviar logo
          <input type="file" accept="image/*" onchange="onClientLogo(event, ${i})">
        </label>
      </div>
      <div class="grid-2">
        <div class="form-field"><label>Nome</label>
          <input value="${esc(c.name)}" oninput="updateField('clients[${i}].name', this.value)"></div>
        <div class="form-field"><label>Link (site do cliente)</label>
          <input value="${esc(c.url)}" oninput="updateField('clients[${i}].url', this.value)"></div>
      </div>
    </div>`).join('');
}
function onClientLogo(e, i){
  const file = e.target.files[0];
  if(!file) return;
  fileToDataUrl(file, (url) => { updateField(`clients[${i}].logo`, url); renderClients(); });
}

/* ============================================================
   PANEL: CASES
   ============================================================ */
function renderCases(){
  document.getElementById('panel-cases').innerHTML = `
    <div class="admin-card">
      <h3>Estudos de caso</h3>
      <div id="cases-list"></div>
      <button class="add-btn" onclick="arrAdd('cases',{title:'Novo case',client:'Cliente',problem:'',solution:'',tech:'',result:''}, renderCases)">+ Adicionar case</button>
    </div>`;
  document.getElementById('cases-list').innerHTML = state.cases.map((c,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head"><span>Case ${i+1}</span>
        <button class="icon-btn" onclick="arrRemove('cases',${i}, renderCases)">✕</button>
      </div>
      <div class="grid-2">
        <div class="form-field"><label>Título</label>
          <input value="${esc(c.title)}" oninput="updateField('cases[${i}].title', this.value)"></div>
        <div class="form-field"><label>Cliente</label>
          <input value="${esc(c.client)}" oninput="updateField('cases[${i}].client', this.value)"></div>
      </div>
      <div class="form-field"><label>Problema</label>
        <textarea rows="2" oninput="updateField('cases[${i}].problem', this.value)">${esc(c.problem)}</textarea></div>
      <div class="form-field"><label>Solução</label>
        <textarea rows="2" oninput="updateField('cases[${i}].solution', this.value)">${esc(c.solution)}</textarea></div>
      <div class="grid-2">
        <div class="form-field"><label>Tecnologias</label>
          <input value="${esc(c.tech)}" oninput="updateField('cases[${i}].tech', this.value)"></div>
        <div class="form-field"><label>Resultado</label>
          <input value="${esc(c.result)}" oninput="updateField('cases[${i}].result', this.value)"></div>
      </div>
    </div>`).join('');
}

/* ============================================================
   PANEL: AUDIOVISUAL
   ============================================================ */
function renderAudiovisual(){
  document.getElementById('panel-audiovisual').innerHTML = `
    <div class="admin-card">
      <h3>Galeria audiovisual</h3>
      <p class="helper-text">O primeiro item aparece em destaque (maior) na seção do site.</p>
      <div id="av-list"></div>
      <button class="add-btn" onclick="arrAdd('audiovisual',{title:'Novo vídeo',tag:'Institucional',video:'',poster:''}, renderAudiovisual)">+ Adicionar item</button>
    </div>`;
  document.getElementById('av-list').innerHTML = state.audiovisual.map((a,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head"><span>Item ${i+1}</span>
        <div style="display:flex;gap:6px;">
          <button class="icon-btn up" onclick="arrMove('audiovisual',${i},-1, renderAudiovisual)">↑</button>
          <button class="icon-btn down" onclick="arrMove('audiovisual',${i},1, renderAudiovisual)">↓</button>
          <button class="icon-btn" onclick="arrRemove('audiovisual',${i}, renderAudiovisual)">✕</button>
        </div>
      </div>
      <div class="img-upload">
        <img class="preview" src="${a.poster||'assets/logo.png'}" alt="">
        <label class="upload-btn">Enviar capa
          <input type="file" accept="image/*" onchange="onAvPoster(event, ${i})">
        </label>
      </div>
      <div class="grid-2">
        <div class="form-field"><label>Título</label>
          <input value="${esc(a.title)}" oninput="updateField('audiovisual[${i}].title', this.value)"></div>
        <div class="form-field"><label>Categoria</label>
          <input value="${esc(a.tag)}" oninput="updateField('audiovisual[${i}].tag', this.value)"></div>
      </div>
      <div class="form-field"><label>URL do vídeo (opcional, mp4 hospedado)</label>
        <input value="${esc(a.video)}" oninput="updateField('audiovisual[${i}].video', this.value)"></div>
    </div>`).join('');
}
function onAvPoster(e, i){
  const file = e.target.files[0];
  if(!file) return;
  fileToDataUrl(file, (url) => { updateField(`audiovisual[${i}].poster`, url); renderAudiovisual(); });
}

/* ============================================================
   PANEL: TECHNOLOGIES
   ============================================================ */
function renderTechnologies(){
  document.getElementById('panel-technologies').innerHTML = `
    <div class="admin-card">
      <h3>Tecnologias exibidas</h3>
      <div class="tags-editor" id="tech-tags-list"></div>
      <div class="tag-input-row">
        <input id="tech-tag-input" placeholder="Ex: Kubernetes">
        <button class="btn btn-ghost btn-sm" onclick="addTech()">Adicionar</button>
      </div>
    </div>`;
  document.getElementById('tech-tags-list').innerHTML = state.technologies.map((t,i) => `
    <span class="tag-pill">${esc(t)}<button onclick="arrRemove('technologies',${i}, renderTechnologies)">✕</button></span>`).join('');
}
function addTech(){
  const input = document.getElementById('tech-tag-input');
  if(!input.value.trim()) return;
  arrAdd('technologies', input.value.trim(), renderTechnologies);
}

/* ============================================================
   PANEL: PROCESS
   ============================================================ */
function renderProcess(){
  document.getElementById('panel-process').innerHTML = `
    <div class="admin-card">
      <h3>Etapas do processo de trabalho</h3>
      <div id="process-list-admin"></div>
      <button class="add-btn" onclick="arrAdd('process',{title:'Nova etapa',desc:''}, renderProcess)">+ Adicionar etapa</button>
    </div>`;
  document.getElementById('process-list-admin').innerHTML = state.process.map((p,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head"><span>Etapa ${i+1}</span>
        <div style="display:flex;gap:6px;">
          <button class="icon-btn up" onclick="arrMove('process',${i},-1, renderProcess)">↑</button>
          <button class="icon-btn down" onclick="arrMove('process',${i},1, renderProcess)">↓</button>
          <button class="icon-btn" onclick="arrRemove('process',${i}, renderProcess)">✕</button>
        </div>
      </div>
      <div class="form-field"><label>Nome da etapa</label>
        <input value="${esc(p.title)}" oninput="updateField('process[${i}].title', this.value)"></div>
      <div class="form-field"><label>Descrição</label>
        <textarea rows="2" oninput="updateField('process[${i}].desc', this.value)">${esc(p.desc)}</textarea></div>
    </div>`).join('');
}

/* ============================================================
   PANEL: DIFFERENTIALS
   ============================================================ */
function renderDifferentials(){
  document.getElementById('panel-differentials').innerHTML = `
    <div class="admin-card">
      <h3>Diferenciais</h3>
      <div id="diff-list-admin"></div>
      <button class="add-btn" onclick="arrAdd('differentials',{title:'Novo diferencial',desc:''}, renderDifferentials)">+ Adicionar diferencial</button>
    </div>`;
  document.getElementById('diff-list-admin').innerHTML = state.differentials.map((d,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head"><span>Item ${i+1}</span>
        <button class="icon-btn" onclick="arrRemove('differentials',${i}, renderDifferentials)">✕</button>
      </div>
      <div class="form-field"><label>Título</label>
        <input value="${esc(d.title)}" oninput="updateField('differentials[${i}].title', this.value)"></div>
      <div class="form-field"><label>Descrição</label>
        <textarea rows="2" oninput="updateField('differentials[${i}].desc', this.value)">${esc(d.desc)}</textarea></div>
    </div>`).join('');
}

/* ============================================================
   PANEL: TESTIMONIALS
   ============================================================ */
function renderTestimonials(){
  document.getElementById('panel-testimonials').innerHTML = `
    <div class="admin-card">
      <h3>Depoimentos de clientes</h3>
      <div id="testi-list-admin"></div>
      <button class="add-btn" onclick="arrAdd('testimonials',{text:'',name:'Nome',role:'Cargo, Empresa',photo:''}, renderTestimonials)">+ Adicionar depoimento</button>
    </div>`;
  document.getElementById('testi-list-admin').innerHTML = state.testimonials.map((t,i) => `
    <div class="repeat-item">
      <div class="repeat-item-head"><span>Depoimento ${i+1}</span>
        <button class="icon-btn" onclick="arrRemove('testimonials',${i}, renderTestimonials)">✕</button>
      </div>
      <div class="img-upload">
        <img class="preview" src="${t.photo||'assets/logo.png'}" alt="">
        <label class="upload-btn">Enviar foto
          <input type="file" accept="image/*" onchange="onTestiPhoto(event, ${i})">
        </label>
      </div>
      <div class="form-field"><label>Depoimento</label>
        <textarea rows="3" oninput="updateField('testimonials[${i}].text', this.value)">${esc(t.text)}</textarea></div>
      <div class="grid-2">
        <div class="form-field"><label>Nome</label>
          <input value="${esc(t.name)}" oninput="updateField('testimonials[${i}].name', this.value)"></div>
        <div class="form-field"><label>Cargo / Empresa</label>
          <input value="${esc(t.role)}" oninput="updateField('testimonials[${i}].role', this.value)"></div>
      </div>
    </div>`).join('');
}
function onTestiPhoto(e, i){
  const file = e.target.files[0];
  if(!file) return;
  fileToDataUrl(file, (url) => { updateField(`testimonials[${i}].photo`, url); renderTestimonials(); });
}

/* ============================================================
   PANEL: SETTINGS
   ============================================================ */
function renderSettings(){
  document.getElementById('panel-settings').innerHTML = `
    <div class="admin-card">
      <h3>Senha de acesso</h3>
      <div class="grid-2">
        <div class="form-field"><label>Nova senha</label>
          <input id="new-pass" type="password" placeholder="Digite a nova senha"></div>
        <div class="form-field"><label>Confirmar senha</label>
          <input id="confirm-pass" type="password" placeholder="Repita a senha"></div>
      </div>
      <button class="btn btn-ghost" onclick="changePassword()">Alterar senha</button>
    </div>
    <div class="admin-card">
      <h3>Backup dos dados</h3>
      <p class="helper-text">O conteúdo fica salvo apenas neste navegador. Exporte um backup em JSON regularmente — ou depois de fazer várias edições — para não perder nada, e para levar o conteúdo para outro computador.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <button class="btn btn-ghost" onclick="exportData()">Exportar backup (.json)</button>
        <label class="btn btn-ghost" style="cursor:pointer;">Importar backup
          <input type="file" accept="application/json" style="display:none" onchange="importData(event)">
        </label>
      </div>
    </div>
    <div class="admin-card danger-zone">
      <h3>Restaurar padrão de fábrica</h3>
      <p class="helper-text">Apaga todas as edições salvas neste navegador e volta o site ao conteúdo original de exemplo.</p>
      <button class="btn btn-danger" onclick="restoreDefaults()">Restaurar padrão</button>
    </div>`;
}
function changePassword(){
  const p1 = document.getElementById('new-pass').value;
  const p2 = document.getElementById('confirm-pass').value;
  if(!p1 || p1.length < 4){ toast('A senha precisa ter ao menos 4 caracteres'); return; }
  if(p1 !== p2){ toast('As senhas não coincidem'); return; }
  setPassword(p1);
  toast('Senha alterada com sucesso');
  document.getElementById('new-pass').value = '';
  document.getElementById('confirm-pass').value = '';
}
function exportData(){
  const blob = new Blob([JSON.stringify(state, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'fac-tecnologia-backup.json';
  a.click();
  URL.revokeObjectURL(url);
  toast('Backup exportado');
}
function importData(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const imported = JSON.parse(reader.result);
      state = deepMerge(structuredClone(DEFAULT_DATA), imported);
      persist();
      renderAllPanels();
      toast('Backup importado com sucesso');
    }catch(err){
      toast('Arquivo inválido');
    }
  };
  reader.readAsText(file);
}
function restoreDefaults(){
  if(!confirm('Tem certeza? Isso vai apagar todas as edições feitas neste navegador.')) return;
  resetData();
  state = loadData();
  renderAllPanels();
  toast('Conteúdo restaurado ao padrão');
}

/* ---------------- util: escape ---------------- */
function esc(str){
  if(str === undefined || str === null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ---------------- render all ---------------- */
function renderAllPanels(){
  renderBrand(); renderHero(); renderAbout(); renderServices(); renderAI();
  renderPortfolioAdmin(); renderClients(); renderCases(); renderAudiovisual();
  renderTechnologies(); renderProcess(); renderDifferentials(); renderTestimonials();
  renderSettings();
}

/* ---------------- tabs ---------------- */
document.getElementById('admin-nav').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-tab]');
  if(!btn) return;
  document.querySelectorAll('.admin-nav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
});

/* ---------------- auth ---------------- */
function showShell(){
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-shell').classList.add('active');
  renderAllPanels();
}
if(isAuthed()){
  showShell();
}
document.getElementById('login-btn').addEventListener('click', attemptLogin);
document.getElementById('login-pass').addEventListener('keydown', (e) => { if(e.key === 'Enter') attemptLogin(); });
function attemptLogin(){
  const val = document.getElementById('login-pass').value;
  if(val === getPassword()){
    setAuthed(true);
    document.getElementById('login-error').textContent = '';
    showShell();
  }else{
    document.getElementById('login-error').textContent = 'Senha incorreta. Tente novamente.';
  }
}
document.getElementById('logout-btn').addEventListener('click', () => {
  setAuthed(false);
  location.reload();
});

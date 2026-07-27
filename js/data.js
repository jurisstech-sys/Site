/* ============================================================
   FAC TECNOLOGIA — Camada de Dados (CMS local)
   Tudo o que aparece no site vive aqui. O painel /admin edita
   este objeto e grava no localStorage do navegador; o site
   público lê do localStorage e cai para estes padrões quando
   não houver nada salvo ainda.
   ============================================================ */

const STORAGE_KEY = 'factecnologia_site_data_v1';
const AUTH_KEY = 'factecnologia_admin_auth_v1';
const PASS_KEY = 'factecnologia_admin_pass_v1';

const DEFAULT_DATA = {
  brand: {
    name: 'FAC TECNOLOGIA',
    logo: 'assets/logo.png',
    whatsapp: '5561999999999',
    email: 'contato@factecnologia.com.br',
    phone: '(61) 99999-9999',
    address: 'Brasília — DF, Brasil',
    mapsUrl: 'https://maps.google.com/?q=Brasília,DF',
    instagram: '#',
    linkedin: '#',
    github: '#'
  },

  hero: {
    kicker: 'Fábrica de Software · Automações · IA',
    titleLine1: 'Criamos experiências digitais',
    titleLine2: 'que transformam empresas.',
    subtitle: 'Desenvolvimento de sistemas, plataformas web, aplicativos, automações inteligentes e produção audiovisual — tudo sob um único padrão de excelência técnica.',
    stats: [
      { num: '80+', label: 'Projetos entregues' },
      { num: '40+', label: 'Clientes atendidos' },
      { num: '120+', label: 'Automações criadas' },
      { num: '99.9%', label: 'Uptime médio' }
    ]
  },

  about: {
    text: 'A FAC TECNOLOGIA é uma fábrica de soluções digitais. Unimos engenharia de software, inteligência artificial e produção audiovisual para entregar projetos completos — do primeiro wireframe ao sistema em produção, sem intermediários e sem retrabalho.',
    items: [
      'Sistemas personalizados', 'Softwares corporativos', 'Plataformas SaaS',
      'Sites profissionais', 'Aplicativos Android', 'Aplicativos iOS',
      'Landing Pages', 'Dashboards', 'Portais', 'E-commerce',
      'Integrações', 'Automação de processos', 'Soluções com IA',
      'Produção audiovisual'
    ],
    founders: [
      { name: 'Felipe Carmo', role: 'Sócio-fundador', photo: 'assets/felipe.jpg' },
      { name: 'Jefferson Marques', role: 'Sócio-fundador', photo: 'assets/jefferson.jpg' }
    ]
  },

  services: [
    { icon: 'code', title: 'Desenvolvimento de Sistemas', desc: 'Softwares sob medida, arquitetura escalável e código limpo do início ao fim.' },
    { icon: 'device', title: 'Aplicativos Mobile', desc: 'Apps nativos e híbridos para Android e iOS, com foco em performance real.' },
    { icon: 'globe', title: 'Websites & Landing Pages', desc: 'Sites institucionais e páginas de alta conversão, rápidos e responsivos.' },
    { icon: 'layers', title: 'Plataformas & CRM/ERP', desc: 'Sistemas de gestão sob medida para o fluxo real da sua operação.' },
    { icon: 'link', title: 'Integrações & API', desc: 'Conectamos seus sistemas, marketplaces e ferramentas via APIs robustas.' },
    { icon: 'cloud', title: 'Cloud & DevOps', desc: 'Infraestrutura em nuvem, CI/CD e monitoramento contínuo.' },
    { icon: 'bot', title: 'Inteligência Artificial', desc: 'Chatbots, agentes de IA e automações que aprendem com o seu negócio.' },
    { icon: 'eye', title: 'Machine Learning & Visão Computacional', desc: 'Modelos preditivos e análise de imagem aplicados à sua realidade.' },
    { icon: 'camera', title: 'Audiovisual & Branding', desc: 'Vídeos institucionais, motion design e identidade visual completa.' }
  ],

  ai: {
    text: 'Desenvolvemos soluções de Inteligência Artificial aplicadas ao seu negócio: da automação de atendimento a agentes inteligentes que executam tarefas complexas, integrados ao WhatsApp e aos seus sistemas internos.',
    tags: [
      'Automação de atendimento', 'Agentes inteligentes', 'Integração com WhatsApp',
      'Fluxos automatizados', 'Processamento de documentos', 'Análise de dados',
      'Extração de informações', 'Chatbots inteligentes', 'Assistentes corporativos',
      'OpenAI', 'Claude', 'Gemini', 'DeepSeek'
    ]
  },

  portfolio: [
    {
      title: 'Plataforma SaaS Financeira',
      client: 'FinCorp',
      category: 'Sistemas',
      year: '2025',
      image: '',
      desc: 'Plataforma completa de gestão financeira multiempresa, com dashboards em tempo real e automação de conciliação bancária.',
      challenge: 'Substituir planilhas manuais por um sistema único capaz de consolidar dados de múltiplas contas em tempo real.',
      solution: 'Arquitetura em microsserviços com processamento assíncrono e painéis interativos.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      title: 'App de Delivery Regional',
      client: 'RotaExpress',
      category: 'Mobile',
      year: '2025',
      image: '',
      desc: 'Aplicativo de logística e entregas com rastreamento em tempo real e otimização de rotas.',
      challenge: 'Reduzir o tempo médio de entrega e o custo operacional das rotas.',
      solution: 'Motor de otimização de rotas com IA e app nativo para entregadores.',
      tech: ['React Native', 'FastAPI', 'Google Maps API'],
    },
    {
      title: 'Agente de IA para Atendimento',
      client: 'VarejoPlus',
      category: 'IA',
      year: '2024',
      image: '',
      desc: 'Agente inteligente integrado ao WhatsApp para atendimento e vendas automatizadas 24/7.',
      challenge: 'Escalar o atendimento sem aumentar a equipe, mantendo qualidade e personalização.',
      solution: 'Agente com memória de contexto, integrado ao ERP e à base de produtos.',
      tech: ['OpenAI', 'Node.js', 'WhatsApp API', 'Supabase']
    },
    {
      title: 'Portal Corporativo',
      client: 'Grupo Horizonte',
      category: 'Websites',
      year: '2024',
      image: '',
      desc: 'Site institucional premium com CMS próprio e otimização total de performance e SEO.',
      challenge: 'Comunicar autoridade de mercado com uma presença digital de altíssimo padrão.',
      solution: 'Design exclusivo, animações cinematográficas e Lighthouse acima de 95.',
      tech: ['Next.js', 'Tailwind', 'Vercel']
    },
    {
      title: 'Dashboard de Automação Industrial',
      client: 'MetalTech',
      category: 'Sistemas',
      year: '2024',
      image: '',
      desc: 'Painel de controle para automação de linhas de produção com alertas em tempo real.',
      challenge: 'Centralizar dados de sensores dispersos em múltiplas plantas industriais.',
      solution: 'Pipeline de dados em tempo real com visualização unificada.',
      tech: ['React', 'Python', 'Docker', 'PostgreSQL']
    },
    {
      title: 'Campanha Audiovisual de Lançamento',
      client: 'Nova Marca',
      category: 'Audiovisual',
      year: '2025',
      image: '',
      desc: 'Filme institucional e peças de motion design para o lançamento de marca.',
      challenge: 'Criar uma narrativa visual forte para um público exigente.',
      solution: 'Produção completa: roteiro, filmagem em drone, motion e finalização.',
      tech: ['Motion Design', 'Drone', 'Color Grading']
    }
  ],

  clients: [
    { name: 'FinCorp', logo: '', url: '#' },
    { name: 'RotaExpress', logo: '', url: '#' },
    { name: 'VarejoPlus', logo: '', url: '#' },
    { name: 'Grupo Horizonte', logo: '', url: '#' },
    { name: 'MetalTech', logo: '', url: '#' },
    { name: 'Nova Marca', logo: '', url: '#' },
    { name: 'Ábaco Consultoria', logo: '', url: '#' },
    { name: 'Vértice Log', logo: '', url: '#' }
  ],

  cases: [
    {
      title: 'Redução de 40% no tempo de atendimento',
      client: 'VarejoPlus',
      problem: 'Fila de atendimento crescente e equipe sobrecarregada em horários de pico.',
      solution: 'Implantação de agente de IA integrado ao WhatsApp com escalonamento inteligente.',
      tech: 'OpenAI, Node.js, WhatsApp API',
      result: '40% menos tempo médio de resposta e satisfação 30% maior.'
    },
    {
      title: 'Consolidação financeira multiempresa',
      client: 'FinCorp',
      problem: 'Dados financeiros dispersos em planilhas e sistemas isolados.',
      solution: 'Plataforma única com conciliação automática e dashboards em tempo real.',
      tech: 'Next.js, PostgreSQL, AWS',
      result: 'Fechamento mensal 5x mais rápido e zero divergências manuais.'
    }
  ],

  audiovisual: [
    { title: 'Filme Institucional — Nova Marca', tag: 'Institucional', video: '', poster: '' },
    { title: 'Campanha de Drone — MetalTech', tag: 'Drone', video: '', poster: '' },
    { title: 'Motion Design — Grupo Horizonte', tag: 'Motion', video: '', poster: '' }
  ],

  technologies: [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'Supabase', 'Firebase',
    'PostgreSQL', 'Docker', 'AWS', 'Azure', 'Python', 'FastAPI',
    'Flutter', 'React Native', 'OpenAI', 'Claude', 'Gemini', 'GitHub',
    'Git', 'Vercel', 'Cloudflare'
  ],

  process: [
    { title: 'Descoberta', desc: 'Entendemos seu negócio, desafios e objetivos antes de qualquer linha de código.' },
    { title: 'Planejamento', desc: 'Definimos escopo, arquitetura e cronograma com total transparência.' },
    { title: 'UX/UI', desc: 'Desenhamos a experiência com foco em clareza, performance e conversão.' },
    { title: 'Desenvolvimento', desc: 'Construímos com código limpo, testes e integração contínua.' },
    { title: 'Testes', desc: 'Validamos cada fluxo antes do lançamento, em ambiente controlado.' },
    { title: 'Deploy', desc: 'Publicação segura, monitorada e com plano de rollback.' },
    { title: 'Suporte', desc: 'Acompanhamento contínuo após o lançamento.' },
    { title: 'Evolução', desc: 'Iteramos com base em dados reais de uso.' }
  ],

  differentials: [
    { title: 'Projetos personalizados', desc: 'Nenhuma solução genérica — cada projeto nasce do seu negócio.' },
    { title: 'Alta performance', desc: 'Código otimizado, testado e pronto para escalar.' },
    { title: 'Arquitetura moderna', desc: 'Stacks atuais, seguras e preparadas para o futuro.' },
    { title: 'IA aplicada', desc: 'Inteligência artificial integrada onde ela gera resultado real.' }
  ],

  testimonials: [
    { text: 'A FAC TECNOLOGIA entregou muito além do esperado. O sistema transformou nossa operação.', name: 'Ana Beatriz', role: 'Diretora, FinCorp', photo: '' },
    { text: 'Profissionalismo, prazo e qualidade técnica em um nível que raramente encontramos no mercado.', name: 'Carlos Eduardo', role: 'CEO, RotaExpress', photo: '' },
    { text: 'O agente de IA mudou completamente nosso atendimento. Resultado visível já no primeiro mês.', name: 'Marina Costa', role: 'COO, VarejoPlus', photo: '' }
  ]
};

/* ---------- Storage helpers ---------- */
function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw);
    return deepMerge(structuredClone(DEFAULT_DATA), parsed);
  }catch(e){
    console.warn('Falha ao ler dados salvos, usando padrão.', e);
    return structuredClone(DEFAULT_DATA);
  }
}

function saveData(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function resetData(){
  localStorage.removeItem(STORAGE_KEY);
}

function deepMerge(base, override){
  if(Array.isArray(base)) return override !== undefined ? override : base;
  if(typeof base === 'object' && base !== null){
    const out = {...base};
    if(override && typeof override === 'object'){
      for(const key of Object.keys(override)){
        out[key] = deepMerge(base[key], override[key]);
      }
    }
    return out;
  }
  return override !== undefined ? override : base;
}

/* ---------- Auth helpers (client-side only — see README) ---------- */
function isAuthed(){
  return sessionStorage.getItem(AUTH_KEY) === '1';
}
function setAuthed(val){
  if(val) sessionStorage.setItem(AUTH_KEY, '1');
  else sessionStorage.removeItem(AUTH_KEY);
}
function getPassword(){
  return localStorage.getItem(PASS_KEY) || 'factecnologia2026';
}
function setPassword(p){
  localStorage.setItem(PASS_KEY, p);
}

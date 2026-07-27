# FAC TECNOLOGIA — Site institucional

Site premium em HTML/CSS/JS puro (sem build, sem dependências) com um
painel administrativo para editar todo o conteúdo pela tela, sem mexer em código.

## Estrutura

```
fac-tecnologia/
├── index.html          → site público
├── admin.html           → painel administrativo (login + edição)
├── css/
│   ├── style.css        → estilos do site
│   └── admin.css        → estilos do painel
├── js/
│   ├── data.js           → conteúdo padrão + funções de armazenamento (CMS)
│   ├── main.js           → renderiza o site a partir dos dados
│   ├── admin.js          → lógica do painel administrativo
│   └── circuit.js        → animação de fundo (traços de circuito)
└── assets/               → logo e fotos dos sócios
```

## Como publicar no GitHub Pages (passo a passo)

1. Crie um repositório novo no GitHub (ex.: `fac-tecnologia`).
2. Suba **todos os arquivos desta pasta** para a raiz do repositório
   (pode arrastar e soltar pela interface do GitHub, ou usar `git push`).
3. No repositório, vá em **Settings → Pages**.
4. Em "Branch", selecione `main` (ou `master`) e a pasta `/root`, depois clique em **Save**.
5. Em alguns minutos o site estará no ar em `https://SEU-USUARIO.github.io/fac-tecnologia/`.

Como é um site 100% estático (HTML/CSS/JS), também funciona direto na
Vercel, Netlify ou Cloudflare Pages — basta importar o repositório, sem
nenhuma configuração de build.

## Como editar o conteúdo pela tela (painel administrativo)

1. Acesse `/admin.html` (ex.: `https://seu-site.com/admin.html`, ou o
   link "Área administrativa" no rodapé do site).
2. Senha padrão: **factecnologia2026**
   → Troque a senha assim que possível em **Configurações → Senha de acesso**.
3. No menu lateral, escolha a seção que quer editar: textos do topo,
   sobre a empresa, serviços, portfólio, clientes, cases, audiovisual,
   tecnologias, processo, diferenciais, depoimentos ou contato/redes sociais.
4. Cada alteração é salva automaticamente (veja o indicador "Salvo
   automaticamente" no topo). Não existe botão de "Publicar" — a mudança
   já vale na hora.
5. Para adicionar imagens (fotos de clientes, projetos, sócios etc.),
   use o botão "Enviar imagem" — não é preciso subir arquivos no GitHub.

## ⚠️ Importante: onde os dados ficam salvos

Por ser um site **estático** (sem servidor/backend), o painel guarda as
edições no **localStorage do navegador** que fez a edição. Isso significa:

- As edições ficam salvas **apenas no navegador/computador onde você
  fez a alteração**. Um visitante que acesse o site de outro
  computador, celular ou navegador **não verá** as mudanças — ele verá
  o conteúdo padrão (ou o último backup importado naquele navegador).
- **Use sempre o mesmo navegador/computador** para editar, e depois
  gere um backup em **Configurações → Exportar backup (.json)**.
- Para ter um site onde qualquer edição aparece para todos os
  visitantes, o próximo passo natural é ligar o painel a um banco de
  dados real (ex.: Supabase ou Firebase) — a estrutura de `data.js`
  já foi pensada para facilitar essa migração (é só trocar as funções
  `loadData()` / `saveData()` por chamadas de API).
- Faça backups em JSON regularmente (Configurações → Exportar backup)
  para não perder conteúdo se limpar o navegador.

Se quiser, posso te ajudar a evoluir isso para um backend real (Supabase),
com login de verdade e dados compartilhados entre todos os visitantes —
é a extensão natural deste projeto.

## Personalização rápida

- **Logo e fotos**: já estão em `assets/` (logo, Felipe Carmo e Jefferson
  Marques) — podem ser trocadas pelo painel administrativo a qualquer momento.
- **Cores**: os tokens de cor ficam no topo de `css/style.css`, na seção
  `:root` (fundo preto, branco, cinzas e o azul de destaque `--accent`).
- **WhatsApp**: configurável em Admin → Marca & Contato (formato: DDI+DDD+número, ex. `5561999999999`).

## Recursos incluídos

- Animação cinematográfica de entrada (logo → header)
- Fundo com traços de circuito animados (Canvas, leve e discreto)
- Scroll reveal, contadores animados, hover com brilho nos cards
- Portfólio com filtro por categoria e modal de detalhes do projeto
- Esteira infinita de logos de clientes
- Totalmente responsivo (mobile, tablet, desktop)
- `prefers-reduced-motion` respeitado
- Painel administrativo completo (CRUD de todas as seções + backup/restauração)

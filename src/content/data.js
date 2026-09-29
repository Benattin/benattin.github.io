// Todo o conteúdo do site. Edite aqui para atualizar textos, projetos e links.

const links = {
  email: 'gustavobenatti2008@gmail.com',
  github: 'https://github.com/Benattin',
  linkedin: 'https://www.linkedin.com/in/gustabenatti',
  cv: 'cv/Gustavo-Benatti.pdf',
};

const sections = ['inicio', 'perfil', 'habilidades', 'experiencia', 'projetos', 'formacoes', 'conquistas', 'contato'];

// Categoria e destaque de cada projeto, na mesma ordem de projectList
const projectMeta = [
  { category: 'ia', featured: true },
  { category: 'ia', featured: true },
  { category: 'web', featured: true },
  { category: 'web' },
  { category: 'web' },
  { category: 'web' },
];

const files = ['inicio.ts', 'perfil.ts', 'habilidades.ts', 'experiencia.json', 'projetos.tsx', 'formacoes.md', 'conquistas.md', 'contato.sh'];

const pt = {
  lang: 'pt',
  locale: 'pt-BR',
  menu: ['Início', 'Perfil', 'Habilidades', 'Experiência', 'Projetos', 'Formações complementares', 'Conquistas', 'Contato'],
  files,
  role: 'Desenvolvedor Web',
  status: 'disponível para estágio',
  character: [
    'Olá! Seja bem-vindo.',
    'Esse sou eu, em resumo.',
    'Minhas ferramentas do dia a dia.',
    'Minha trajetória até aqui.',
    'Os projetos que mais me orgulham.',
    'O que aprendi fora da sala de aula.',
    'Alguns marcos no caminho.',
    'Bora conversar?',
  ],
  characterSays: {
    click: ['Opa! Tudo certo?', 'Ei, isso faz cócegas!', 'Curtiu o portfólio?', 'Fiz esse site do zero!', 'Bora trabalhar junto?'],
    idle: 'Ainda por aí? Role para ver mais ↓',
    menu: 'Bora para {x}?',
    project: '{x}: um dos meus xodós.',
    skill: '{x}: uso isso no dia a dia.',
    mission: 'Essa foi minha fase na {x}.',
    cv: 'Meu currículo completo está aqui!',
    contact: 'Me chama, respondo rápido!',
  },
  hint: 'navegar · scroll avança · Esc volta ao início',
  bootKicker: 'um portfólio de',
  bootTasks: ['carregando as fontes', 'acendendo a cidade', 'ligando os neons', 'ajustando a lente', 'primeira cena'],
  bootDone: 'ação',
  prev: 'Seção anterior',
  next: 'Próxima seção',
  edge: 'continue rolando · próxima:',
  hero: {
    kicker: 'Olá, eu sou',
    tagline: 'HTML · CSS · JavaScript · Python · IA aplicada',
    meta: 'São Paulo, SP · FIAP Sistemas de Informação',
    cv: 'baixar currículo.pdf',
    contact: 'falar comigo',
    stats: { projects: 'projetos', certs: 'certificações', languages: 'idiomas' },
    now: 'Hoje: estudando Sistemas de Informação na FIAP e construindo a Fenix e a AURA, meus assistentes de IA locais.',
    scroll: 'role para continuar',
  },
  profile: {
    about:
      'Desenvolvedor web de São Paulo, técnico em Desenvolvimento de Sistemas pela Etec Sebrae e estudante de Sistemas de Informação na FIAP. Gosto de transformar ideias em produtos que funcionam: sites, catálogos e assistentes de IA que rodam no meu próprio computador. Meu foco é me tornar especialista em inteligência artificial, sem perder o capricho no front-end.',
    educationTitle: 'Formação',
    education: [
      { course: 'Bacharelado em Sistemas de Informação', school: 'FIAP', period: '2026 – 2029 (em andamento)' },
      { course: 'Ensino Médio Técnico em Desenvolvimento de Sistemas', school: 'Etec Sebrae', period: '2022 – 2025' },
    ],
    certTitle: 'Cursos e certificações',
    certs: [
      {
        group: 'Tecnologia',
        items: [
          'Capacita+: Construa com o Gemini · Google Cloud · 2026',
          'Gestão de Infraestrutura de TI · FIAP Nano Course (20h) · 2026',
          'Jornada Python · Hashtag Treinamentos (8h) · 2025',
          'Imersão Inteligência Artificial na Prática · Daxus (8h) · 2025',
          'Endpoint Security · Cisco Networking Academy · 2024',
        ],
      },
      {
        group: 'Idiomas',
        items: ['TOEIC Bridge Listening and Reading · ETS · 2025', 'Vacation English Course · Embassy Summer, Londres · 2024'],
      },
      {
        group: 'Carreira e negócios',
        items: [
          'Formação Social e Sustentabilidade · FIAP Nano Course (80h) · 2026',
          'Empresário-Sombra Por Um Dia · Junior Achievement e MUFG (6h) · 2025',
          'Finanças em Jogo · Junior Achievement e MUFG (5h) · 2025',
          'Conectado com o Amanhã · Junior Achievement e MUFG (5h) · 2025',
          'Feira do Empreendedor SP 2025 · Sebrae (40h) · 2025',
          'Adolescência, Competências Socioemocionais e Saúde Mental · Leo Fraiman · 2024',
          'Meta Spark · Junior Achievement (4h) · 2023',
          'Mercado de Trabalho e Processo Seletivo · Nube · 2023',
        ],
      },
    ],
    langTitle: 'Idiomas',
    languages: ['Português fluente', 'Inglês intermediário e técnico', 'Espanhol básico'],
  },
  skills: [
    { group: 'Comportamentais', note: 'Na prática: 11 meses de voluntariado nas mídias da Etec, intercâmbio em Londres e projetos de IA feitos por conta própria.', items: ['Proatividade', 'Aprendizado rápido', 'Responsabilidade', 'Adaptação', 'Comunicação'] },
    { group: 'Linguagens', note: 'Base de tudo o que construo.', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Python'] },
    { group: 'Frontend', note: 'Sites, catálogos e interfaces responsivas.', items: ['Design responsivo', 'React', 'Vite', 'Three.js', 'Animações CSS', 'GitHub Pages'] },
    { group: 'Backend e APIs', note: 'Servidores locais que ligam interface e IA.', items: ['Node.js', 'Python', 'FastAPI', 'APIs REST'] },
    { group: 'IA aplicada', note: 'Assistentes que rodam no meu próprio PC (Fenix e AURA).', items: ['Ollama', 'LLMs locais (Llama, Qwen)', 'Agentes de IA', 'Whisper (voz → texto)', 'Piper (texto → voz)', 'Engenharia de prompt'] },
    { group: 'Automação', note: 'Rotinas e apps de desktop no Windows.', items: ['Scripts em Python', 'App desktop (pywebview)', 'Leitura de PDF, Word e Excel', 'Build de sites estáticos'] },
    { group: 'Ferramentas', note: 'O que uso no dia a dia.', items: ['Git', 'GitHub', 'VS Code / Cursor', 'pytest'] },
    { group: 'Segurança', note: 'Privacidade vem primeiro.', items: ['Privacidade local (local-first)', 'Confirmação de ações sensíveis', 'Segurança de endpoints (Cisco)'] },
  ],
  missionsCounter: 'experiência {c} de {t}',
  missions: [
    {
      company: 'Projetos próprios',
      role: 'Desenvolvedor Web e IA',
      period: '2025 – Atual',
      place: 'São Paulo, SP',
      highlights: [
        'Criei a Fenix e a AURA, assistentes pessoais de IA que rodam 100% no meu computador com modelos locais.',
        'Entreguei o catálogo de atacado da Movement, publicado no GitHub Pages.',
      ],
      stack: ['JavaScript', 'Python', 'Node.js', 'Ollama'],
    },
    {
      company: 'FIAP',
      role: 'Estudante de Sistemas de Informação',
      period: '2026 – 2029',
      place: 'São Paulo, SP',
      highlights: ['Graduação com foco em desenvolvimento de sistemas, dados e tecnologia aplicada a negócios.'],
      stack: ['Sistemas', 'Dados', 'Negócios'],
    },
    {
      company: 'Etec Sebrae · Voluntariado',
      role: 'Voluntário em mídias digitais',
      period: 'Fev 2025 – Dez 2025',
      place: 'São Paulo, SP',
      highlights: ['Mantive atualizadas as mídias digitais da escola durante 11 meses, no projeto Atualização das Mídias Digitais.'],
      stack: ['Mídias sociais', 'Comunicação'],
    },
    {
      company: 'Etec Sebrae',
      role: 'Técnico em Desenvolvimento de Sistemas',
      period: '2022 – 2025',
      place: 'São Paulo, SP',
      highlights: [
        'Formação técnica em lógica de programação, desenvolvimento web e sistemas.',
        'Projetos escolares como o site de robótica educacional.',
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Python'],
    },
    {
      company: 'Intercâmbio · Experimento',
      role: 'Vivência internacional',
      period: 'Jun 2024 – Jul 2024',
      place: 'Londres e Paris',
      highlights: ['Aperfeiçoamento do inglês e desenvolvimento de autonomia, adaptação e resolução de problemas.'],
      stack: ['Inglês', 'Autonomia'],
    },
  ],
  projects: {
    repo: 'repositório',
    demo: 'ver online',
    local: 'roda localmente',
    featured: 'destaque',
    caseLabels: { problem: 'Problema', solution: 'O que fiz', learned: 'Aprendizado' },
    groups: { featured: 'Principais projetos', others: 'Outros projetos', github: 'Direto do GitHub' },
    github: { loading: 'carregando repositórios do GitHub…', error: 'Não consegui carregar agora. Veja todos no GitHub', noDescription: 'Sem descrição.' },
    filters: { all: 'todos', ia: 'IA', web: 'web' },
  },
  projectList: [
    {
      title: 'Fenix',
      date: '2026',
      description:
        'Agente pessoal de IA com voz e palavra de ativação ("ei Fenix"). Roda um modelo local no Ollama, organiza agenda, faz triagem de e-mails em modo somente leitura e monta um resumo de notícias com agentes próprios.',
      case: {
        problem: 'Queria um assistente que organizasse meu dia sem mandar meus dados para a nuvem.',
        solution: 'Agente com palavra de ativação ("ei Fenix"), modelo local no Ollama, agenda, triagem de e-mails somente leitura e resumo de notícias com agentes próprios.',
        learned: 'Orquestrar vários agentes e tratar privacidade como regra do projeto, não como detalhe.',
      },
      stack: ['JavaScript', 'Node.js', 'Ollama', 'Llama 3.2', 'Web Speech'],
    },
    {
      title: 'AURA',
      date: '2026',
      description:
        'Assistente de IA para Windows que fica em segundo plano e acorda com a palavra "Aura". Entende voz com Whisper, responde falando com Piper, guarda memória local e só executa ações sensíveis com confirmação.',
      case: {
        problem: 'Ter um assistente de voz no Windows que agisse no PC sem o risco de fazer algo sem minha permissão.',
        solution: 'Serviço em segundo plano com Whisper para ouvir, Piper para falar, memória local e confirmação antes de qualquer ação sensível.',
        learned: 'Integrar backend em Python (FastAPI) com interface em React e pensar em segurança desde o começo.',
      },
      stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Whisper', 'Piper TTS', 'Ollama'],
    },
    {
      title: 'Movement · Catálogo atacado',
      date: '2026',
      description:
        'Catálogo estático de atacado para lojistas: busca, filtros, ficha de produto, carrinho e montagem do pedido. Os produtos vêm de um JSON e as páginas são geradas por um build próprio.',
      case: {
        problem: 'Lojistas precisavam de um jeito simples de consultar o catálogo de atacado e montar o pedido.',
        solution: 'Site estático com busca, filtros, ficha de produto e carrinho. Os produtos ficam num JSON e as páginas são geradas por um build próprio.',
        learned: 'Gerar páginas a partir de dados e publicar sem servidor, direto no GitHub Pages.',
      },
      stack: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'GitHub Pages'],
      repo: 'https://github.com/Benattin/catalogo-movement',
      demo: 'https://benattin.github.io/catalogo-movement/',
    },
    {
      title: 'NexusTech',
      date: '2026',
      description: 'Landing page profissional para uma empresa de tecnologia, inspirada no design system da Stripe.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      repo: 'https://github.com/Benattin/nexustech-site',
    },
    {
      title: 'Robótica educacional',
      date: '2026',
      description: 'Site sobre robótica educacional, com conteúdo organizado para estudantes e professores.',
      stack: ['HTML', 'CSS'],
      repo: 'https://github.com/Benattin/Site-de-rob-tica-educacional-',
    },
    {
      title: 'Este portfólio',
      date: '2026',
      description: 'Experiência em tela cheia com cena 3D feita em Three.js, navegação por seções e versão PT/EN.',
      stack: ['JavaScript', 'Three.js', 'Vite'],
      repo: 'https://github.com/Benattin/benattin.github.io',
    },
  ],
  achievementsTitle: 'Conquistas',
  complementary: [
    { title: 'Programa META SPARK', place: 'Meta e JA São Paulo', date: '', description: 'Programa de tecnologia e empreendedorismo para jovens.' },
    { title: 'Feira do Empreendedor SP 2025', place: 'Sebrae', date: '2025', description: '40 horas de imersão em empreendedorismo e negócios.' },
    { title: 'RoboCup', place: 'Robótica', date: '', description: 'Participação em competição de robótica.' },
  ],
  achievements: [
    { title: 'Intercâmbio Londres e Paris', place: 'Experimento', date: '2024', description: 'Um mês fora do país praticando inglês e vivendo outra cultura.' },
    { title: 'Técnico formado', place: 'Etec Sebrae', date: '2025', description: 'Conclusão do Ensino Médio Técnico em Desenvolvimento de Sistemas.' },
  ],
  contact: {
    title: 'Pode me chamar por e-mail ou pelo LinkedIn.',
    email: 'email',
    github: 'github',
    linkedin: 'linkedin',
    cv: 'currículo',
    copy: 'copiar',
    copied: 'e-mail copiado',
  },
};

const en = {
  lang: 'en',
  locale: 'en-US',
  menu: ['Home', 'Profile', 'Skills', 'Experience', 'Projects', 'Complementary training', 'Achievements', 'Contact'],
  files: ['home.ts', 'profile.ts', 'skills.ts', 'experience.json', 'projects.tsx', 'training.md', 'achievements.md', 'contact.sh'],
  role: 'Web Developer',
  status: 'open to internships',
  character: [
    'Hi! Welcome in.',
    "That's me, in short.",
    'My everyday toolkit.',
    'My journey so far.',
    "The projects I'm proudest of.",
    'What I learned outside the classroom.',
    'A few milestones.',
    "Let's talk?",
  ],
  characterSays: {
    click: ['Hey! All good?', 'Hey, that tickles!', 'Enjoying the portfolio?', 'I built this site from scratch!', "Let's work together?"],
    idle: 'Still there? Scroll to see more ↓',
    menu: 'Shall we go to {x}?',
    project: '{x}: one of my favorites.',
    skill: '{x}: I use this every day.',
    mission: 'This was my time at {x}.',
    cv: 'My full resume is right here!',
    contact: 'Reach out, I reply fast!',
  },
  hint: 'navigate · scroll advances · Esc goes home',
  bootKicker: 'a portfolio by',
  bootTasks: ['loading the fonts', 'lighting up the city', 'turning on the neon', 'adjusting the lens', 'first scene'],
  bootDone: 'action',
  prev: 'Previous section',
  next: 'Next section',
  edge: 'keep scrolling · next:',
  hero: {
    kicker: "Hi, I'm",
    tagline: 'HTML · CSS · JavaScript · Python · Applied AI',
    meta: 'São Paulo, Brazil · Information Systems at FIAP',
    cv: 'download resume.pdf',
    contact: 'get in touch',
    stats: { projects: 'projects', certs: 'certifications', languages: 'languages' },
    now: 'Right now: studying Information Systems at FIAP and building Fenix and AURA, my local AI assistants.',
    scroll: 'scroll to continue',
  },
  profile: {
    about:
      "Web developer from São Paulo, Systems Development technician from Etec Sebrae and Information Systems student at FIAP. I like turning ideas into products that work: websites, catalogs and AI assistants that run on my own computer. My goal is to become an artificial intelligence specialist while keeping a careful eye on the front end.",
    educationTitle: 'Education',
    education: [
      { course: "Bachelor's in Information Systems", school: 'FIAP', period: '2026 – 2029 (in progress)' },
      { course: 'Technical High School in Systems Development', school: 'Etec Sebrae', period: '2022 – 2025' },
    ],
    certTitle: 'Courses and certifications',
    certs: [
      {
        group: 'Technology',
        items: [
          'Capacita+: Build with Gemini · Google Cloud · 2026',
          'IT Infrastructure Management · FIAP Nano Course (20h) · 2026',
          'Python Journey · Hashtag Treinamentos (8h) · 2025',
          'Applied Artificial Intelligence Immersion · Daxus (8h) · 2025',
          'Endpoint Security · Cisco Networking Academy · 2024',
        ],
      },
      {
        group: 'Languages',
        items: ['TOEIC Bridge Listening and Reading · ETS · 2025', 'Vacation English Course · Embassy Summer, London · 2024'],
      },
      {
        group: 'Career and business',
        items: [
          'Social Education and Sustainability · FIAP Nano Course (80h) · 2026',
          'Job Shadow for a Day · Junior Achievement and MUFG (6h) · 2025',
          'Finance in Play · Junior Achievement and MUFG (5h) · 2025',
          'Connected to Tomorrow · Junior Achievement and MUFG (5h) · 2025',
          'Entrepreneur Fair SP 2025 · Sebrae (40h) · 2025',
          'Adolescence, Socio-emotional Skills and Mental Health · Leo Fraiman · 2024',
          'Meta Spark · Junior Achievement (4h) · 2023',
          'Job Market and Hiring Process · Nube · 2023',
        ],
      },
    ],
    langTitle: 'Languages',
    languages: ['Portuguese (fluent)', 'English (intermediate and technical)', 'Spanish (basic)'],
  },
  skills: [
    { group: 'Soft skills', note: 'In practice: 11 months volunteering on Etec’s digital media, an exchange in London and AI projects built on my own.', items: ['Proactivity', 'Fast learning', 'Responsibility', 'Adaptability', 'Communication'] },
    { group: 'Languages', note: 'The foundation of everything I build.', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Python'] },
    { group: 'Frontend', note: 'Websites, catalogs and responsive interfaces.', items: ['Responsive design', 'React', 'Vite', 'Three.js', 'CSS animations', 'GitHub Pages'] },
    { group: 'Backend & APIs', note: 'Local servers that connect UI and AI.', items: ['Node.js', 'Python', 'FastAPI', 'REST APIs'] },
    { group: 'Applied AI', note: 'Assistants that run on my own PC (Fenix and AURA).', items: ['Ollama', 'Local LLMs (Llama, Qwen)', 'AI agents', 'Whisper (speech → text)', 'Piper (text → speech)', 'Prompt engineering'] },
    { group: 'Automation', note: 'Routines and desktop apps on Windows.', items: ['Python scripts', 'Desktop app (pywebview)', 'PDF, Word and Excel parsing', 'Static site builds'] },
    { group: 'Tools', note: 'What I use every day.', items: ['Git', 'GitHub', 'VS Code / Cursor', 'pytest'] },
    { group: 'Security', note: 'Privacy comes first.', items: ['Local-first privacy', 'Confirmation for sensitive actions', 'Endpoint security (Cisco)'] },
  ],
  missionsCounter: 'experience {c} of {t}',
  missions: [
    {
      company: 'Personal projects',
      role: 'Web and AI Developer',
      period: '2025 – Present',
      place: 'São Paulo, Brazil',
      highlights: [
        'Built Fenix and AURA, personal AI assistants that run entirely on my computer with local models.',
        'Delivered the Movement wholesale catalog, published on GitHub Pages.',
      ],
      stack: ['JavaScript', 'Python', 'Node.js', 'Ollama'],
    },
    {
      company: 'FIAP',
      role: 'Information Systems student',
      period: '2026 – 2029',
      place: 'São Paulo, Brazil',
      highlights: ['Degree focused on systems development, data and technology applied to business.'],
      stack: ['Systems', 'Data', 'Business'],
    },
    {
      company: 'Etec Sebrae · Volunteering',
      role: 'Digital media volunteer',
      period: 'Feb 2025 – Dec 2025',
      place: 'São Paulo, Brazil',
      highlights: ['Kept the school’s digital media up to date for 11 months in the Digital Media Update project.'],
      stack: ['Social media', 'Communication'],
    },
    {
      company: 'Etec Sebrae',
      role: 'Systems Development technician',
      period: '2022 – 2025',
      place: 'São Paulo, Brazil',
      highlights: [
        'Technical training in programming logic, web development and systems.',
        'School projects such as the educational robotics website.',
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Python'],
    },
    {
      company: 'Exchange · Experimento',
      role: 'International experience',
      period: 'Jun 2024 – Jul 2024',
      place: 'London and Paris',
      highlights: ['Improved my English and built autonomy, adaptability and problem solving.'],
      stack: ['English', 'Autonomy'],
    },
  ],
  projects: {
    repo: 'repository',
    demo: 'view live',
    local: 'runs locally',
    featured: 'featured',
    caseLabels: { problem: 'Problem', solution: 'What I built', learned: 'What I learned' },
    groups: { featured: 'Main projects', others: 'Other projects', github: 'Straight from GitHub' },
    github: { loading: 'loading GitHub repositories…', error: "Couldn't load right now. See them all on GitHub", noDescription: 'No description.' },
    filters: { all: 'all', ia: 'AI', web: 'web' },
  },
  projectList: [
    {
      title: 'Fenix',
      date: '2026',
      description:
        'Personal AI agent with voice and a wake word ("hey Fenix"). Runs a local model on Ollama, organizes my schedule, triages e-mail in read-only mode and builds a news digest with its own agents.',
      case: {
        problem: 'I wanted an assistant to organize my day without sending my data to the cloud.',
        solution: 'Agent with a wake word ("hey Fenix"), a local model on Ollama, schedule, read-only e-mail triage and a news digest built by its own agents.',
        learned: 'Orchestrating several agents and treating privacy as a project rule, not a detail.',
      },
      stack: ['JavaScript', 'Node.js', 'Ollama', 'Llama 3.2', 'Web Speech'],
    },
    {
      title: 'AURA',
      date: '2026',
      description:
        'Windows AI assistant that waits in the background and wakes up with the word "Aura". Understands speech with Whisper, answers out loud with Piper, keeps a local memory and only runs sensitive actions after confirmation.',
      case: {
        problem: 'A voice assistant on Windows that could act on my PC without the risk of doing something I did not approve.',
        solution: 'Background service with Whisper to listen, Piper to speak, local memory and confirmation before any sensitive action.',
        learned: 'Connecting a Python backend (FastAPI) to a React UI and thinking about security from day one.',
      },
      stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Whisper', 'Piper TTS', 'Ollama'],
    },
    {
      title: 'Movement · Wholesale catalog',
      date: '2026',
      description:
        'Static wholesale catalog for retailers: search, filters, product page, cart and order builder. Products come from a JSON file and pages are generated by a custom build.',
      case: {
        problem: 'Retailers needed a simple way to browse the wholesale catalog and put an order together.',
        solution: 'Static site with search, filters, product page and cart. Products live in a JSON file and pages are generated by a custom build.',
        learned: 'Generating pages from data and shipping without a server, straight to GitHub Pages.',
      },
      stack: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'GitHub Pages'],
      repo: 'https://github.com/Benattin/catalogo-movement',
      demo: 'https://benattin.github.io/catalogo-movement/',
    },
    {
      title: 'NexusTech',
      date: '2026',
      description: 'Professional landing page for a tech company, inspired by the Stripe design system.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      repo: 'https://github.com/Benattin/nexustech-site',
    },
    {
      title: 'Educational robotics',
      date: '2026',
      description: 'Website about educational robotics, with content organized for students and teachers.',
      stack: ['HTML', 'CSS'],
      repo: 'https://github.com/Benattin/Site-de-rob-tica-educacional-',
    },
    {
      title: 'This portfolio',
      date: '2026',
      description: 'Full-screen experience with a 3D scene built in Three.js, section navigation and PT/EN versions.',
      stack: ['JavaScript', 'Three.js', 'Vite'],
      repo: 'https://github.com/Benattin/benattin.github.io',
    },
  ],
  achievementsTitle: 'Achievements',
  complementary: [
    { title: 'META SPARK Program', place: 'Meta and JA São Paulo', date: '', description: 'Technology and entrepreneurship program for young people.' },
    { title: 'Entrepreneur Fair SP 2025', place: 'Sebrae', date: '2025', description: '40 hours of immersion in entrepreneurship and business.' },
    { title: 'RoboCup', place: 'Robotics', date: '', description: 'Took part in a robotics competition.' },
  ],
  achievements: [
    { title: 'London and Paris exchange', place: 'Experimento', date: '2024', description: 'A month abroad practicing English and living another culture.' },
    { title: 'Technician graduate', place: 'Etec Sebrae', date: '2025', description: 'Completed Technical High School in Systems Development.' },
  ],
  contact: {
    title: 'Feel free to reach me by email or on LinkedIn.',
    email: 'email',
    github: 'github',
    linkedin: 'linkedin',
    cv: 'resume',
    copy: 'copy',
    copied: 'email copied',
  },
};

for (const lang of [pt, en]) {
  lang.projectList = lang.projectList.map((p, i) => ({ ...p, ...projectMeta[i] }));
}

export const content = { pt, en, links, sections };

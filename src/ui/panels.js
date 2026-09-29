import { content } from '../content/data.js';
import { state } from '../core/state.js';
import { esc, pad } from './dom.js';

const { links, stats } = content;

// ---------- Blocos reutilizáveis ----------
const scrambleText = (text, tag, cls) =>
  `<${tag} class="${cls}" aria-label="${esc(text)}"><span class="scramble" aria-hidden="true" data-text="${esc(text)}">${esc(text)}</span></${tag}>`;
const title = (label) => scrambleText(label, 'h2', 'panel__title');
const chips = (items, cls = '') => `<ul class="chips ${cls}">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
const extLink = (href, label) => `<a class="link" href="${href}" target="_blank" rel="noopener">${esc(label)} <span aria-hidden="true">↗</span></a>`;
const heading = (text) => `<h3 class="subhead">${esc(text)}</h3>`;
const menuTitle = (d, id) => title(d.menu[content.sections.indexOf(id)]);
// Cards de marcos (formações, conquistas): ícone, instituição e ano, título e descrição
const milestones = (items, icon) => `
    <ul class="milestones">${items
      .map((a, i) => `
        <li class="card milestone" style="--i:${i}">
          <span class="milestone__icon" aria-hidden="true">${icon}</span>
          <div>
            <p class="milestone__place">${esc(a.place)}${a.date ? ` · ${esc(a.date)}` : ''}</p>
            <h3 class="milestone__title">${esc(a.title)}</h3>
            <p class="muted">${esc(a.description)}</p>
          </div>
        </li>`)
      .join('')}</ul>`;
// Fala do personagem ao passar o mouse; {x} é trocado pelo nome do item
const sayAttr = (template, x = '') => `data-say="${esc(template.replace('{x}', x))}"`;

// ---------- Seções ----------
function inicio(d) {
  const numbers = [
    [d.projectList.length, d.hero.stats.projects],
    [d.profile.certs.length, d.hero.stats.certs],
    [d.profile.languages.length, d.hero.stats.languages],
  ];
  return `
    ${title(d.menu[0])}
    <div class="hero">
      <p class="hero__kicker">${esc(d.hero.kicker)}</p>
      ${scrambleText('Gustavo Benatti', 'p', 'hero__name')}
      <p class="hero__title">${esc(d.role)}</p>
      <p class="hero__tagline">${esc(d.hero.tagline)}</p>
      <p class="hero__meta"><span class="pulse" aria-hidden="true"></span>${esc(d.hero.meta)}</p>
      <dl class="numbers">${numbers.map(([n, label]) => `<div><dt>${String(n).padStart(2, '0')}</dt><dd>${esc(label)}</dd></div>`).join('')}</dl>
      <div class="actions">
        <a class="btn btn--primary" href="${links.cv}" download ${sayAttr(d.characterSays.cv)}>${esc(d.hero.cv)}</a>
        <button type="button" class="btn" data-go="${content.sections.indexOf('contato')}" ${sayAttr(d.characterSays.contact)}>${esc(d.hero.contact)} →</button>
      </div>
      <p class="callout">${esc(d.hero.now)}</p>
    </div>`;
}

function perfil(d) {
  const k = d.lang === 'pt' ? ['perfil', 'nome', 'cargo', 'local', 'foco', 'IA + Web'] : ['profile', 'name', 'title', 'location', 'focus', 'AI + Web'];
  return `
    ${title(d.menu[1])}
    <pre class="code"><span class="tk-k">const</span> <span class="tk-v">${k[0]}</span> = {
  <span class="tk-p">${k[1]}</span>: <span class="tk-s">"Gustavo Benatti"</span>,
  <span class="tk-p">${k[2]}</span>: <span class="tk-s">"${esc(d.role)}"</span>,
  <span class="tk-p">${k[3]}</span>: <span class="tk-s">"São Paulo, SP"</span>,
  <span class="tk-p">${k[4]}</span>: <span class="tk-s">"${k[5]}"</span>,
};</pre>
    <p class="lead">${esc(d.profile.about)}</p>

    ${heading(d.profile.statsTitle)}
    <div class="stats">${Object.entries(stats)
      .map(([key, v], i) => `
        <div class="stat" style="--i:${i}">
          <span class="stat__label">${esc(d.profile.statLabels[key])}</span>
          <span class="stat__bar"><i style="--v:${v}%"></i></span>
          <b class="stat__value">${v}</b>
        </div>`)
      .join('')}</div>

    ${heading(d.profile.educationTitle)}
    <ol class="timeline">${d.profile.education
      .map((e) => `<li><p class="timeline__when">${esc(e.period)}</p><p class="timeline__what">${esc(e.course)}</p><p class="muted">${esc(e.school)}</p></li>`)
      .join('')}</ol>

    ${heading(d.profile.certTitle)}
    <ul class="certs">${d.profile.certs
      .map((c) => {
        const [name, issuer] = c.split(' · ');
        return `<li><b>${esc(name)}</b><span>${esc(issuer || '')}</span></li>`;
      })
      .join('')}</ul>

    ${heading(d.profile.langTitle)}
    ${chips(d.profile.languages)}`;
}

function habilidades(d) {
  return `
    ${title(d.menu[2])}
    <div class="skills">${d.skills
      .map((g, i) => `
        <section class="card skill" style="--i:${i}" ${sayAttr(d.characterSays.skill, g.group)}>
          <header class="card__head"><span class="card__index">${pad(i)}</span><h3>${esc(g.group)}</h3></header>
          ${g.note ? `<p class="skill__note">${esc(g.note)}</p>` : ''}
          ${chips(g.items)}
        </section>`)
      .join('')}</div>`;
}

function experiencia(d) {
  return `
    ${title(d.menu[3])}
    <ol class="missions">${d.missions
      .map((m, i) => `
        <li class="mission" style="--i:${i}" ${sayAttr(d.characterSays.mission, m.company)}>
          <p class="mission__counter">${esc(d.missionsCounter.replace('{c}', i + 1).replace('{t}', d.missions.length))} · ${esc(m.period)}</p>
          <h3 class="mission__company">${esc(m.company)}</h3>
          <p class="mission__role">${esc(m.role)}</p>
          <p class="muted">${esc(m.place)}</p>
          <ul class="bullets">${m.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
          ${chips(m.stack, 'chips--sm')}
        </li>`)
      .join('')}</ol>`;
}

const projectCard = (d, p, i) => `
        <article class="card project ${p.featured ? 'project--featured' : ''}" style="--i:${i}" ${sayAttr(d.characterSays.project, p.title)}>
          <header class="card__head">
            <span class="card__index">${pad(d.projectList.indexOf(p))}</span>
            <h3>${esc(p.title)}</h3>
            <span class="muted">${esc(p.date)}</span>
          </header>
          <p>${esc(p.description)}</p>
          ${chips(p.stack, 'chips--sm')}
          <footer class="project__links">
            ${p.repo ? extLink(p.repo, d.projects.repo) : ''}
            ${p.demo ? extLink(p.demo, d.projects.demo) : ''}
            ${!p.repo && !p.demo ? `<span class="muted">● ${esc(d.projects.local)}</span>` : ''}
          </footer>
        </article>`;

function projetos(d) {
  const list = d.projectList.filter((p) => state.filter === 'all' || p.category === state.filter);
  const groups = [
    [d.projects.groups.featured, list.filter((p) => p.featured)],
    [d.projects.groups.others, list.filter((p) => !p.featured)],
  ].filter(([, items]) => items.length);
  return `
    ${menuTitle(d, 'projetos')}
    <div class="filters" role="tablist">${Object.entries(d.projects.filters)
      .map(([key, label]) => {
        const count = key === 'all' ? d.projectList.length : d.projectList.filter((p) => p.category === key).length;
        return `<button type="button" role="tab" class="filters__btn ${state.filter === key ? 'is-on' : ''}" aria-selected="${state.filter === key}" data-filter="${key}">${esc(label)} <span>${count}</span></button>`;
      })
      .join('')}</div>
    ${groups
      .map(([label, items]) => `
    ${heading(label)}
    <div class="projects">${items.map((p, i) => projectCard(d, p, i)).join('')}</div>`)
      .join('')}`;
}

function formacoes(d) {
  return `
    ${menuTitle(d, 'formacoes')}
    ${milestones(d.complementary, '✦')}`;
}

function conquistas(d) {
  return `
    ${menuTitle(d, 'conquistas')}
    ${milestones(d.achievements, '★')}`;
}

function contato(d) {
  const rows = [
    [d.contact.email, `<a href="mailto:${links.email}">${links.email}</a>`, `<button type="button" class="chip-btn" data-copy="${links.email}">${esc(d.contact.copy)}</button>`],
    [d.contact.github, extLink(links.github, 'github.com/Benattin'), ''],
    [d.contact.linkedin, extLink(links.linkedin, 'linkedin.com/in/gustabenatti'), ''],
    [d.contact.cv, `<a href="${links.cv}" download>Gustavo-Benatti.pdf</a>`, ''],
  ];
  return `
    ${menuTitle(d, 'contato')}
    <p class="lead lead--xl">${esc(d.contact.title)}</p>
    <ul class="contact">${rows
      .map(([label, value, action]) => `<li ${sayAttr(d.characterSays.contact)}><span class="contact__label">${esc(label)}</span><span class="contact__value">${value}</span>${action}</li>`)
      .join('')}</ul>
    <p class="muted small">© ${new Date().getFullYear()} Gustavo Benatti · São Paulo</p>`;
}

export const panels = { inicio, perfil, habilidades, experiencia, projetos, formacoes, conquistas, contato };

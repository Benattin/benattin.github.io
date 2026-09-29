import { content } from '../content/data.js';
import { state, t } from '../core/state.js';
import { $, $$, esc, pad } from './dom.js';
import { scramble } from './effects.js';
import { panels } from './panels.js';

const { sections } = content;

export function renderStatic() {
  const d = t();
  document.documentElement.lang = d.locale;
  document.title = `Gustavo Benatti · ${d.role}`;
  $$('[data-i18n]').forEach((el) => (el.textContent = d[el.dataset.i18n]));
  $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));
}

export function renderMenu() {
  const d = t();
  const last = sections.length - 1;
  $('#menu').innerHTML = `
    <div class="menu__rail" aria-hidden="true"><i style="--p:${state.index / last}"></i></div>
    <ul class="menu__list">${d.menu
      .map((label, i) => {
        const on = i === state.index;
        const say = on ? '' : `data-say="${esc(d.characterSays.menu.replace('{x}', label))}"`;
        return `<li><button type="button" class="menu__item ${on ? 'is-active' : ''}" data-go="${i}" ${say} ${on ? 'aria-current="page"' : ''}>
          <span class="menu__index">${pad(i)}</span><span class="menu__rule"></span><span class="menu__label">${esc(label)}</span></button></li>`;
      })
      .join('')}</ul>
    <div class="menu__bar">
      <button type="button" class="menu__step" data-step="-1" aria-label="${esc(d.prev)}" ${state.index === 0 ? 'disabled' : ''}>‹</button>
      <span class="menu__current"><span class="menu__index">${pad(state.index)}</span>${esc(d.menu[state.index])}<span class="muted">${state.index + 1}/${sections.length}</span></span>
      <button type="button" class="menu__step" data-step="1" aria-label="${esc(d.next)}" ${state.index === last ? 'disabled' : ''}>›</button>
    </div>`;
}

export function renderSheet({ animate = true, keepScroll = false } = {}) {
  const d = t();
  const id = sections[state.index];
  const next = d.menu[state.index + 1];
  const sheet = $('#sheet');
  const body = $('.sheet__body', sheet);
  const scroll = keepScroll && body ? body.scrollTop : 0;

  sheet.className = `sheet panel--${id}${animate ? ' is-entering' : ''}`;
  sheet.innerHTML = `
    <header class="sheet__chrome">
      <span class="sheet__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="sheet__file">~/gustavo/${esc(d.files[state.index])}</span>
      <span class="sheet__count">${pad(state.index)}<span class="muted">/${pad(sections.length - 1)}</span></span>
    </header>
    <div class="sheet__body">
      ${panels[id](d)}
      ${next ? `<button type="button" class="edge" data-step="1">${esc(d.edge)} <b>${esc(next)}</b> <span aria-hidden="true">↓</span></button>` : ''}
    </div>
    <div class="sheet__progress" aria-hidden="true"><i></i></div>`;

  const newBody = $('.sheet__body', sheet);
  newBody.scrollTop = scroll;
  const bar = $('.sheet__progress i', sheet);
  const onScroll = () => {
    const max = newBody.scrollHeight - newBody.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? newBody.scrollTop / max : 1})`;
  };
  newBody.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (animate) $$('.scramble', sheet).forEach(scramble);
}

import { content } from '../content/data.js';
import { state, t } from '../core/state.js';
import { $ } from './dom.js';
import { updateCharacter } from './character.js';
import { flash, toast } from './effects.js';
import { renderMenu, renderSheet, renderStatic } from './render.js';

const { sections } = content;
const TRANSITION_MS = 900;

export function go(i) {
  if (i < 0 || i >= sections.length || i === state.index || state.locked) return;
  state.locked = true;
  const direction = Math.sign(i - state.index);
  state.index = i;
  history.replaceState(null, '', `#${sections[i]}`);
  flash();
  state.scene?.goTo(sections[i]);
  renderMenu();
  renderSheet();
  updateCharacter(direction);
  setTimeout(() => (state.locked = false), TRANSITION_MS);
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem('lang', lang);
  renderStatic();
  renderMenu();
  renderSheet({ animate: false, keepScroll: true });
  updateCharacter();
  state.onLang?.();
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = Object.assign(document.createElement('textarea'), { value: text });
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  toast(t().contact.copied);
}

const actions = {
  go: (v) => go(+v),
  step: (v) => go(state.index + +v),
  lang: setLang,
  filter: (v) => {
    state.filter = v;
    renderSheet({ animate: false, keepScroll: true });
  },
  copy,
};

export function bindNavigation() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-go],[data-step],[data-lang],[data-filter],[data-copy]');
    if (!el) return;
    for (const [key, fn] of Object.entries(actions)) {
      if (el.dataset[key] !== undefined) return fn(el.dataset[key]);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea')) return;
    const keys = {
      ArrowDown: () => go(state.index + 1),
      PageDown: () => go(state.index + 1),
      ArrowUp: () => go(state.index - 1),
      PageUp: () => go(state.index - 1),
      Escape: () => go(0),
      Home: () => go(0),
      End: () => go(sections.length - 1),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    }
  });

  // Scroll: rola o painel primeiro; troca de seção só quando ele chega ao fim/topo
  let acc = 0;
  let accTimer;
  addEventListener(
    'wheel',
    (e) => {
      const body = $('.sheet__body');
      if (body && body.contains(e.target)) {
        const atBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 2;
        const atTop = body.scrollTop <= 0;
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;
      }
      acc += e.deltaY;
      clearTimeout(accTimer);
      accTimer = setTimeout(() => (acc = 0), 250);
      if (Math.abs(acc) > 140) {
        go(state.index + Math.sign(acc));
        acc = 0;
      }
    },
    { passive: true },
  );

  // Toque: deslizar fora do painel troca de seção
  let startY = null;
  addEventListener('touchstart', (e) => {
    startY = $('#sheet').contains(e.target) ? null : e.touches[0].clientY;
  }, { passive: true });
  addEventListener('touchend', (e) => {
    if (startY == null) return;
    const dy = startY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 50) go(state.index + Math.sign(dy));
    startY = null;
  }, { passive: true });
}
